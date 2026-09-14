import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Map,
  Clock,
  Compass,
  Landmark,
  Shield,
  Scroll,
  Users,
  Palette,
  Bookmark,
  CheckSquare,
  Sparkles,
  Menu,
  X,
  UserCheck,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ThemeMode, UserRole } from '../types';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, switchRole, setIsAuthModalOpen, setAuthModalMode } = useAuth();
  const { theme, setTheme, themeConfig } = useTheme();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Shaxslar', path: '/persons', icon: Users },
    { name: 'Davlatlar', path: '/states', icon: Landmark },
    { name: 'Shaharlar', path: '/cities', icon: Compass },
    { name: 'Urushlar', path: '/conflicts', icon: Shield },
    { name: 'Sulhlar', path: '/treaties', icon: Scroll },
    { name: 'Obidalar', path: '/monuments', icon: BookOpen },
    { name: 'Vaqt Shkalasi', path: '/timeline', icon: Clock, highlight: true },
    { name: 'GIS Xarita', path: '/map', icon: Map, highlight: true }
  ];

  const themesList: { id: ThemeMode; label: string; dotColor: string }[] = [
    { id: 'dark', label: 'Imperial Dark', dotColor: 'bg-amber-500' },
    { id: 'light', label: 'Pergament', dotColor: 'bg-amber-800' },
    { id: 'gold', label: 'Sultoniy / Oltin', dotColor: 'bg-yellow-400' },
    { id: 'antique', label: 'Antik Klassika', dotColor: 'bg-orange-500' },
    { id: 'modern', label: 'Clean Slate', dotColor: 'bg-cyan-400' }
  ];

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'moderator':
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40">Moderator</span>;
      case 'researcher':
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/40">Tadqiqotchi</span>;
      default:
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40">Oʻquvchi</span>;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0908]/95 backdrop-blur-md border-b border-[#5E503F]/40 transition-colors shadow-lg shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portal Title with Immersive Diamond Crest */}
          <Link to="/" className="flex min-w-0 shrink items-center gap-2.5 group">
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#C6AC8F] rotate-45 flex items-center justify-center group-hover:border-[#EAE0D5] transition-colors shadow-[0_0_12px_rgba(198,172,143,0.3)] bg-[#141210]">
                <span className="-rotate-45 font-heading font-black text-sm text-[#C6AC8F] group-hover:text-[#EAE0D5]">
                  T
                </span>
              </div>
            </div>
            <div className="min-w-0 max-w-[132px] sm:max-w-none">
              <span className="font-heading font-black text-xs sm:text-base lg:text-lg text-[#EAE0D5] tracking-[0.08em] sm:tracking-[0.14em] whitespace-nowrap block leading-tight group-hover:text-[#C6AC8F] transition-colors">
                TURON TARIX
              </span>
              <span className="hidden lg:block text-[9px] uppercase tracking-[0.14em] text-[#C6AC8F]/80 font-mono font-medium truncate max-w-[210px]">
                Ilmiy Portal & Ensiklopediya
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex min-w-0 items-center gap-0.5">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#C6AC8F] text-[#0A0908] font-bold shadow-md shadow-[#C6AC8F]/20'
                      : link.highlight
                      ? 'text-[#C6AC8F] hover:text-[#EAE0D5] hover:bg-[#5E503F]/20 border border-[#5E503F]/40'
                      : 'text-[#EAE0D5]/75 hover:text-[#EAE0D5] hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              id="navbar-search-btn"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141210] hover:bg-[#1C1916] border border-[#5E503F]/50 hover:border-[#C6AC8F]/70 text-[#EAE0D5]/80 text-xs transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#C6AC8F]" />
              <span className="hidden sm:inline font-mono text-[11px]">Qidirish...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/5 text-[9px] text-[#C6AC8F] border border-[#5E503F]/40">
                ⌘K
              </kbd>
            </button>

            {/* Wiki & AI Hub Link */}
            <Link
              to="/sources"
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-all ${
                location.pathname === '/sources'
                  ? 'bg-[#C6AC8F]/20 text-[#EAE0D5] border-[#C6AC8F]'
                  : 'bg-white/5 hover:bg-[#C6AC8F]/10 text-[#C6AC8F] border-[#5E503F]/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C6AC8F]" />
              <span>Manbalar & AI</span>
            </Link>

            {/* Approvals link for Researchers/Moderators */}
            <Link
              to="/admin/approvals"
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-all ${
                location.pathname === '/admin/approvals'
                  ? 'bg-emerald-500/20 text-emerald-200 border-emerald-500/50'
                  : 'bg-white/5 hover:bg-emerald-500/10 text-emerald-300 border-[#5E503F]/50'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tahririyat</span>
            </Link>

            {/* Bookmarks */}
            <Link
              to="/bookmarks"
              className="p-2 rounded-lg bg-[#141210] hover:bg-[#1C1916] border border-[#5E503F]/40 text-[#EAE0D5]/80 hover:text-[#C6AC8F] transition-colors relative"
              title="Saqlanganlar"
            >
              <Bookmark className="w-4 h-4" />
              {user && user.bookmarks.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C6AC8F] text-[#0A0908] text-[9px] font-bold flex items-center justify-center">
                  {user.bookmarks.length}
                </span>
              )}
            </Link>

            {/* Theme Selector Dropdown */}
            <div className="relative">
              <button
                id="theme-dropdown-btn"
                onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                className="p-2 rounded-lg bg-[#141210] hover:bg-[#1C1916] border border-[#5E503F]/40 text-[#C6AC8F] transition-colors"
                title="Mavzuni tanlash"
              >
                <Palette className="w-4 h-4" />
              </button>

              {isThemeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-[#141210] border border-[#5E503F] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#C6AC8F] border-b border-[#5E503F]/40 mb-1">
                    Dizayn Mavzusi
                  </div>
                  {themesList.map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setIsThemeDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors text-left ${
                        theme === t.id ? 'bg-[#C6AC8F]/20 text-[#EAE0D5] font-bold' : 'text-[#EAE0D5]/70 hover:bg-white/5 hover:text-[#EAE0D5]'
                      }`}
                    >
                      <span>{t.label}</span>
                      <span className={`w-2.5 h-2.5 rounded-full ${t.dotColor}`}></span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile / Persona Selector */}
            {user ? (
              <div className="relative">
                <button
                  id="user-profile-btn"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl bg-[#141210] hover:bg-[#1C1916] border border-[#5E503F]/50 transition-all cursor-pointer"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover border border-[#C6AC8F]/50"
                  />
                  <div className="hidden sm:block text-left">
                    <span className="block text-xs font-semibold text-[#EAE0D5] leading-none">
                      {user.name.split(' ')[0]}
                    </span>
                    <span className="block mt-0.5">{getRoleBadge(user.role)}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#C6AC8F]" />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#141210] border border-[#5E503F] rounded-xl shadow-2xl py-3 z-50">
                    <div className="px-4 pb-2 border-b border-[#5E503F]/40">
                      <div className="font-semibold text-sm text-[#EAE0D5]">{user.name}</div>
                      <div className="text-[11px] text-[#A89F91] truncate">{user.email}</div>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        {getRoleBadge(user.role)}
                        <span className="text-[11px] text-[#C6AC8F]">
                          {user.contributionsCount} ta hissa
                        </span>
                      </div>
                    </div>

                    {/* Quick Switch Roles */}
                    <div className="px-4 py-2 border-b border-[#5E503F]/40">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#C6AC8F] block mb-1.5">
                        Rolni almashtirish:
                      </span>
                      <div className="grid grid-cols-3 gap-1">
                        <button
                          onClick={() => {
                            switchRole('student');
                            setIsUserDropdownOpen(false);
                          }}
                          className={`px-2 py-1 rounded text-[11px] font-medium ${
                            user.role === 'student' ? 'bg-[#C6AC8F] text-[#0A0908] font-bold' : 'bg-white/5 text-[#EAE0D5]/80 hover:bg-white/10'
                          }`}
                        >
                          Talaba
                        </button>
                        <button
                          onClick={() => {
                            switchRole('researcher');
                            setIsUserDropdownOpen(false);
                          }}
                          className={`px-2 py-1 rounded text-[11px] font-medium ${
                            user.role === 'researcher' ? 'bg-[#C6AC8F] text-[#0A0908] font-bold' : 'bg-white/5 text-[#EAE0D5]/80 hover:bg-white/10'
                          }`}
                        >
                          Olim
                        </button>
                        <button
                          onClick={() => {
                            switchRole('moderator');
                            setIsUserDropdownOpen(false);
                          }}
                          className={`px-2 py-1 rounded text-[11px] font-medium ${
                            user.role === 'moderator' ? 'bg-[#C6AC8F] text-[#0A0908] font-bold' : 'bg-white/5 text-[#EAE0D5]/80 hover:bg-white/10'
                          }`}
                        >
                          Admin
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 px-2">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Chiqish
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="navbar-login-btn"
                onClick={() => {
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C6AC8F] hover:bg-[#EAE0D5] text-[#0A0908] font-sans font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Kirish</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-[#141210] border border-[#5E503F]/40 text-[#EAE0D5] hover:text-[#C6AC8F]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden px-4 pt-2 pb-6 bg-[#0A0908] border-b border-[#5E503F]/40 space-y-1.5">
          {navLinks.map(link => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  location.pathname === link.path
                    ? 'bg-[#C6AC8F] text-[#0A0908] font-bold'
                    : 'text-[#EAE0D5] hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 text-[#C6AC8F]" />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-[#5E503F]/30 flex gap-2">
            <Link
              to="/sources"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[#C6AC8F]/20 text-[#EAE0D5] border border-[#5E503F] text-xs font-semibold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C6AC8F]" />
              Manbalar & AI
            </Link>
            <Link
              to="/admin/approvals"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 text-xs font-semibold uppercase tracking-wider"
            >
              <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
              Tahririyat
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
