export enum Language {
  PT_BR = 'pt-BR',
  PT_PT = 'pt-PT',
  EN = 'en',
  ES = 'es',
  JA = 'ja',
  DE = 'de'
}

export interface MedicationInfo {
  name: string;
  indication: string;
  dosage: string;
  sideEffects: string;
  contraindications: string;
  sources: { title: string; uri: string }[];
}

export interface UIState {
  isLoading: boolean;
  error: string | null;
  data: MedicationInfo | null;
}

export interface Translation {
  title: string;
  subtitle: string;
  placeholder: string;
  searchButton: string;
  loading: string;
  disclaimer: string;
  sections: {
    indication: string;
    dosage: string;
    sideEffects: string;
    contraindications: string;
    sources: string;
  };
  errors: {
    empty: string;
    general: string;
  };
}