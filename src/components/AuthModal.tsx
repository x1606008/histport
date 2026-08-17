import React, { useState } from 'react';
import { X, ShieldCheck, GraduationCap, Microscope, KeyRound, Sparkles, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    register,
    switchRole
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [institution, setInstitution] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authModalMode === 'login') {
      login(email || 'foydalanuvchi@turon.uz', role, name || undefined);
    } else {
      register(name || 'Yangi Tadqiqotchi', email || 'yangi@turon.uz', role, institution);
    }
  };

  const handleQuickPersonaSelect = (selectedRole: UserRole) => {
    switchRole(selectedRole);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div
        id="auth-modal-card"
        className="relative w-full max-w-lg bg-[#141210] border border-[#5E503F] rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#5E503F]/40 bg-[#0A0908]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#C6AC8F]" />
            <h3 className="font-heading text-lg font-bold text-[#EAE0D5]">
              {authModalMode === 'login' ? 'Tizimga Kirish (Akademik Auth)' : 'Aʼzo Boʻlish (Roʻyxatdan Oʻtish)'}
            </h3>
          </div>
          <button
            id="close-auth-modal-btn"
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-lg text-[#A89F91] hover:text-[#EAE0D5] hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 bg-[#141210]">
          {/* Quick Persona Selector for Testing */}
          <div className="p-4 rounded-xl bg-[#0A0908] border border-[#5E503F]/50 space-y-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#C6AC8F]">
              <Sparkles className="w-3.5 h-3.5" />
              Tezkor Sinov Rejimlari (1-Click Personas):
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                id="persona-student-btn"
                onClick={() => handleQuickPersonaSelect('student')}
                className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-[#141210] hover:bg-[#C6AC8F]/20 border border-[#5E503F]/50 hover:border-[#C6AC8F] text-center transition-all cursor-pointer"
              >
                <GraduationCap className="w-5 h-5 text-[#C6AC8F]" />
                <span className="text-xs font-semibold text-[#EAE0D5]">Oʻquvchi</span>
                <span className="text-[9px] text-[#A89F91]">Mutolaa & Qidiruv</span>
              </button>

              <button
                type="button"
                id="persona-researcher-btn"
                onClick={() => handleQuickPersonaSelect('researcher')}
                className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-[#141210] hover:bg-[#C6AC8F]/20 border border-[#5E503F]/50 hover:border-[#C6AC8F] text-center transition-all cursor-pointer"
              >
                <Microscope className="w-5 h-5 text-[#C6AC8F]" />
                <span className="text-xs font-semibold text-[#EAE0D5]">Tadqiqotchi</span>
                <span className="text-[9px] text-[#A89F91]">Tahrir taklifi</span>
              </button>

              <button
                type="button"
                id="persona-moderator-btn"
                onClick={() => handleQuickPersonaSelect('moderator')}
                className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-[#141210] hover:bg-[#C6AC8F]/20 border border-[#5E503F]/50 hover:border-[#C6AC8F] text-center transition-all cursor-pointer"
              >
                <KeyRound className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-semibold text-[#EAE0D5]">Moderator</span>
                <span className="text-[9px] text-[#A89F91]">Tasdiqlash</span>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#5E503F]/40 w-full"></div>
            <span className="bg-[#141210] px-3 text-[10px] text-[#A89F91] uppercase font-mono tracking-wider">yoki mustaqil kirish</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authModalMode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-[#EAE0D5] mb-1">Toʻliq Ismingiz</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Masalan: Sardor Yusupov"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0A0908] border border-[#5E503F]/50 text-[#EAE0D5] placeholder:text-[#5E503F] text-sm focus:outline-none focus:border-[#C6AC8F]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#EAE0D5] mb-1">Email Manzili</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="nomi@institut.uz"
                className="w-full px-3.5 py-2 rounded-lg bg-[#0A0908] border border-[#5E503F]/50 text-[#EAE0D5] placeholder:text-[#5E503F] text-sm focus:outline-none focus:border-[#C6AC8F]"
              />
            </div>

            {authModalMode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-[#EAE0D5] mb-1">Ilmiy Muassasa / Universitet</label>
                <input
                  type="text"
                  value={institution}
                  onChange={e => setInstitution(e.target.value)}
                  placeholder="OʻzR Fanlar Akademiyasi Tarix Instituti"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0A0908] border border-[#5E503F]/50 text-[#EAE0D5] placeholder:text-[#5E503F] text-sm focus:outline-none focus:border-[#C6AC8F]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#EAE0D5] mb-1">Platformadagi Rolingiz</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value as UserRole)}
                className="w-full px-3.5 py-2 rounded-lg bg-[#0A0908] border border-[#5E503F]/50 text-[#EAE0D5] text-sm focus:outline-none focus:border-[#C6AC8F]"
              >
                <option value="student">Oʻquvchi / Talaba (Oʻqish, Saqlab qoʻyish)</option>
                <option value="researcher">Izlanuvchi / Mutaxassis (Maqola taklif qilish)</option>
                <option value="moderator">Administrator / Ilmiy Moderator</option>
              </select>
            </div>

            <button
              id="auth-submit-btn"
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#C6AC8F] hover:bg-[#EAE0D5] text-[#0A0908] font-bold text-xs uppercase tracking-wider shadow-lg shadow-black/50 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <UserCheck className="w-4 h-4" />
              {authModalMode === 'login' ? 'Tizimga Kirish' : 'Roʻyxatdan Oʻtish'}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="text-center pt-2">
            {authModalMode === 'login' ? (
              <p className="text-xs text-[#A89F91]">
                Hisobingiz yoʻqmi?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('register')}
                  className="text-[#C6AC8F] hover:underline font-semibold"
                >
                  Roʻyxatdan oʻting
                </button>
              </p>
            ) : (
              <p className="text-xs text-[#A89F91]">
                Hisobingiz bormi?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('login')}
                  className="text-[#C6AC8F] hover:underline font-semibold"
                >
                  Tizimga kiring
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
