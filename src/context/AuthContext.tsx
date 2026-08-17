import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole, name?: string) => void;
  register: (name: string, email: string, role: UserRole, institution?: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  toggleBookmark: (entityId: string) => void;
  isBookmarked: (entityId: string) => boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
}

const DEFAULT_USERS: Record<UserRole, UserProfile> = {
  student: {
    id: 'usr-student',
    name: 'Azizbek Karimov',
    email: 'azizbek.student@edu.uz',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    institution: 'Toshkent Davlat Sharqshunoslik Universiteti, 3-kurs talabasi',
    researchFocus: 'Oʻrta asrlar Sharq diplomatiyasi va Temuriylar davri',
    bookmarks: ['amir-temur', 'samarqand', 'registon-ansambli', 'politimet-jangi'],
    contributionsCount: 4
  },
  researcher: {
    id: 'usr-researcher',
    name: 'Dr. Sardor Yusupov',
    email: 'sardor.yusupov@academy.uz',
    role: 'researcher',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    institution: 'OʻzR Fanlar Akademiyasi Tarix Instituti, Katta ilmiy xodim',
    researchFocus: 'Qadimgi Soʻgʻd numizmatikasi va Buyuk Ipak Yoʻli arxeologiyasi',
    bookmarks: ['spitamen', 'kushon-imperiyasi', 'al-xorazmiy', 'qadesh-shartnomasi'],
    contributionsCount: 28
  },
  moderator: {
    id: 'usr-moderator',
    name: 'Prof. Dilshodbek Rahimov',
    email: 'd.rahimov@heritage.gov.uz',
    role: 'moderator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    institution: 'Tarixiy Ensiklopediya Ilmiy Kengashi Raisi',
    researchFocus: 'Akademik tahririyat, manbashunoslik va tarixiy xaritashunoslik',
    bookmarks: ['temuriylar-saltanati', 'somoniylar-davlati', 'anqara-jangi', 'minora-i-kalon'],
    contributionsCount: 142
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('turon_history_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Default logged in as Student for immediate preview
    return DEFAULT_USERS.student;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if (user) {
      localStorage.setItem('turon_history_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('turon_history_user');
    }
  }, [user]);

  const login = (email: string, role: UserRole = 'student', name?: string) => {
    const preset = DEFAULT_USERS[role];
    const newUser: UserProfile = {
      ...preset,
      email: email || preset.email,
      name: name || preset.name
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const register = (name: string, email: string, role: UserRole, institution?: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      institution: institution || 'Oʻzbekiston Milliy Universiteti',
      researchFocus: 'Tarixiy manbashunoslik',
      bookmarks: ['amir-temur', 'samarqand'],
      contributionsCount: 0
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    const preset = DEFAULT_USERS[newRole];
    setUser(preset);
  };

  const toggleBookmark = (entityId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    const exists = user.bookmarks.includes(entityId);
    const updatedBookmarks = exists
      ? user.bookmarks.filter(id => id !== entityId)
      : [...user.bookmarks, entityId];

    setUser({
      ...user,
      bookmarks: updatedBookmarks
    });
  };

  const isBookmarked = (entityId: string) => {
    return !!user?.bookmarks.includes(entityId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        switchRole,
        toggleBookmark,
        isBookmarked,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
