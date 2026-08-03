import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  HelpCircle, 
  Info, 
  Globe, 
  Sparkles,
  Lock,
  Cpu,
  Mail,
  FileText
} from 'lucide-react';

export type InfoModalTab = 'pricing' | 'security' | 'features' | 'about' | 'support';

interface InfoModalProps {
  isOpen: boolean;
  initialTab?: InfoModalTab;
  onClose: () => void;
  currentLanguage: string;
  onSelectLanguage: (lang: string) => void;
}

export const LANGUAGES = [
  { code: 'en', name: 'English (US)', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi (हिंदी)', flag: '🇮🇳' },
  { code: 'hinglish', name: 'Hinglish (Mix)', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish (Español)', flag: '🇪🇸' },
  { code: 'fr', name: 'French (Français)', flag: '🇫🇷' },
];

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  initialTab = 'features',
  onClose,
  currentLanguage,
  onSelectLanguage
}) => {
  const [activeTab, setActiveTab] = useState<InfoModalTab>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Easydocflow Center</h3>
              <p className="text-xs text-slate-500 font-medium">Platform Information & Preferences</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100/70 px-6 pt-3 flex items-center gap-1 overflow-x-auto no-scrollbar border-b border-slate-200/80 text-xs font-bold">
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-4 py-2.5 rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'pricing'
                ? 'bg-white text-indigo-600 shadow-2xs border-t-2 border-indigo-600 font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Pricing</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2.5 rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'security'
                ? 'bg-white text-emerald-600 shadow-2xs border-t-2 border-emerald-600 font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Security & Privacy</span>
          </button>

          <button
            onClick={() => setActiveTab('features')}
            className={`px-4 py-2.5 rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'features'
                ? 'bg-white text-blue-600 shadow-2xs border-t-2 border-blue-600 font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Features</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2.5 rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'about'
                ? 'bg-white text-violet-600 shadow-2xs border-t-2 border-violet-600 font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>About Us</span>
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className={`px-4 py-2.5 rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'support'
                ? 'bg-white text-amber-600 shadow-2xs border-t-2 border-amber-600 font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help & Support</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm">
          
          {/* PRICING TAB */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="text-center max-w-md mx-auto space-y-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Transparent Pricing
                </span>
                <h4 className="text-2xl font-black text-slate-900">100% Free for Everyone</h4>
                <p className="text-slate-500 text-xs">
                  Easydocflow processes your files right inside your browser. No subscription required for core document tools.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Free Tier */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-slate-900 text-lg">Standard Plan</h5>
                    <span className="text-xs bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full font-bold">Free Forever</span>
                  </div>
                  <div className="text-3xl font-black text-slate-900">$0 <span className="text-xs font-normal text-slate-500">/ mo</span></div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Unlimited PDF Merging, Splitting & Rotating</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>100% Client-side Processing (Zero file upload)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Compress & Watermark files with high speed</span>
                    </li>
                  </ul>
                </div>

                {/* Pro / AI Tier */}
                <div className="border-2 border-indigo-600 rounded-2xl p-5 bg-indigo-50/30 space-y-4 relative">
                  <span className="absolute -top-3 right-4 bg-indigo-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                    Recommended
                  </span>
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-slate-900 text-lg">AI & Unlimited Suite</h5>
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-bold">Pro Edition</span>
                  </div>
                  <div className="text-3xl font-black text-indigo-600">Included <span className="text-xs font-normal text-slate-500">for active users</span></div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>Easydocflow AI Executive Document Summarizer</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>AI Document Chat & OCR Text Extractor</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>Batch Processing & Priority Speed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900">
                <Lock className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">256-Bit Client-Side Security</h4>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Your confidential PDFs are never uploaded to remote servers. Processing occurs inside your web browser engine.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <Cpu className="w-5 h-5 text-indigo-600" />
                  <h5 className="font-bold text-slate-900">Browser-Native Execution</h5>
                  <p className="text-slate-500 leading-relaxed">
                    Uses WASM & PDF-lib to merge, split, and edit files locally in your RAM.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h5 className="font-bold text-slate-900">Zero File Logs</h5>
                  <p className="text-slate-500 leading-relaxed">
                    We do not store, view, or transmit your document content to third parties.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* FEATURES TAB */}
          {activeTab === 'features' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-base">All-In-One Document Capabilities</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900">PDF Merge & Split</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">Combine multiple PDFs into one document or extract pages effortlessly.</p>
                  </div>
                </div>

                <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900">Smart AI Summarizer</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">Powered by Easydocflow AI to extract key insights from complex multi-page files.</p>
                  </div>
                </div>

                <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900">Compression Engine</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">Reduce file size up to 80% without losing readable text clarity.</p>
                  </div>
                </div>

                <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900">Security & Sign</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">Add custom watermarks, electronic signatures, and password protection.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div className="space-y-4 text-xs leading-relaxed text-slate-600">
              <h4 className="font-bold text-slate-900 text-base">About Easydocflow</h4>
              <p>
                Easydocflow was built with a clear vision: to provide individuals, students, and businesses with a fast, private, and powerful document engine right inside their browsers.
              </p>
              <p>
                Unlike traditional tools that require downloading software or uploading confidential files to unknown servers, Easydocflow performs processing locally using modern web technologies and AI integrations.
              </p>
            </div>
          )}

          {/* SUPPORT TAB */}
          {activeTab === 'support' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-base">Help & FAQ</h4>
              <div className="space-y-3 text-xs">
                <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50">
                  <h5 className="font-bold text-slate-900">Q: Are my files uploaded to any server?</h5>
                  <p className="text-slate-500 mt-1">No, standard tools run entirely in your browser memory. For AI tools, text is processed securely using official AI endpoints with client encryption.</p>
                </div>
                <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50">
                  <h5 className="font-bold text-slate-900">Q: Is there any limit on file conversions?</h5>
                  <p className="text-slate-500 mt-1">Easydocflow is free to use with unlimited document processing for daily use.</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Need direct assistance?</span>
                <a 
                  href="mailto:support@easydocflow.com" 
                  className="text-indigo-600 font-bold flex items-center gap-1 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Contact Support
                </a>
              </div>
            </div>
          )}

          {/* LANGUAGE SELECTOR IN FOOTER OF MODAL */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-bold">
              <Globe className="w-4 h-4 text-indigo-600" />
              <span>Language:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onSelectLanguage(lang.code)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    currentLanguage === lang.code
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
