import { GoogleGenAI } from "@google/genai";
import { Language, MedicationInfo } from "../types";

export const fetchMedicationData = async (
  query: string, 
  language: Language
): Promise<MedicationInfo> => {
  
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Improved Prompt: Request raw JSON directly. 
  // This is generally more reliable than parsing Markdown headers for complex structured data.
  const prompt = `
    Act as a clinical pharmacist. Search for the official package insert (bula) or reliable medical information for: "${query}".
    Use trusted sources like gov.br (Anvisa), FDA, EMA, or major medical formularies.

    Goal: Provide structured information about the medication.

    Output Instructions:
    1.  Return a SINGLE valid JSON object.
    2.  Do NOT use Markdown formatting (no \`\`\`json blocks).
    3.  Translate all content to ${language}.

    JSON Structure:
    {
      "name": "Official Name of the Medication found",
      "indication": "Detailed text about what it treats",
      "dosage": "EXTREMELY IMPORTANT: Extract the EXACT POSOLOGY from the package insert. Structure cleanly (e.g., 'Adults: ... Children: ...'). Do not summarize vaguely.",
      "sideEffects": "List of common and rare side effects",
      "contraindications": "List of contraindications and warnings"
    }

    If specific information is not found for a field, fill it with "Information not available".
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseMimeType: 'application/json' is not supported with tools in some versions, 
        // but asking for JSON in prompt is robust.
      },
    });

    const text = response.text || "";
    
    // Extract sources if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .map(chunk => chunk.web)
      .filter((web): web is { title: string; uri: string } => !!web && !!web.uri && !!web.title)
      .filter((v, i, a) => a.findIndex(t => t.uri === v.uri) === i);

    let parsedData: any = {};

    // Attempt to parse JSON
    try {
      // Clean up potential markdown code blocks if the model ignores the "no markdown" rule
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanedText);
    } catch (e) {
      console.warn("JSON Parsing failed. Falling back to raw text mapping.", text);
      // Fallback: If JSON parsing fails, we don't want to show an error. 
      // We map the raw text to the indication or description field so the user sees *something*.
      parsedData = {
        name: query, // Use the query as the name
        indication: text, // Show the full raw text in the first section
        dosage: "See details in the description above.",
        sideEffects: "See details in the description above.",
        contraindications: "See details in the description above."
      };
    }

    // Sanitize and ensure fields exist
    const result: MedicationInfo = {
      name: parsedData.name || query,
      indication: parsedData.indication || "Information not available.",
      dosage: parsedData.dosage || "Information not available.",
      sideEffects: parsedData.sideEffects || "Information not available.",
      contraindications: parsedData.contraindications || "Information not available.",
      sources: sources
    };

    // Final check: If the text was empty or result is basically empty, then throw
    if (text.length < 10 && !result.sources.length) {
       throw new Error("No information returned from API");
    }

    return result;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};