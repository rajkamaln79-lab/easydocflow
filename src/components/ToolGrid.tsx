import React from 'react';
import { 
  Combine, 
  Split, 
  Minimize2, 
  Image as ImageIcon, 
  FileImage, 
  FileText, 
  FileCode, 
  Stamp, 
  PenTool, 
  RotateCw, 
  LayoutGrid, 
  Hash, 
  Lock, 
  Unlock, 
  Sparkles, 
  MessageSquareText, 
  Languages, 
  ScanText,
  Wand2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Bot,
  Zap,
  Layers
} from 'lucide-react';
import { ToolItem } from '../types';
import { TOOLS_LIST } from '../data/toolsList';
import { getTranslation } from '../data/translations';

interface ToolGridProps {
  tools: ToolItem[];
  onSelectTool: (tool: ToolItem) => void;
  currentLanguage?: string;
}

// Icon helper renderer
const renderIcon = (iconName: string, iconColorClass: string) => {
  const props = { className: `w-6 h-6 ${iconColorClass} stroke-[2.2] group-hover:scale-110 transition-transform duration-200` };
  switch (iconName) {
    case 'Combine': return <Combine {...props} />;
    case 'Split': return <Split {...props} />;
    case 'Minimize2': return <Minimize2 {...props} />;
    case 'Image': return <ImageIcon {...props} />;
    case 'FileImage': return <FileImage {...props} />;
    case 'FileText': return <FileText {...props} />;
    case 'FileCode': return <FileCode {...props} />;
    case 'Stamp': return <Stamp {...props} />;
    case 'PenTool': return <PenTool {...props} />;
    case 'RotateCw': return <RotateCw {...props} />;
    case 'LayoutGrid': return <LayoutGrid {...props} />;
    case 'Hash': return <Hash {...props} />;
    case 'Lock': return <Lock {...props} />;
    case 'ShieldCheck': return <ShieldCheck {...props} />;
    case 'Unlock': return <Unlock {...props} />;
    case 'Sparkles': return <Sparkles {...props} />;
    case 'MessageSquareText': return <MessageSquareText {...props} />;
    case 'Languages': return <Languages {...props} />;
    case 'ScanText': return <ScanText {...props} />;
    case 'Wand2': return <Wand2 {...props} />;
    default: return <FileText {...props} />;
  }
};

const getCategoryIconStyle = (category: string, isAi?: boolean) => {
  if (isAi || category === 'ai') {
    return {
      boxBg: 'bg-violet-100/90 border border-violet-200/80',
      iconColor: 'text-violet-600',
      hoverBorder: 'hover:border-violet-400/80',
      hoverText: 'group-hover:text-violet-600',
    };
  }
  switch (category) {
    case 'organize':
    case 'convert':
      return {
        boxBg: 'bg-blue-100/90 border border-blue-200/80',
        iconColor: 'text-blue-600',
        hoverBorder: 'hover:border-blue-400/80',
        hoverText: 'group-hover:text-blue-600',
      };
    case 'optimize':
      return {
        boxBg: 'bg-amber-100/90 border border-amber-200/80',
        iconColor: 'text-amber-700',
        hoverBorder: 'hover:border-amber-400/80',
        hoverText: 'group-hover:text-amber-700',
      };
    case 'security':
      return {
        boxBg: 'bg-emerald-100/90 border border-emerald-200/80',
        iconColor: 'text-emerald-700',
        hoverBorder: 'hover:border-emerald-400/80',
        hoverText: 'group-hover:text-emerald-700',
      };
    case 'edit':
      return {
        boxBg: 'bg-rose-100/90 border border-rose-200/80',
        iconColor: 'text-rose-600',
        hoverBorder: 'hover:border-rose-400/80',
        hoverText: 'group-hover:text-rose-600',
      };
    default:
      return {
        boxBg: 'bg-indigo-100/90 border border-indigo-200/80',
        iconColor: 'text-indigo-600',
        hoverBorder: 'hover:border-indigo-400/80',
        hoverText: 'group-hover:text-indigo-600',
      };
  }
};

export const ToolGrid: React.FC<ToolGridProps> = ({ tools, onSelectTool, currentLanguage = 'en' }) => {
  const t = getTranslation(currentLanguage);

  const scrollToGrid = () => {
    const el = document.getElementById('tools-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTryAiSummarizer = () => {
    const aiTool = TOOLS_LIST.find((t) => t.id === 'ai-summarizer');
    if (aiTool) {
      onSelectTool(aiTool);
    }
  };

  return (
    <section className="py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Centered Hero Section Layout */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3 sm:space-y-3.5">
        
        {/* Top Pill Tag */}
        <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-3.5 py-1 rounded-full text-xs font-bold shadow-xs tracking-wide">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{t.heroTag}</span>
        </div>

        {/* Main Hero Heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-[1.12]">
          {t.heroHeadingLine1}{' '}
          <span className="inline-block bg-indigo-100/90 text-indigo-700 px-3 py-0.5 rounded-xl font-black shadow-2xs border border-indigo-200/80">
            {t.heroHeadingHighlight}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 leading-snug font-normal max-w-xl mx-auto">
          {t.heroSubtitle}
        </p>

        {/* Action Call-To-Action & Trust Indicators */}
        <div className="pt-1 flex flex-col items-center gap-2.5 w-full">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={scrollToGrid}
              type="button"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/25 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{t.exploreToolsBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleTryAiSummarizer}
              type="button"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 active:from-violet-800 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-md shadow-violet-500/20 hover:-translate-y-0.5 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>{t.tryAiSummarizerBtn}</span>
            </button>
          </div>

          {/* Micro Feature Trust Bullet points */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-y-1 gap-x-4 text-[11px] sm:text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {t.trustFree}
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {t.trustNoInstall}
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {t.trustClientPrivacy}
            </span>
          </div>
        </div>

      </div>

      {/* Grid Anchor Header */}
      <div id="tools-grid" className="scroll-mt-24 mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>{t.availableToolsHeading}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.availableToolsSub}
          </p>
        </div>
        <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200">
          {tools.length} Tools
        </span>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {tools.map((tool) => {
          const style = getCategoryIconStyle(tool.category, tool.isAi);
          const localizedTool = t.tools[tool.id];
          const toolName = localizedTool?.name || tool.name;
          const toolDesc = localizedTool?.description || tool.description;

          return (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool)}
              className={`group cursor-pointer relative bg-white border border-slate-200/90 ${style.hoverBorder} rounded-2xl p-5 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between ${
                tool.isAi ? 'bg-gradient-to-b from-violet-50/40 via-white to-white' : ''
              }`}
            >
              <div>
                {/* Icon & Badge Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${style.boxBg}`}>
                    {renderIcon(tool.iconName, style.iconColor)}
                  </div>

                  {tool.badge && (
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${tool.badgeColor || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                      {localizedTool?.badge || tool.badge}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className={`text-lg font-bold text-slate-900 ${style.hoverText} transition-colors flex items-center gap-1`}>
                  {toolName}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                  {toolDesc}
                </p>
              </div>

              {/* Bottom Action Indicator */}
              <div className={`mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 ${style.hoverText} transition-colors`}>
                <span>{t.launchTool}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {tools.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500 text-base font-medium">{t.noToolsFound}</p>
          <p className="text-slate-400 text-xs mt-1">{t.tryDifferentSearch}</p>
        </div>
      )}
    </section>
  );
};
