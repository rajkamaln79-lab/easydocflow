import React from 'react';
import { FileText, ShieldCheck } from 'lucide-react';
import { InfoModalTab } from './InfoModal';
import { getTranslation } from '../data/translations';
import { TOOLS_LIST } from '../data/toolsList';
import { ToolItem } from '../types';

interface FooterProps {
  onOpenGuide?: () => void;
  onOpenInfoModal?: (tab?: InfoModalTab) => void;
  onSelectTool?: (tool: ToolItem) => void;
  currentLanguage?: string;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInfoModal, onSelectTool, currentLanguage = 'en' }) => {
  const t = getTranslation(currentLanguage);

  const handleToolClick = (toolId: string) => {
    const found = TOOLS_LIST.find((tool) => tool.id === toolId);
    if (found && onSelectTool) {
      onSelectTool(found);
    } else if (onOpenInfoModal) {
      onOpenInfoModal('features');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm shadow-indigo-500/30">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Easy<span className="text-indigo-400">doc</span>flow
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {t.footerDesc}
            </p>
          </div>

          {/* Column 1: Popular Tools */}
          <div>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-3">{t.popularTools}</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li 
                className="hover:text-indigo-400 transition-colors cursor-pointer font-medium hover:underline" 
                onClick={() => handleToolClick('merge-pdf')}
              >
                {t.tools['merge-pdf']?.name || 'Merge PDF'}
              </li>
              <li 
                className="hover:text-indigo-400 transition-colors cursor-pointer font-medium hover:underline" 
                onClick={() => handleToolClick('split-pdf')}
              >
                {t.tools['split-pdf']?.name || 'Split PDF'}
              </li>
              <li 
                className="hover:text-indigo-400 transition-colors cursor-pointer font-medium hover:underline" 
                onClick={() => handleToolClick('compress-pdf')}
              >
                {t.tools['compress-pdf']?.name || 'Compress PDF'}
              </li>
              <li 
                className="hover:text-indigo-400 transition-colors cursor-pointer font-medium hover:underline" 
                onClick={() => handleToolClick('pdf-to-text')}
              >
                {t.tools['pdf-to-text']?.name || 'PDF to Word'}
              </li>
              <li 
                className="hover:text-indigo-400 transition-colors cursor-pointer font-medium hover:underline" 
                onClick={() => handleToolClick('image-to-pdf')}
              >
                {t.tools['image-to-pdf']?.name || 'Image to PDF'}
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-3">{t.quickLinks}</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li 
                className="hover:text-indigo-400 transition-colors cursor-pointer font-medium hover:underline" 
                onClick={() => onOpenInfoModal?.('pricing')}
              >
                {t.pricing}
              </li>
              <li 
                className="hover:text-indigo-400 transition-colors cursor-pointer font-medium hover:underline" 
                onClick={() => onOpenInfoModal?.('security')}
              >
                {t.securityPrivacy}
              </li>
              <li 
                className="hover:text-indigo-400 transition-colors cursor-pointer font-medium hover:underline" 
                onClick={() => onOpenInfoModal?.('features')}
              >
                {t.features}
              </li>
              <li 
                className="hover:text-indigo-400 transition-colors cursor-pointer font-medium hover:underline" 
                onClick={() => onOpenInfoModal?.('about')}
              >
                {t.aboutUs}
              </li>
              <li 
                className="hover:text-indigo-400 transition-colors cursor-pointer font-medium hover:underline" 
                onClick={() => onOpenInfoModal?.('support')}
              >
                {t.helpSupport}
              </li>
            </ul>
          </div>

          {/* Column 3: Security & Legal */}
          <div>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-3">{t.securityLegal}</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li 
                className="hover:text-indigo-400 transition-colors cursor-pointer font-medium hover:underline" 
                onClick={() => onOpenInfoModal?.('security')}
              >
                {t.securityPrivacy}
              </li>
              <li 
                className="hover:text-indigo-400 transition-colors cursor-pointer font-medium hover:underline" 
                onClick={() => onOpenInfoModal?.('security')}
              >
                {t.termsOfService}
              </li>
              <li 
                className="hover:text-indigo-400 transition-colors cursor-pointer font-medium hover:underline" 
                onClick={() => onOpenInfoModal?.('security')}
              >
                {t.privacyPolicy}
              </li>
              <li 
                className="hover:text-indigo-400 transition-colors cursor-pointer font-medium hover:underline" 
                onClick={() => onOpenInfoModal?.('security')}
              >
                {t.cookiesSettings}
              </li>
              <li 
                className="hover:text-indigo-400 transition-colors cursor-pointer font-medium hover:underline" 
                onClick={() => onOpenInfoModal?.('security')}
              >
                {t.sslPolicy}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Easydocflow. {t.allRightsReserved}</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{t.clientSecurityGuarantee}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
