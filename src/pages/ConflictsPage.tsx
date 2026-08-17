import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Shield,
  Search,
  MapPin,
  Calendar,
  Swords,
  Edit3,
  Bookmark,
  X,
  BookOpen,
  Users,
  Flag,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { useHistoricalData } from '../context/HistoricalDataContext';
import { useAuth } from '../context/AuthContext';
import { HistoricalConflict } from '../types';
import { CitationList } from '../components/CitationList';
import { EditProposalModal } from '../components/EditProposalModal';

export const ConflictsPage: React.FC = () => {
  const { conflicts } = useHistoricalData();
  const { isBookmarked, toggleBookmark } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedConflict, setSelectedConflict] = useState<HistoricalConflict | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const found = conflicts.find(cf => cf.id === id);
      if (found) {
        setSelectedConflict(found);
      }
    }
  }, [searchParams, conflicts]);

  const filteredConflicts = conflicts.filter(cf => {
    const matchesSearch =
      cf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cf.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cf.commanders.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCat = selectedCategory === 'all' || cf.type === selectedCategory;

    return matchesSearch && matchesCat;
  });

  const handleOpenDetail = (cf: HistoricalConflict) => {
    setSelectedConflict(cf);
    setSearchParams({ id: cf.id });
  };

  const handleCloseDetail = () => {
    setSelectedConflict(null);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden border border-red-500/20 bg-gradient-to-r from-[#180d0d] via-[#241212] to-[#180d0d] p-8 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>Qoʻzgʻolonlar, Urushlar va Janglar</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-red-100">
            Tarixiy Janglar va Xalq Ozodlik Harakatlari
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed font-sans-hist">
            Taktik harbiy sanʼat, qoʻshinlar safarbarligi, jang maydonidagi burilishlar, sarkardalar qarorlari va ularning geopolitik natijalari.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121622] p-4 rounded-2xl border border-amber-500/20">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Jang nomi, hududi yoki sarkarda..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-slate-700 focus:border-red-400 text-white placeholder:text-slate-500 text-xs focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'battle', label: 'Janglar (Battles)' },
            { id: 'uprising', label: 'Xalq Qoʻzgʻolonlari' },
            { id: 'campaign', label: 'Harbiy Yurishlar' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-red-500 text-black font-semibold shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conflicts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConflicts.map(cf => (
          <div
            key={cf.id}
            id={`conflict-card-${cf.id}`}
            onClick={() => handleOpenDetail(cf)}
            className="group relative rounded-2xl overflow-hidden border border-red-500/20 bg-[#121622] hover:border-red-400/60 transition-all duration-300 shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={cf.heroBackgroundUrl}
                  alt={cf.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.6]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/40 to-transparent" />
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleBookmark(cf.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                    isBookmarked(cf.id) ? 'bg-red-500 text-black' : 'bg-black/60 text-white hover:bg-red-500'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/30 backdrop-blur-md">
                    {cf.type === 'battle' ? 'Tarixiy Jang' : cf.type === 'uprising' ? 'Ozodlik Qoʻzgʻoloni' : 'Harbiy Yurish'}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-heading text-xl font-bold text-white group-hover:text-red-200 transition-colors">
                  {cf.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-red-400/90 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Hudud: {cf.location}</span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {cf.outcome}
                </p>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-black/20 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-red-300/90 font-mono font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-red-400" />
                {cf.startYear}{cf.isBCE ? ' m.avv.' : ''}
              </span>
              <span className="text-red-400 group-hover:underline font-semibold text-xs">
                Jang tahlili →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Conflict Detail Modal */}
      {selectedConflict && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div
            id="conflict-detail-modal"
            className="relative w-full max-w-4xl bg-[#121622] border border-red-500/40 rounded-3xl shadow-2xl overflow-hidden my-8"
          >
            {/* Header */}
            <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
              <img
                src={selectedConflict.heroBackgroundUrl}
                alt={selectedConflict.title}
                className="w-full h-full object-cover filter brightness-[0.4]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/60 to-transparent" />

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(selectedConflict.id)}
                  className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                    isBookmarked(selectedConflict.id) ? 'bg-red-500 text-black' : 'bg-black/60 text-white hover:bg-red-500'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
                <button
                  id="close-conflict-modal-btn"
                  onClick={handleCloseDetail}
                  className="p-2 rounded-full bg-black/60 text-slate-300 hover:text-white hover:bg-black/80"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500 text-black">
                    {selectedConflict.type}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md">
                    {selectedConflict.startYear}{selectedConflict.isBCE ? ' m.avv.' : ''}
                  </span>
                  {selectedConflict.coordinates && (
                    <Link
                      to={`/map?lat=${selectedConflict.coordinates.lat}&lng=${selectedConflict.coordinates.lng}`}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1 hover:bg-red-500/30"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      Jang maydoni (Xarita)
                    </Link>
                  )}
                </div>
                <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-red-100">
                  {selectedConflict.title}
                </h2>
                <p className="text-sm font-semibold text-red-300">
                  Maydon: {selectedConflict.location}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
              {/* Causes & Background */}
              <div>
                <h4 className="font-heading text-lg font-bold text-red-200 mb-2 flex items-center gap-2">
                  <Flag className="w-5 h-5 text-red-400" />
                  Urushning Kelib Chiqish Sabablari va Sharoiti
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed font-sans-hist">
                  {selectedConflict.causes}
                </p>
              </div>

              {/* Combatants & Commanders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-black/40 border border-red-500/20">
                <div>
                  <h5 className="font-heading text-xs font-bold uppercase tracking-wider text-red-300 mb-2 flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    Tomonlar va Ishtirokchilar
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedConflict.partiesInvolved.map((p, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-red-500/10 text-xs text-red-200 border border-red-500/20">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-heading text-xs font-bold uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-1.5">
                    <Swords className="w-4 h-4" />
                    Bosh Sarkardalar
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedConflict.commanders.map((c, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-xs text-amber-200 border border-amber-500/20">
                        ⚔️ {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tactical Sequences */}
              {selectedConflict.tacticalSequences && (
                <div>
                  <h4 className="font-heading text-base font-bold text-red-200 mb-3 flex items-center gap-2">
                    <Swords className="w-4 h-4 text-red-400" />
                    Jangning Taktik Bosqichlari va Harakatlar
                  </h4>
                  <div className="space-y-2">
                    {selectedConflict.tacticalSequences.map((seq, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-black/30 border border-white/5 text-xs">
                        <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-300 flex items-center justify-center font-bold flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-slate-200">{seq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Outcome & Geopolitical Aftermath */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  Natijasi va Tarixiy Ahamiyati
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedConflict.outcome}
                </p>
              </div>

              {/* Citations */}
              <CitationList citations={selectedConflict.citations} />

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-red-500/20">
                <button
                  id="propose-edit-conflict-btn"
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 text-red-400" />
                  <span>Ushbu jang maʼlumotiga taklif kiritish</span>
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
      {selectedConflict && (
        <EditProposalModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          targetId={selectedConflict.id}
          targetType="conflict"
          targetTitle={selectedConflict.title}
          currentContent={selectedConflict.causes + '\n\n' + selectedConflict.outcome}
        />
      )}
    </div>
  );
};
