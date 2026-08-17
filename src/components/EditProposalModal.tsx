import React, { useState } from 'react';
import { X, Send, BookPlus, AlertCircle, FileText, CheckCircle2, History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useHistoricalData } from '../context/HistoricalDataContext';
import { Citation } from '../types';

interface EditProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetType: 'person' | 'state' | 'city' | 'conflict' | 'treaty' | 'monument';
  targetTitle: string;
  currentContent: string;
}

export const EditProposalModal: React.FC<EditProposalModalProps> = ({
  isOpen,
  onClose,
  targetId,
  targetType,
  targetTitle,
  currentContent
}) => {
  const { user, setIsAuthModalOpen } = useAuth();
  const { submitProposal } = useHistoricalData();

  const [proposedContent, setProposedContent] = useState(currentContent);
  const [summaryOfChange, setSummaryOfChange] = useState('');
  const [newCitationTitle, setNewCitationTitle] = useState('');
  const [newCitationAuthor, setNewCitationAuthor] = useState('');
  const [newCitationYear, setNewCitationYear] = useState('');
  const [citationsList, setCitationsList] = useState<Citation[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showDiff, setShowDiff] = useState(false);

  if (!isOpen) return null;

  const handleAddCitation = () => {
    if (!newCitationTitle.trim()) return;
    const newCit: Citation = {
      id: `prop-cit-${Date.now()}`,
      sourceTitle: newCitationTitle,
      author: newCitationAuthor || undefined,
      year: newCitationYear || undefined,
      type: 'book'
    };
    setCitationsList([...citationsList, newCit]);
    setNewCitationTitle('');
    setNewCitationAuthor('');
    setNewCitationYear('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!summaryOfChange.trim() || !proposedContent.trim()) {
      return;
    }

    submitProposal({
      targetId,
      targetType,
      targetTitle,
      authorName: user.name,
      authorRole: user.role,
      authorEmail: user.email,
      summaryOfChange,
      proposedContent,
      originalContent: currentContent,
      citationsAdded: citationsList.length > 0 ? citationsList : undefined
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        id="edit-proposal-modal-card"
        className="relative w-full max-w-3xl bg-[#121622] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-amber-950/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-amber-100">
                Tahrirlash va Taklif Kiritish
              </h3>
              <p className="text-xs text-amber-300/70">
                Maqola: <span className="font-semibold text-amber-200">{targetTitle}</span>
              </p>
            </div>
          </div>
          <button
            id="close-proposal-modal-btn"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-bounce" />
            <h4 className="font-heading text-2xl font-bold text-emerald-200 mb-2">
              Taklif Muvaffaqiyatli Yuborildi!
            </h4>
            <p className="text-slate-300 max-w-md mx-auto text-sm">
              Siz kiritgan ilmiy tuzatish va yangi maʼlumotlar moderatorlar kengashi tomonidan koʻrib chiqiladi va tasdiqlangach maqolada aks etadi.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* User Role Notice */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300">Tahrirlash tartibi: </span>
                {user ? (
                  <span>
                    Siz hozirda <strong className="text-white capitalize">{user.role === 'moderator' ? 'Bosh Moderator' : user.role === 'researcher' ? 'Tadqiqotchi / Mutaxassis' : 'Oʻquvchi'}</strong> huquqidasiz. Kiritilgan oʻzgartirishlar ilmiy kengash tomonidan fakt-cheking qilinadi.
                  </span>
                ) : (
                  <span>Taklif kiritish uchun tizimga kirishingiz lozim.</span>
                )}
              </div>
            </div>

            {/* Summary of Changes */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Kiritilgan oʻzgartirishning qisqacha mazmuni (Changelog summary) *
              </label>
              <input
                id="proposal-summary-input"
                type="text"
                required
                value={summaryOfChange}
                onChange={e => setSummaryOfChange(e.target.value)}
                placeholder="Masalan: 1402-yilgi Anqara jangi boʻyicha yangi arxiv hujjati va sanalarga aniqlik kiritildi"
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-amber-500/30 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                Maqola matni (Rich Text / Markdown) *
              </label>
              <button
                type="button"
                onClick={() => setShowDiff(!showDiff)}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
              >
                <History className="w-3.5 h-3.5" />
                {showDiff ? 'Tahrirlash rejimiga qaytish' : 'Taqqoslash (Diff) rejimini koʻrish'}
              </button>
            </div>

            {showDiff ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg bg-black/30 border border-white/10 text-xs">
                <div>
                  <div className="font-semibold text-red-400 mb-1 pb-1 border-b border-red-500/20">Asl matn (Original):</div>
                  <p className="text-slate-400 whitespace-pre-wrap">{currentContent}</p>
                </div>
                <div>
                  <div className="font-semibold text-emerald-400 mb-1 pb-1 border-b border-emerald-500/20">Taklif etilayotgan matn:</div>
                  <p className="text-slate-200 whitespace-pre-wrap">{proposedContent}</p>
                </div>
              </div>
            ) : (
              <textarea
                id="proposal-content-textarea"
                required
                rows={7}
                value={proposedContent}
                onChange={e => setProposedContent(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-amber-500/30 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-amber-400 font-sans"
              />
            )}

            {/* Add New Citation */}
            <div className="p-4 rounded-xl bg-black/30 border border-amber-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                  <BookPlus className="w-4 h-4" />
                  Yangi Birlamchi Manba / Bibliografiya Qoʻshish (Citations)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Asar / Manba nomi"
                  value={newCitationTitle}
                  onChange={e => setNewCitationTitle(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                />
                <input
                  type="text"
                  placeholder="Muallif (ixtiyoriy)"
                  value={newCitationAuthor}
                  onChange={e => setNewCitationAuthor(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Yili (1425)"
                    value={newCitationYear}
                    onChange={e => setNewCitationYear(e.target.value)}
                    className="w-24 px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddCitation}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-amber-500 text-black font-semibold text-xs hover:bg-amber-400 transition-colors"
                  >
                    Qoʻshish
                  </button>
                </div>
              </div>

              {citationsList.length > 0 && (
                <div className="pt-2 space-y-1.5">
                  <span className="text-[11px] text-slate-400">Qoʻshilgan manbalar:</span>
                  {citationsList.map((c, idx) => (
                    <div key={idx} className="text-xs text-amber-200 bg-amber-500/10 px-2.5 py-1 rounded flex items-center justify-between">
                      <span>• {c.author ? `${c.author}: ` : ''}"{c.sourceTitle}" ({c.year || 'Sanasi koʻrsatilmagan'})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                Bekor qilish
              </button>
              <button
                id="submit-proposal-btn"
                type="submit"
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Taklifni Yuborish
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
