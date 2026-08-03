import React, { useState } from 'react';
import { 
  FileText, 
  Bot, 
  Search, 
  ShieldCheck, 
  BookOpen, 
  LogIn, 
  UserPlus, 
  LogOut, 
  ChevronDown,
  Layers,
  Globe,
  Tag,
  Info,
  HelpCircle,
  Sparkles,
  Lock,
  Grid
} from 'lucide-react';
import { ToolCategory, UserProfile } from '../types';
import { InfoModalTab, LANGUAGES } from './InfoModal';
import { getTranslation } from '../data/translations';

interface HeaderProps {
  activeCategory: ToolCategory;
  onSelectCategory: (cat: ToolCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenHostingerGuide: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
  onOpenInfoModal: (tab?: InfoModalTab) => void;
  currentLanguage: string;
  onSelectLanguage: (lang: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenHostingerGuide,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenInfoModal,
  currentLanguage,
  onSelectLanguage,
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const t = getTranslation(currentLanguage);
  const selectedLangObj = LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22 gap-4 sm:gap-6 py-2">
          
          {/* Logo */}
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => onSelectCategory('all')}>
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 shrink-0">
              <FileText className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                Easy<span className="text-indigo-600">doc</span>flow
              </span>
              <span className="hidden sm:block text-xs font-bold text-slate-500 -mt-0.5 tracking-wider uppercase">
                {t.fastSecureSubtitle}
              </span>
            </div>
          </div>

          {/* Quick Search */}
          <div className="flex-1 max-w-lg relative hidden md:block">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-100/90 border border-slate-200/90 focus:border-indigo-500 focus:bg-white text-slate-800 text-sm sm:text-base rounded-2xl pl-12 pr-4 py-3 outline-hidden transition-all shadow-2xs placeholder:text-slate-400 font-medium"
            />
          </div>

          {/* Right Action Controls: Quick Links Dropdown + Auth/User Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">

            {/* "More" Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsMoreMenuOpen(!isMoreMenuOpen);
                  setIsProfileMenuOpen(false);
                }}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-800 px-4 py-2.5 rounded-2xl transition-all border border-slate-200 text-sm sm:text-base font-extrabold cursor-pointer shadow-2xs"
              >
                <Grid className="w-5 h-5 text-slate-600" />
                <span>More</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* More Dropdown Panel */}
              {isMoreMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  
                  {/* Quick Links Header */}
                  <div className="px-4 pb-2 mb-1 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      Quick Links
                    </span>
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold">
                      Platform
                    </span>
                  </div>

                  {/* Quick Links Items */}
                  <div className="space-y-0.5 px-1">
                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        onOpenInfoModal('pricing');
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-xl flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Tag className="w-4 h-4 text-amber-500" />
                        <span>Pricing</span>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Free
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        onOpenInfoModal('security');
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-xl flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Lock className="w-4 h-4 text-emerald-600" />
                        <span>Security & Privacy</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal">Client 256-Bit</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        onOpenInfoModal('features');
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-xl flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <span>Features</span>
                      </div>
                      <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.5 rounded">
                        18+ Tools
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        onOpenInfoModal('about');
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-xl flex items-center gap-2.5 transition-colors"
                    >
                      <Info className="w-4 h-4 text-blue-500" />
                      <span>About Us</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        onOpenInfoModal('support');
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-xl flex items-center gap-2.5 transition-colors"
                    >
                      <HelpCircle className="w-4 h-4 text-violet-500" />
                      <span>Help / Support</span>
                    </button>
                  </div>

                  {/* Language Selector Section */}
                  <div className="mt-2 pt-2 border-t border-slate-100 px-3">
                    <div className="flex items-center justify-between mb-1.5 px-1">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 text-indigo-600" /> Language
                      </span>
                      <span className="text-[11px] font-bold text-slate-700">
                        {selectedLangObj.flag} {selectedLangObj.name.split(' ')[0]}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            onSelectLanguage(lang.code);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                            currentLanguage === lang.code
                              ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </span>
                          {currentLanguage === lang.code && (
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Auth buttons or user dropdown */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(!isProfileMenuOpen);
                    setIsMoreMenuOpen(false);
                  }}
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-800 p-1.5 sm:px-3 sm:py-1.5 rounded-full transition-all border border-slate-200 cursor-pointer"
                >
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full bg-slate-300 object-cover"
                  />
                  <span className="hidden sm:inline text-xs font-bold truncate max-w-[100px]">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                        PRO Member
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onOpenInfoModal('pricing');
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Tag className="w-4 h-4 text-amber-500" />
                        <span>Pricing & Membership</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onOpenInfoModal('security');
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Lock className="w-4 h-4 text-emerald-600" />
                        <span>Security & Privacy</span>
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-slate-100 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold px-3 py-2 sm:px-4 sm:py-2 rounded-xl transition-all border border-slate-200 cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-slate-600" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => onOpenAuth('signup')}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold px-3 py-2 sm:px-4 sm:py-2 rounded-xl transition-all shadow-sm shadow-indigo-600/20 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sub-nav Tab-Style Categories Bar */}
      <div className="bg-slate-50/90 border-t border-slate-200/90 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center gap-1 sm:gap-2 pt-2.5 pb-0.5 text-xs sm:text-sm font-bold min-w-max">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 sm:px-5 py-2.5 sm:py-3 whitespace-nowrap transition-all border-b-2 font-extrabold cursor-pointer ${
              activeCategory === 'all'
                ? 'border-indigo-600 text-slate-900 bg-white/80 rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-t-xl'
            }`}
          >
            {t.allTools}
          </button>

          <button
            onClick={() => onSelectCategory('organize')}
            className={`px-4 sm:px-5 py-2.5 sm:py-3 whitespace-nowrap transition-all border-b-2 font-extrabold cursor-pointer ${
              activeCategory === 'organize'
                ? 'border-indigo-600 text-indigo-600 bg-white/80 rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-t-xl'
            }`}
          >
            {t.organizePdf}
          </button>

          <button
            onClick={() => onSelectCategory('optimize')}
            className={`px-4 sm:px-5 py-2.5 sm:py-3 whitespace-nowrap transition-all border-b-2 font-extrabold cursor-pointer ${
              activeCategory === 'optimize'
                ? 'border-indigo-600 text-indigo-600 bg-white/80 rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-t-xl'
            }`}
          >
            {t.optimizePdf}
          </button>

          <button
            onClick={() => onSelectCategory('convert')}
            className={`px-4 sm:px-5 py-2.5 sm:py-3 whitespace-nowrap transition-all border-b-2 font-extrabold cursor-pointer ${
              activeCategory === 'convert'
                ? 'border-indigo-600 text-indigo-600 bg-white/80 rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-t-xl'
            }`}
          >
            {t.convertPdf}
          </button>

          <button
            onClick={() => onSelectCategory('edit')}
            className={`px-4 sm:px-5 py-2.5 sm:py-3 whitespace-nowrap transition-all border-b-2 font-extrabold cursor-pointer ${
              activeCategory === 'edit'
                ? 'border-indigo-600 text-indigo-600 bg-white/80 rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-t-xl'
            }`}
          >
            {t.editPdf}
          </button>

          <button
            onClick={() => onSelectCategory('security')}
            className={`px-4 sm:px-5 py-2.5 sm:py-3 whitespace-nowrap transition-all border-b-2 font-extrabold cursor-pointer ${
              activeCategory === 'security'
                ? 'border-indigo-600 text-indigo-600 bg-white/80 rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-t-xl'
            }`}
          >
            {t.securityPdf}
          </button>

          {/* AI Summarizer & Chat badge */}
          <button
            onClick={() => onSelectCategory('ai')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 whitespace-nowrap flex items-center gap-2 rounded-xl transition-all font-extrabold cursor-pointer ${
              activeCategory === 'ai'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-600 text-white shadow-md shadow-cyan-500/20 ring-2 ring-cyan-400/40'
                : 'bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-cyan-500/15 text-teal-800 border border-teal-300/80 hover:from-emerald-500/25 hover:to-cyan-500/25'
            }`}
          >
            <Bot className={`w-4 h-4 sm:w-5 sm:h-5 ${activeCategory === 'ai' ? 'text-white' : 'text-emerald-600'}`} />
            <span>{t.aiTools}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
