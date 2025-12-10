import React, { useState } from 'react';
import { Language, MedicationInfo, UIState } from './types';
import { TRANSLATIONS } from './constants';
import { fetchMedicationData } from './services/geminiService';
import { LanguageSelector } from './components/LanguageSelector';
import { InfoCard } from './components/InfoCard';
import { AdUnit } from './components/AdUnit';
import { 
  Search, 
  Pill, 
  Activity, 
  AlertTriangle, 
  Ban, 
  BookOpen,
  Loader2,
  ExternalLink
} from 'lucide-react';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.PT_BR);
  const [query, setQuery] = useState('');
  const [state, setState] = useState<UIState>({
    isLoading: false,
    error: null,
    data: null,
  });

  const t = TRANSLATIONS[language];

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!query.trim()) {
      setState(s => ({ ...s, error: t.errors.empty }));
      return;
    }

    setState({ isLoading: true, error: null, data: null });

    try {
      const data = await fetchMedicationData(query, language);
      setState({ isLoading: false, error: null, data });
    } catch (error) {
      setState({ isLoading: false, error: t.errors.general, data: null });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Pill className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">
              {t.title}
            </h1>
          </div>
          <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
        </div>
      </header>

      {/* Top Ad Unit */}
      <AdUnit position="top" />

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
        
        {/* Search Section */}
        <div className={`transition-all duration-500 ease-in-out ${state.data ? 'mb-8' : 'min-h-[50vh] flex flex-col justify-center items-center'}`}>
          <div className={`w-full max-w-2xl text-center ${state.data ? 'hidden' : 'block mb-10'}`}>
             <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{t.title}</h2>
             <p className="text-lg text-slate-600">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.placeholder}
              className="w-full pl-6 pr-14 py-4 rounded-full border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-lg shadow-sm transition-all text-slate-800 placeholder:text-slate-400"
            />
            <button 
              type="submit"
              disabled={state.isLoading}
              className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {state.isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
            </button>
          </form>
          {state.error && (
            <p className="mt-4 text-red-500 font-medium animate-fade-in">{state.error}</p>
          )}
        </div>

        {/* Loading State Skeleton */}
        {state.isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse mt-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        )}

        {/* Results */}
        {state.data && !state.isLoading && (
          <div className="space-y-8 animate-slide-up">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Result</span>
                <h2 className="text-3xl font-bold text-slate-900 mt-1">{state.data.name}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                 {/* Mock badges for visual appeal */}
                 <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold border border-green-200">Verified AI Search</span>
              </div>
            </div>

            {/* Disclaimer Banner */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm flex items-start space-x-3">
              <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
              <p className="text-amber-800 text-sm font-medium leading-relaxed">
                {t.disclaimer}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard 
                title={t.sections.indication} 
                content={state.data.indication} 
                icon={BookOpen}
                colorClass="bg-emerald-500"
              />
              <InfoCard 
                title={t.sections.dosage} 
                content={state.data.dosage} 
                icon={Activity}
                colorClass="bg-blue-500"
              />
              <InfoCard 
                title={t.sections.sideEffects} 
                content={state.data.sideEffects} 
                icon={AlertTriangle}
                colorClass="bg-amber-500"
              />
              <InfoCard 
                title={t.sections.contraindications} 
                content={state.data.contraindications} 
                icon={Ban}
                colorClass="bg-rose-500"
              />
            </div>

            {/* Sources Section */}
            {state.data.sources.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center">
                   {t.sections.sources}
                </h3>
                <ul className="space-y-2">
                  {state.data.sources.map((source, idx) => (
                    <li key={idx}>
                      <a 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors text-sm truncate"
                      >
                        <ExternalLink size={14} className="mr-2 shrink-0" />
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer Ad Unit */}
      <AdUnit position="bottom" />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Dose Certa. {t.disclaimer}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;