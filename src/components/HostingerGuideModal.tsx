import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  Globe, 
  Zap, 
  ShieldCheck, 
  Rocket, 
  Layout, 
  Lock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { HOSTINGER_STEPS } from '../data/hostingerGuide';

interface HostingerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HostingerGuideModal: React.FC<HostingerGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeTab, setActiveTab] = useState<'steps' | 'speed' | 'security'>('steps');

  const mainPrompt = `Build a high-speed, secure online document & PDF processing platform named "Easydocflow" similar to iLovePDF. The website must include tools for Merge PDF, Split PDF, Compress PDF, PDF to Word, Image to PDF, Sign PDF, Watermark PDF, and AI Document Summarizer. Use a clean, professional modern light-themed UI with red/blue document action badges, drag-and-drop file uploaders, speed optimization, and SSL security badges.`;

  const copyPrompt = () => {
    navigator.clipboard.writeText(mainPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/75 backdrop-blur-md overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[94vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-black shadow-md">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                Easydocflow: Hostinger AI Builder Guide
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                Step-by-step Hindi/Hinglish process guide to set up a fast & secure website
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-2.5 flex items-center gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('steps')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'steps' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Rocket className="w-4 h-4 text-amber-400" />
            <span>6-Step Process Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('speed')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'speed' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Fast Speed Optimization</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'security' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>SSL & Security Setup</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: 6-STEP PROCESS GUIDE */}
          {activeTab === 'steps' && (
            <div className="space-y-6">
              
              {/* Copyable AI Prompt Box */}
              <div className="p-5 bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-950 text-white rounded-2xl border border-indigo-700 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Hostinger AI Builder Prompt (Copy & Paste)
                  </span>
                  <button
                    onClick={copyPrompt}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    {copiedPrompt ? <Check className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedPrompt ? 'Copied Prompt!' : 'Copy AI Prompt'}</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm font-mono leading-relaxed bg-black/40 p-3.5 rounded-xl border border-indigo-500/30 text-indigo-100">
                  {mainPrompt}
                </p>
              </div>

              {/* Steps List */}
              <div className="space-y-4">
                {HOSTINGER_STEPS.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-5 shadow-xs transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md shadow-red-600/20">
                        {step.stepNumber}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                          {step.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 mb-3">{step.subtitle}</p>

                        <ul className="space-y-2 mb-3">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>

                        {step.tips && step.tips.length > 0 && (
                          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-medium">
                            <span className="font-bold text-amber-950">Pro Tip: </span>
                            {step.tips.join(' ')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SPEED OPTIMIZATION */}
          {activeTab === 'speed' && (
            <div className="space-y-5">
              <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 space-y-2">
                <h3 className="text-base font-extrabold flex items-center gap-2 text-amber-950">
                  <Zap className="w-5 h-5 text-amber-600" />
                  Website Fast Speed Rulebook for Easydocflow
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed">
                  Easydocflow ko ultra-fast banane ke liye client-side processing (PDF manipulation inside user browser) and Hostinger LiteSpeed Caching best result dete hain.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 p-4 rounded-2xl">
                  <h4 className="font-bold text-slate-900 text-sm mb-2">1. LiteSpeed Web Server Cache</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Hostinger hPanel mein LSCache plugin ko ON karein. Isse server response time 50ms se neeche aa jata hai.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-2xl">
                  <h4 className="font-bold text-slate-900 text-sm mb-2">2. WebP Image Compression</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    All tool icons aur banners ko WebP / SVG format mein save karein, jisse page size 80% reduce ho jata hai.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-2xl">
                  <h4 className="font-bold text-slate-900 text-sm mb-2">3. Client-Side Browser Storage</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Files server par upload hue bina browser RAM mein process hoti hain. User files lightning fast convert hoti hain.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-2xl">
                  <h4 className="font-bold text-slate-900 text-sm mb-2">4. Asset Minification</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Hostinger AI Builder mein "Enable Minify HTML/CSS/JS" check-box ON rakhein.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY SETUP */}
          {activeTab === 'security' && (
            <div className="space-y-5">
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-950 space-y-2">
                <h3 className="text-base font-extrabold flex items-center gap-2 text-emerald-900">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  SSL & Data Privacy Security Setup
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed">
                  Document tool websites par SSL lock certificate aur client-side privacy standard user trust ke liye mandatory hota hai.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl">
                  <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Free Unlimited SSL Certificate (HTTPS)</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Hostinger hPanel -&gt; Security -&gt; SSL tab par jaakar 1-click Free SSL install karein. "Force HTTPS" ko ON karein.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Cloudflare Anti-DDoS Protection</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Cloudflare DNS protection enable karne se unauthorized bot attacks aur high-traffic spikes safely absorb ho jaate hain.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">No Server File Retention Policy</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Processed document files immediate download ke baad auto-delete ho jati hain. User data 100% private rehta hai.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <a
            href="https://hpanel.hostinger.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1.5"
          >
            <span>Open Hostinger hPanel</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-sm"
          >
            Got it, Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
