import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Scroll,
  Search,
  MapPin,
  Calendar,
  FileCheck,
  Edit3,
  Bookmark,
  X,
  BookOpen,
  Users,
  Quote,
  CheckCircle2
} from 'lucide-react';
import { useHistoricalData } from '../context/HistoricalDataContext';
import { useAuth } from '../context/AuthContext';
import { HistoricalTreaty } from '../types';
import { CitationList } from '../components/CitationList';
import { EditProposalModal } from '../components/EditProposalModal';

export const TreatiesPage: React.FC = () => {
  const { treaties } = useHistoricalData();
  const { isBookmarked, toggleBookmark } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTreaty, setSelectedTreaty] = useState<HistoricalTreaty | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const found = treaties.find(t => t.id === id);
      if (found) {
        setSelectedTreaty(found);
      }
    }
  }, [searchParams, treaties]);

  const filteredTreaties = treaties.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.signatories.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
    t.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDetail = (tr: HistoricalTreaty) => {
    setSelectedTreaty(tr);
    setSearchParams({ id: tr.id });
  };

  const handleCloseDetail = () => {
    setSelectedTreaty(null);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden border border-purple-500/20 bg-gradient-to-r from-[#140b1e] via-[#201030] to-[#140b1e] p-8 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Scroll className="w-3.5 h-3.5" />
            <span>Tinchlik Shartnomalari va Sulhlar</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-purple-100">
            Diplomatiya Tarixi va Geopolitik Ahdnomalar
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed font-sans-hist">
            Dunyoda va Sharqda urushlarga nuqta qoʻygan, chegaralarni belgilab bergan xalqaro tinchlik shartnomalari, asl hujjat matnlari va ularning huquqiy oqibatlari.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between bg-[#121622] p-4 rounded-2xl border border-amber-500/20">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Shartnoma nomi, imzolangan joy yoki tomonlar..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-slate-700 focus:border-purple-400 text-white placeholder:text-slate-500 text-xs focus:outline-none"
          />
        </div>
        <span className="text-xs text-slate-400 hidden sm:inline">
          Jami {filteredTreaties.length} ta sulh hujjati
        </span>
      </div>

      {/* Treaties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTreaties.map(tr => (
          <div
            key={tr.id}
            id={`treaty-card-${tr.id}`}
            onClick={() => handleOpenDetail(tr)}
            className="group relative rounded-2xl overflow-hidden border border-purple-500/20 bg-[#121622] hover:border-purple-400/60 transition-all duration-300 shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={tr.heroBackgroundUrl}
                  alt={tr.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.6]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/40 to-transparent" />
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleBookmark(tr.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                    isBookmarked(tr.id) ? 'bg-purple-500 text-black' : 'bg-black/60 text-white hover:bg-purple-500'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                    {tr.location}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-heading text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                  {tr.title}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {tr.signatories.map((sig, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 font-medium">
                      📜 {sig}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {tr.context}
                </p>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-black/20 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-purple-300/90 font-mono font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                {tr.signYear}{tr.isBCE ? ' m.avv.' : ''}
              </span>
              <span className="text-purple-400 group-hover:underline font-semibold text-xs">
                Shartnoma matni →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Treaty Detail Modal */}
      {selectedTreaty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div
            id="treaty-detail-modal"
            className="relative w-full max-w-4xl bg-[#121622] border border-purple-500/40 rounded-3xl shadow-2xl overflow-hidden my-8"
          >
            {/* Header */}
            <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
              <img
                src={selectedTreaty.heroBackgroundUrl}
                alt={selectedTreaty.title}
                className="w-full h-full object-cover filter brightness-[0.4]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/60 to-transparent" />

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(selectedTreaty.id)}
                  className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                    isBookmarked(selectedTreaty.id) ? 'bg-purple-500 text-black' : 'bg-black/60 text-white hover:bg-purple-500'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
                <button
                  id="close-treaty-modal-btn"
                  onClick={handleCloseDetail}
                  className="p-2 rounded-full bg-black/60 text-slate-300 hover:text-white hover:bg-black/80"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500 text-black">
                    Xalqaro Sulh
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md">
                    {selectedTreaty.signYear}{selectedTreaty.isBCE ? ' m.avv.' : ''}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedTreaty.location}
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-purple-100">
                  {selectedTreaty.title}
                </h2>
                <p className="text-sm font-semibold text-purple-300">
                  Imzolagan tomonlar: {selectedTreaty.signatories.join(' va ')}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
              {/* Context */}
              <div>
                <h4 className="font-heading text-lg font-bold text-purple-200 mb-2 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-purple-400" />
                  Sulh Tarixiy Sabablari va Sharoiti
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed font-sans-hist">
                  {selectedTreaty.context}
                </p>
              </div>

              {/* Main Terms */}
              <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-3">
                <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  Shartnomaning Asosiy Bandlari va Shartlari
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                  {selectedTreaty.terms.map((term, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-purple-400 font-bold">✓</span>
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Original Extract */}
              {selectedTreaty.originalTextExtract && (
                <div className="p-5 rounded-2xl bg-black/40 border border-amber-500/30 space-y-2">
                  <h4 className="font-heading text-sm font-bold text-amber-300 flex items-center gap-2">
                    <Quote className="w-4 h-4 text-amber-400" />
                    Asl Hujjat Bitigidan Iqtibos (Fragment)
                  </h4>
                  <p className="text-xs sm:text-sm italic text-amber-100 font-serif-hist leading-relaxed">
                    "{selectedTreaty.originalTextExtract}"
                  </p>
                </div>
              )}

              {/* Citations */}
              <CitationList citations={selectedTreaty.citations} />

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-purple-500/20">
                <button
                  id="propose-edit-treaty-btn"
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 text-purple-400" />
                  <span>Ushbu shartnoma maʼlumotiga taklif kiritish</span>
                </button>

                <button
                  onClick={handleCloseDetail}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Proposal Modal */}
      {selectedTreaty && (
        <EditProposalModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          targetId={selectedTreaty.id}
          targetType="treaty"
          targetTitle={selectedTreaty.title}
          currentContent={selectedTreaty.context + '\n\n' + selectedTreaty.terms.join('\n')}
        />
      )}
    </div>
  );
};
