import React from 'react';
import { 
  Laptop, 
  Smartphone, 
  Building2, 
  Sparkles, 
  Check, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Star 
} from 'lucide-react';

interface BannerSectionProps {
  onOpenGuide: () => void;
}

export const BannerSection: React.FC<BannerSectionProps> = ({ onOpenGuide }) => {
  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. Work Your Way Cards */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-center text-slate-900 mb-8 tracking-tight">
          Work your way with <span className="text-indigo-600">Easydocflow</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Work online</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Batch edit, merge, split, and compress document files locally with instant browser execution and zero latency.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
              <span>Client-Side Security</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">On-the-go with Mobile</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Responsive mobile-first tools right in your pocket. Keep working on your PDF projects anytime, anywhere.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
              <span>Mobile Touch Optimized</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Built for Business & AI</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Automate document summarization, extract tables, translate text with Easydocflow AI, and scale document workflows.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
              <span>AI Smart Workflows</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Premium Features Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-violet-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-indigo-800/50">
        <div className="max-w-2xl relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full uppercase tracking-wider border border-amber-400/30">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            Easydocflow Premium & AI
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Get more done with AI Smart Document Workflows
          </h2>

          <ul className="space-y-3 text-sm text-slate-200 font-medium">
            <li className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>Instant AI Document Summarization & Key Bullet Points</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>Batch PDF merging, splitting, watermarking with unlimited page limits</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>256-Bit SSL Encryption & zero server file retention guarantee</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Security Certifications Footer */}
      <div className="text-center py-6 border-t border-slate-200">
        <h3 className="text-lg font-black text-slate-900 mb-2">
          The PDF software trusted by users worldwide
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mb-6">
          Easydocflow is your all-in-one web app for editing PDFs with speed and confidence. Enjoy secure document processing while keeping your privacy safe.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-bold text-slate-600 uppercase tracking-wider">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ISO 27001 Certified</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>256-Bit SSL Encryption</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Client-Side Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
