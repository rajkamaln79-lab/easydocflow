import React, { useState, useMemo } from 'react';
import { Search, X, Check, Sparkles, Globe } from 'lucide-react';
import { ALL_LANGUAGES, POPULAR_LANGUAGES, AUTO_DETECT_LANG, Language } from '../data/languages';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLanguage: (lang: Language) => void;
  selectedLanguageName: string;
  isSourceSelector?: boolean; // If true, shows "Detect language" option at top
  title?: string;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectLanguage,
  selectedLanguageName,
  isSourceSelector = false,
  title = 'Select Language',
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter languages based on search input
  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return ALL_LANGUAGES;
    const q = searchQuery.toLowerCase().trim();
    return ALL_LANGUAGES.filter(
      (lang) =>
        lang.name.toLowerCase().includes(q) ||
        (lang.nativeName && lang.nativeName.toLowerCase().includes(q)) ||
        lang.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">{title}</h3>
              <p className="text-xs text-slate-500 font-medium">100+ Languages Supported via Google AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors"
            aria-label="Close language selector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Box */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-white">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search languages (e.g. Hindi, Spanish, Arabic, 日本語)..."
              autoFocus
              className="w-full pl-11 pr-10 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl text-sm font-semibold text-slate-900 transition-all outline-hidden placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Language List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Detect Language Option (Source Mode) */}
          {isSourceSelector && !searchQuery && (
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 mb-2.5">
                Auto Detect
              </label>
              <button
                type="button"
                onClick={() => {
                  onSelectLanguage(AUTO_DETECT_LANG);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                  selectedLanguageName === AUTO_DETECT_LANG.name
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20 font-bold'
                    : 'bg-indigo-50/70 hover:bg-indigo-100/80 text-indigo-950 border-indigo-100 font-semibold'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-sm">{AUTO_DETECT_LANG.name}</span>
                </div>
                {selectedLanguageName === AUTO_DETECT_LANG.name && <Check className="w-4 h-4 text-white" />}
              </button>
            </div>
          )}

          {/* Popular / Pinned Languages */}
          {!searchQuery && (
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">
                Popular Languages
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {POPULAR_LANGUAGES.map((lang) => {
                  const isSelected = selectedLanguageName === lang.name;
                  return (
                    <button
                      key={`popular-${lang.code}-${lang.name}`}
                      type="button"
                      onClick={() => {
                        onSelectLanguage(lang);
                        onClose();
                      }}
                      className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left flex items-center justify-between border cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20 font-bold scale-[1.02]'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200/80'
                      }`}
                    >
                      <div className="truncate pr-1">
                        <span className="block truncate">{lang.name}</span>
                        {lang.nativeName && lang.nativeName !== lang.name && (
                          <span
                            className={`block text-[10px] truncate ${
                              isSelected ? 'text-indigo-200' : 'text-slate-400'
                            }`}
                          >
                            {lang.nativeName}
                          </span>
                        )}
                      </div>
                      {isSelected && <Check className="w-4 h-4 shrink-0 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Languages Grid */}
          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">
              {searchQuery ? `Search Results (${filteredLanguages.length})` : 'All 100+ Languages'}
            </label>

            {filteredLanguages.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No languages found matching "{searchQuery}"
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {filteredLanguages.map((lang) => {
                  const isSelected = selectedLanguageName === lang.name;
                  return (
                    <button
                      key={`all-${lang.code}-${lang.name}`}
                      type="button"
                      onClick={() => {
                        onSelectLanguage(lang);
                        onClose();
                      }}
                      className={`p-3 rounded-xl text-xs sm:text-sm transition-all text-left flex items-center justify-between border cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20 font-bold'
                          : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="font-semibold block truncate">{lang.name}</span>
                        {lang.nativeName && (
                          <span
                            className={`block text-[11px] truncate ${
                              isSelected ? 'text-indigo-200' : 'text-slate-400'
                            }`}
                          >
                            {lang.nativeName}
                          </span>
                        )}
                      </div>
                      {isSelected && <Check className="w-4 h-4 shrink-0 text-white" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
