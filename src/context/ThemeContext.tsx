import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode } from '../types';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  themeConfig: {
    name: string;
    bgClass: string;
    cardBgClass: string;
    borderClass: string;
    textPrimary: string;
    textSecondary: string;
    accentGold: string;
    heroOverlay: string;
  };
}

const THEME_PRESETS: Record<ThemeMode, {
  name: string;
  bgClass: string;
  cardBgClass: string;
  borderClass: string;
  textPrimary: string;
  textSecondary: string;
  accentGold: string;
  heroOverlay: string;
}> = {
  dark: {
    name: 'Immersive Dark (Turon Obsidiani)',
    bgClass: 'bg-[#0A0908] text-[#EAE0D5]',
    cardBgClass: 'bg-[#141210]/95 backdrop-blur-md border border-[#5E503F]/40 shadow-xl shadow-black/60',
    borderClass: 'border-[#5E503F]/40 hover:border-[#C6AC8F]/70',
    textPrimary: 'text-[#EAE0D5]',
    textSecondary: 'text-[#C6AC8F]/80',
    accentGold: 'text-[#C6AC8F]',
    heroOverlay: 'from-[#0A0908] via-[#0A0908]/85 to-transparent'
  },
  light: {
    name: 'Pergament (Antik Qogʻoz)',
    bgClass: 'bg-[#f7f3e8] text-[#2c241c]',
    cardBgClass: 'bg-[#fffdf9]/95 backdrop-blur-md shadow-sm border border-[#5E503F]/20',
    borderClass: 'border-[#5E503F]/30 hover:border-[#5E503F]/70',
    textPrimary: 'text-[#2c241c]',
    textSecondary: 'text-[#5E503F]',
    accentGold: 'text-[#8c6d48]',
    heroOverlay: 'from-[#f7f3e8] via-[#f7f3e8]/85 to-transparent'
  },
  gold: {
    name: 'Sultoniy / Oltin (Royal Gold)',
    bgClass: 'bg-[#0e0c08] text-[#fbf4ea]',
    cardBgClass: 'bg-[#1a1610]/95 backdrop-blur-md border border-[#C6AC8F]/30 shadow-xl',
    borderClass: 'border-[#C6AC8F]/40 hover:border-[#C6AC8F]',
    textPrimary: 'text-[#f5ebd9]',
    textSecondary: 'text-[#C6AC8F]/80',
    accentGold: 'text-[#e5c298]',
    heroOverlay: 'from-[#0e0c08] via-[#0e0c08]/85 to-transparent'
  },
  antique: {
    name: 'Antik Bronza (Bronze & Stone)',
    bgClass: 'bg-[#12100e] text-[#EAE0D5]',
    cardBgClass: 'bg-[#1c1916]/95 backdrop-blur-md border border-[#5E503F]/40 shadow-xl',
    borderClass: 'border-[#5E503F]/50 hover:border-[#C6AC8F]/70',
    textPrimary: 'text-[#EAE0D5]',
    textSecondary: 'text-[#a69c8f]',
    accentGold: 'text-[#C6AC8F]',
    heroOverlay: 'from-[#12100e] via-[#12100e]/85 to-transparent'
  },
  modern: {
    name: 'Zamonaviy Obsidiyan (Deep Charcoal)',
    bgClass: 'bg-[#0A0908] text-[#EAE0D5]',
    cardBgClass: 'bg-[#13110f]/95 backdrop-blur-md border border-[#5E503F]/40',
    borderClass: 'border-[#5E503F]/40 hover:border-[#C6AC8F]/60',
    textPrimary: 'text-[#EAE0D5]',
    textSecondary: 'text-[#9c9182]',
    accentGold: 'text-[#C6AC8F]',
    heroOverlay: 'from-[#0A0908] via-[#0A0908]/85 to-transparent'
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('turon_history_theme');
    return (saved as ThemeMode) || 'dark';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('turon_history_theme', newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-dark', 'theme-light', 'theme-gold', 'theme-antique', 'theme-modern');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeConfig: THEME_PRESETS[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
