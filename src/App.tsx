import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { HistoricalDataProvider } from './context/HistoricalDataContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthModal } from './components/AuthModal';
import { ReadingProgressBar } from './components/ReadingProgressBar';

import { HomePage } from './pages/HomePage';
import { PersonsPage } from './pages/PersonsPage';
import { StatesPage } from './pages/StatesPage';
import { CitiesPage } from './pages/CitiesPage';
import { ConflictsPage } from './pages/ConflictsPage';
import { TreatiesPage } from './pages/TreatiesPage';
import { MonumentsPage } from './pages/MonumentsPage';
import { TimelinePage } from './pages/TimelinePage';
import { MapGisPage } from './pages/MapGisPage';
import { SourcesAndAiPage } from './pages/SourcesAndAiPage';
import { ApprovalsAdminPage } from './pages/ApprovalsAdminPage';
import { BookmarksPage } from './pages/BookmarksPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainAppLayout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { themeConfig } = useTheme();

  // Keyboard shortcut ⌘K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${themeConfig.bgClass} transition-colors duration-300 font-sans selection:bg-amber-500 selection:text-black`}>
      <ScrollToTop />
      <ReadingProgressBar />
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onOpenSearch={() => setIsSearchOpen(true)} />} />
          <Route path="/persons" element={<PersonsPage />} />
          <Route path="/states" element={<StatesPage />} />
          <Route path="/cities" element={<CitiesPage />} />
          <Route path="/conflicts" element={<ConflictsPage />} />
          <Route path="/treaties" element={<TreatiesPage />} />
          <Route path="/monuments" element={<MonumentsPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/map" element={<MapGisPage />} />
          <Route path="/sources" element={<SourcesAndAiPage />} />
          <Route path="/admin/approvals" element={<ApprovalsAdminPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="*" element={<HomePage onOpenSearch={() => setIsSearchOpen(true)} />} />
        </Routes>
      </main>

      <Footer />
      <AiAssistantDrawer />
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HistoricalDataProvider>
          <BrowserRouter>
            <MainAppLayout />
          </BrowserRouter>
        </HistoricalDataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
