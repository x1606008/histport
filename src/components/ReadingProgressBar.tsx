import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ReadingProgressBarProps {
  className?: string;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  className = ''
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Reset progress when route changes
    setProgress(0);
    setIsVisible(false);

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement | Document | null;

      if (!target || target === document || target === document.documentElement) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        const total = scrollHeight - clientHeight;

        if (total > 80) {
          const currentProgress = Math.min(100, Math.max(0, (scrollTop / total) * 100));
          setProgress(currentProgress);
          setIsVisible(scrollTop > 15);
        } else {
          setIsVisible(false);
        }
      } else if (target instanceof HTMLElement) {
        // Inner scrollable article container (e.g. modals, drawers)
        const scrollHeight = target.scrollHeight;
        const clientHeight = target.clientHeight;
        const total = scrollHeight - clientHeight;

        if (total > 80) {
          const scrollTop = target.scrollTop;
          const currentProgress = Math.min(100, Math.max(0, (scrollTop / total) * 100));
          setProgress(currentProgress);
          setIsVisible(scrollTop > 10);
        }
      }
    };

    // Use capture: true so inner container scroll events bubble up
    document.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    window.addEventListener('resize', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 80) {
        setProgress(Math.min(100, Math.max(0, (scrollTop / total) * 100)));
      }
    }, { passive: true });

    return () => {
      document.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, [location.pathname]);

  return (
    <div
      id="golden-reading-progress-container"
      className={`fixed top-0 left-0 right-0 z-50 h-[3.5px] pointer-events-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {/* Background track */}
      <div className="w-full h-full bg-[#0A0908]/80 backdrop-blur-sm">
        {/* Active Golden Gradient Progress Bar */}
        <div
          id="golden-reading-progress-bar"
          className="h-full bg-gradient-to-r from-[#5E503F] via-[#C6AC8F] to-[#EAE0D5] transition-[width] duration-150 ease-out shadow-[0_0_12px_rgba(198,172,143,0.85)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Golden progress percentage badge */}
      {isVisible && progress > 2 && (
        <div
          className="absolute top-2 transition-[left] duration-150 ease-out -translate-x-1/2"
          style={{ left: `${Math.min(95, Math.max(5, progress))}%` }}
        >
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold text-[#0A0908] bg-[#C6AC8F] rounded-full shadow-lg border border-[#5E503F]/60 leading-none">
            <span>{Math.round(progress)}%</span>
            <span className="text-[8px] uppercase tracking-wider font-sans font-medium text-[#0A0908]/70">mutolaa</span>
          </span>
        </div>
      )}
    </div>
  );
};
