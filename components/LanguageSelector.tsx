import React from 'react';
import { Language } from '../types';
import { LANGUAGE_LABELS } from '../constants';
import { Globe } from 'lucide-react';

interface Props {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<Props> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-200">
        <Globe size={18} />
        <span className="text-sm font-medium">{LANGUAGE_LABELS[currentLanguage]}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden hidden group-hover:block z-50">
        {Object.entries(LANGUAGE_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onLanguageChange(key as Language)}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
              currentLanguage === key ? 'text-blue-600 font-semibold bg-blue-50' : 'text-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};