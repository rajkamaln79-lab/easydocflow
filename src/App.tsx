import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ToolGrid } from './components/ToolGrid';
import { ToolProcessorModal } from './components/ToolProcessorModal';
import { HostingerGuideModal } from './components/HostingerGuideModal';
import { AuthModal } from './components/AuthModal';
import { InfoModal, InfoModalTab } from './components/InfoModal';
import { BannerSection } from './components/BannerSection';
import { Footer } from './components/Footer';
import { TOOLS_LIST } from './data/toolsList';
import { ToolCategory, ToolItem, UserProfile } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  const [isHostingerGuideOpen, setIsHostingerGuideOpen] = useState(false);

  // Quick Links Info Modal state
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalTab, setInfoModalTab] = useState<InfoModalTab>('features');
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');

  // Authentication states
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Load saved user & language from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('easydocflow_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user:', e);
      }
    }

    const savedLang = localStorage.getItem('easydocflow_lang');
    if (savedLang) {
      setCurrentLanguage(savedLang);
    }
  }, []);

  const handleSelectLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('easydocflow_lang', lang);
  };

  const handleOpenInfoModal = (tab: InfoModalTab = 'features') => {
    setInfoModalTab(tab);
    setIsInfoModalOpen(true);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('easydocflow_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('easydocflow_user');
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  // Filter tools based on category & search input
  const filteredTools = TOOLS_LIST.filter((tool) => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Top Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenHostingerGuide={() => setIsHostingerGuideOpen(true)}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenInfoModal={handleOpenInfoModal}
        currentLanguage={currentLanguage}
        onSelectLanguage={handleSelectLanguage}
      />

      {/* Main Tool Grid & Hero */}
      <main className="flex-1">
        <ToolGrid
          tools={filteredTools}
          onSelectTool={(tool) => setSelectedTool(tool)}
          currentLanguage={currentLanguage}
        />

        {/* Feature Highlights Banner */}
        <BannerSection
          onOpenGuide={() => setIsHostingerGuideOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenGuide={() => setIsHostingerGuideOpen(true)}
        onOpenInfoModal={handleOpenInfoModal}
        onSelectTool={(tool) => setSelectedTool(tool)}
        currentLanguage={currentLanguage}
      />

      {/* Interactive Tool Processor Modal */}
      {selectedTool && (
        <ToolProcessorModal
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}

      {/* Quick Links / Info Modal */}
      <InfoModal
        isOpen={isInfoModalOpen}
        initialTab={infoModalTab}
        onClose={() => setIsInfoModalOpen(false)}
        currentLanguage={currentLanguage}
        onSelectLanguage={handleSelectLanguage}
      />

      {/* Hostinger Step-by-Step Guide Modal */}
      <HostingerGuideModal
        isOpen={isHostingerGuideOpen}
        onClose={() => setIsHostingerGuideOpen(false)}
      />

      {/* Login / Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authMode}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
