import { Language, Translation } from './types';

export const TRANSLATIONS: Record<Language, Translation> = {
  [Language.PT_BR]: {
    title: "Dose Certa",
    subtitle: "Consulte bulas e informações de medicamentos com Inteligência Artificial",
    placeholder: "Digite o nome do remédio ou princípio ativo...",
    searchButton: "Pesquisar",
    loading: "Buscando informações em fontes confiáveis...",
    disclaimer: "⚠️ Não recomendamos a automedicação. As informações abaixo são apenas para consulta. Procure sempre um médico e siga sua recomendação.",
    sections: {
      indication: "Para que serve",
      dosage: "Dosagem indicada",
      sideEffects: "Reações adversas",
      contraindications: "Contraindicações",
      sources: "Fontes consultadas"
    },
    errors: {
      empty: "Por favor, digite o nome de um medicamento.",
      general: "Não foi possível encontrar informações sobre este medicamento. Tente novamente."
    }
  },
  [Language.PT_PT]: {
    title: "Dose Certa",
    subtitle: "Consulte folhetos informativos e medicamentos com Inteligência Artificial",
    placeholder: "Digite o nome do medicamento ou substância ativa...",
    searchButton: "Pesquisar",
    loading: "A pesquisar informações em fontes fidedignas...",
    disclaimer: "⚠️ Não recomendamos a automedicação. As informações abaixo servem apenas para consulta. Consulte sempre um médico e siga a sua recomendação.",
    sections: {
      indication: "Indicações Terapêuticas",
      dosage: "Posologia e Modo de Administração",
      sideEffects: "Efeitos Indesejáveis",
      contraindications: "Contraindicações",
      sources: "Fontes consultadas"
    },
    errors: {
      empty: "Por favor, introduza o nome de um medicamento.",
      general: "Não foi possível encontrar informações sobre este medicamento. Tente novamente."
    }
  },
  [Language.EN]: {
    title: "Dose Certa",
    subtitle: "Search medication labels and info using Artificial Intelligence",
    placeholder: "Enter drug name or active ingredient...",
    searchButton: "Search",
    loading: "Searching trusted sources...",
    disclaimer: "⚠️ We do not recommend self-medication. The information below is for reference only. Always consult a doctor and follow their recommendation.",
    sections: {
      indication: "Indications & Usage",
      dosage: "Dosage & Administration",
      sideEffects: "Side Effects",
      contraindications: "Contraindications",
      sources: "Consulted Sources"
    },
    errors: {
      empty: "Please enter a medication name.",
      general: "Could not find information for this medication. Please try again."
    }
  },
  [Language.ES]: {
    title: "Dose Certa",
    subtitle: "Consulte prospectos e información de medicamentos con IA",
    placeholder: "Ingrese el nombre del medicamento o principio activo...",
    searchButton: "Buscar",
    loading: "Buscando información en fuentes confiables...",
    disclaimer: "⚠️ No recomendamos la automedicación. La información a continuación es solo de referencia. Consulte siempre a un médico y siga su recomendación.",
    sections: {
      indication: "Indicaciones",
      dosage: "Dosificación",
      sideEffects: "Reacciones adversas",
      contraindications: "Contraindicaciones",
      sources: "Fuentes consultadas"
    },
    errors: {
      empty: "Por favor, ingrese el nombre de un medicamento.",
      general: "No se pudo encontrar información sobre este medicamento. Inténtelo de nuevo."
    }
  },
  [Language.DE]: {
    title: "Dose Certa",
    subtitle: "Suchen Sie nach Medikamenteninformationen mit KI",
    placeholder: "Geben Sie den Medikamentennamen oder Wirkstoff ein...",
    searchButton: "Suchen",
    loading: "Suche in vertrauenswürdigen Quellen...",
    disclaimer: "⚠️ Wir raten von Selbstmedikation ab. Die folgenden Informationen dienen nur als Referenz. Konsultieren Sie immer einen Arzt und folgen Sie dessen Empfehlung.",
    sections: {
      indication: "Anwendungsgebiete",
      dosage: "Dosierung",
      sideEffects: "Nebenwirkungen",
      contraindications: "Gegenanzeigen",
      sources: "Konsultierte Quellen"
    },
    errors: {
      empty: "Bitte geben Sie einen Medikamentennamen ein.",
      general: "Informationen zu diesem Medikament konnten nicht gefunden werden. Bitte versuchen Sie es erneut."
    }
  },
  [Language.JA]: {
    title: "Dose Certa",
    subtitle: "AIを使用して医薬品の添付文書と情報を検索",
    placeholder: "薬の名前または有効成分を入力...",
    searchButton: "検索",
    loading: "信頼できる情報源を検索中...",
    disclaimer: "⚠️ 自己判断での服薬は推奨しません。以下の情報は参考用です。必ず医師に相談し、その指示に従ってください。",
    sections: {
      indication: "効能・効果",
      dosage: "用法・用量",
      sideEffects: "副作用",
      contraindications: "禁忌",
      sources: "参照元"
    },
    errors: {
      empty: "薬の名前を入力してください。",
      general: "この薬に関する情報が見つかりませんでした。もう一度お試しください。"
    }
  }
};

export const LANGUAGE_LABELS: Record<Language, string> = {
  [Language.PT_BR]: "Português (BR)",
  [Language.PT_PT]: "Português (PT)",
  [Language.EN]: "English",
  [Language.ES]: "Español",
  [Language.DE]: "Deutsch",
  [Language.JA]: "日本語"
};