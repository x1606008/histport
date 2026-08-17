import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  History,
  FileText,
  AlertCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useHistoricalData } from '../context/HistoricalDataContext';
import { useAuth } from '../context/AuthContext';
import { EditProposal } from '../types';

export const ApprovalsAdminPage: React.FC = () => {
  const { proposals, approveProposal, rejectProposal } = useHistoricalData();
  const { user } = useAuth();

  const [selectedProposal, setSelectedProposal] = useState<EditProposal | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectBox, setShowRejectBox] = useState(false);

  const filteredProposals = proposals.filter(p => {
    if (filterStatus === 'all') return true;
    return p.status === filterStatus;
  });

  const handleApprove = (prop: EditProposal) => {
    approveProposal(prop.id);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setSelectedProposal(null);
  };

  const handleReject = (prop: EditProposal) => {
    if (!rejectReason.trim()) return;
    rejectProposal(prop.id, rejectReason);
    setRejectReason('');
    setShowRejectBox(false);
    setSelectedProposal(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-r from-[#0a1510] via-[#102419] to-[#0a1510] p-8 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Akademik Tahririyat & Kengash Nazorati</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-emerald-100">
            Tahrirlar va Takliflarni Tasdiqlash Paneli
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed font-sans-hist">
            Tadqiqotchilar va talabalar tomonidan yuborilgan ilmiy qoʻshimchalar, yangi arxiv maʼlumotlari hamda bibliografik tuzatishlarni koʻrib chiqish va tasdiqlash markazi.
          </p>
        </div>
      </div>

      {/* Role notice */}
      <div className="p-4 rounded-2xl bg-[#121622] border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Hozirgi foydalanuvchi roli:</div>
            <div className="text-sm font-bold text-white">
              {user ? user.name : 'Mehmon'} (
              <span className="text-amber-400 uppercase text-xs">{user?.role || 'student'}</span>)
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 text-xs">
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'pending', label: 'Kutilmoqda (Pending)' },
            { id: 'approved', label: 'Tasdiqlangan' },
            { id: 'rejected', label: 'Rad etilgan' }
          ].map(st => (
            <button
              key={st.id}
              onClick={() => setFilterStatus(st.id as any)}
              className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                filterStatus === st.id
                  ? 'bg-emerald-500 text-black font-semibold shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {filteredProposals.length === 0 ? (
          <div className="p-12 text-center text-slate-400 bg-[#121622] rounded-2xl border border-white/5">
            <CheckCircle2 className="w-12 h-12 text-slate-600 mx-auto mb-2 opacity-50" />
            <p>Ushbu boʻlimda hozircha takliflar yoʻq.</p>
          </div>
        ) : (
          filteredProposals.map(prop => (
            <div
              key={prop.id}
              className="p-6 rounded-2xl bg-[#121622] border border-amber-500/20 hover:border-amber-500/40 transition-all shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      prop.status === 'approved'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : prop.status === 'rejected'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {prop.status === 'approved' ? '✓ Tasdiqlangan' : prop.status === 'rejected' ? '✕ Rad etilgan' : '⏳ Kutilmoqda'}
                  </span>
                  <span className="text-xs text-slate-400">
                    Maqola: <strong className="text-white">{prop.targetTitle}</strong> ({prop.targetType})
                  </span>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{prop.submittedAt}</span>
                </div>
              </div>

              {/* Author & Summary */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Muallif:</span>
                  <span className="font-semibold text-amber-300">{prop.authorName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300 uppercase">
                    {prop.authorRole}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 bg-black/30 p-3 rounded-xl border border-white/5">
                  <strong className="text-amber-400">Taklif mazmuni: </strong>
                  {prop.summaryOfChange}
                </p>
              </div>

              {/* Diff View Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-black/40 border border-red-500/20">
                  <div className="font-semibold text-red-400 mb-1.5 pb-1 border-b border-red-500/20">
                    Asl Matn (Hozirgi holat):
                  </div>
                  <p className="text-slate-400 line-clamp-4">{prop.originalContent}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/20">
                  <div className="font-semibold text-emerald-400 mb-1.5 pb-1 border-b border-emerald-500/20">
                    Taklif qilingan yangi matn:
                  </div>
                  <p className="text-slate-200 line-clamp-4">{prop.proposedContent}</p>
                </div>
              </div>

              {/* Added Citations */}
              {prop.citationsAdded && prop.citationsAdded.length > 0 && (
                <div className="text-xs text-slate-300 bg-amber-500/5 p-3 rounded-xl border border-amber-500/20">
                  <span className="font-semibold text-amber-300 block mb-1">
                    Ilova qilingan yangi manbalar:
                  </span>
                  {prop.citationsAdded.map((c, idx) => (
                    <div key={idx} className="text-[11px] text-slate-400">
                      • {c.author ? `${c.author}: ` : ''}"{c.sourceTitle}" ({c.year || 'Sanasi koʻrsatilmagan'})
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons for Moderators */}
              {prop.status === 'pending' && (
                <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-white/5">
                  {showRejectBox && selectedProposal?.id === prop.id ? (
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <input
                        type="text"
                        value={rejectReason}
                        onChange={e => setRejectReason(e.target.value)}
                        placeholder="Rad etish sababini yozing..."
                        className="px-3 py-1.5 rounded-lg bg-black/50 border border-red-500/40 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                      />
                      <button
                        onClick={() => handleReject(prop)}
                        className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold"
                      >
                        Tasdiqlash
                      </button>
                      <button
                        onClick={() => setShowRejectBox(false)}
                        className="px-2 py-1.5 text-xs text-slate-400 hover:text-white"
                      >
                        Bekor
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setSelectedProposal(prop);
                          setShowRejectBox(true);
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Rad etish</span>
                      </button>

                      <button
                        onClick={() => handleApprove(prop)}
                        className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Qabul Qilish & Tasdiqlash</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
