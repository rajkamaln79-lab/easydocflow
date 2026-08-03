import React, { useState, useRef, useCallback } from 'react';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  originalUrl: string;
  enhancedUrl: string;
  originalDimensions: { w: number; h: number };
  enhancedDimensions: { w: number; h: number };
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  originalUrl,
  enhancedUrl,
  originalDimensions,
  enhancedDimensions,
}) => {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      setSliderPos(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="space-y-2">
      {/* Dimension & Label Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-300 px-1">
        <span className="flex items-center gap-1.5 text-slate-400">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
          Original ({originalDimensions.w} × {originalDimensions.h}px)
        </span>
        <span className="flex items-center gap-1.5 text-amber-300 font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          AI 4K Enhanced ({enhancedDimensions.w} × {enhancedDimensions.h}px)
        </span>
      </div>

      {/* Interactive Slider Container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 select-none cursor-ew-resize shadow-2xl"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={(e) => {
          setIsDragging(true);
          if (e.touches[0]) handleMove(e.touches[0].clientX);
        }}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        {/* Enhanced Image (Background Base) */}
        <img
          src={enhancedUrl}
          alt="AI 4K Enhanced"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />

        {/* Original Image (Clipped Overlay) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none border-r-2 border-amber-400/90 shadow-2xl"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={originalUrl}
            alt="Original Photo"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none max-w-none"
            style={{
              // Ensure clipped original aligns exactly with background
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              height: containerRef.current ? `${containerRef.current.clientHeight}px` : '100%',
            }}
          />
        </div>

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-200 text-[10px] font-bold px-2.5 py-1 rounded-lg pointer-events-none shadow-md">
          BEFORE
        </div>
        <div className="absolute top-3 right-3 bg-amber-500/90 backdrop-blur-md text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-lg pointer-events-none shadow-md flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          AFTER (4K)
        </div>

        {/* Divider Handle */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none flex items-center justify-center -ml-4"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 shadow-xl flex items-center justify-center ring-4 ring-slate-900/60 transition-transform hover:scale-110">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] text-slate-400 italic">
        💡 Drag slider left / right or tap to compare Original vs AI 4K Enhanced detail
      </p>
    </div>
  );
};
