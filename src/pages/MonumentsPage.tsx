import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  MapPin,
  Calendar,
  Building2,
  Edit3,
  Bookmark,
  X,
  Layers,
  Image as ImageIcon,
  Hammer
} from 'lucide-react';
import { useHistoricalData } from '../context/HistoricalDataContext';
import { useAuth } from '../context/AuthContext';
import { HistoricalMonument } from '../types';
import { CitationList } from '../components/CitationList';
import { EditProposalModal } from '../components/EditProposalModal';

export const MonumentsPage: React.FC = () => {
  const { monuments } = useHistoricalData();
  const { isBookmarked, toggleBookmark } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('all');
  const [selectedMonument, setSelectedMonument] = useState<HistoricalMonument | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const found = monuments.find(m => m.id === id);
      if (found) {
        setSelectedMonument(found);
      }
    }
  }, [searchParams, monuments]);

  const uniqueCities = Array.from(new Set(monuments.map(m => m.locationCity)));

  const filteredMonuments = monuments.filter(m => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.architecturalStyle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.commissionedBy.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = selectedCityFilter === 'all' || m.locationCity === selectedCityFilter;

    return matchesSearch && matchesCity;
  });

  const handleOpenDetail = (m: HistoricalMonument) => {
    setSelectedMonument(m);
    setActiveGalleryImage(null);
    setSearchParams({ id: m.id });
  };

  const handleCloseDetail = () => {
    setSelectedMonument(null);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden border border-orange-500/20 bg-gradient-to-r from-[#180e0a] via-[#24170d] to-[#180e0a] p-8 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Tarixiy Meʼmoriy Obidalar</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-orange-100">
            Sharq Uygʻonish Davri Meʼmorligi va Moddiy Meros
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed font-sans-hist">
            Movaraunnahr va jahon sivilizatsiyasining bebaho arxitektura durdonalari — Registon, Shohi Zinda, Minora-i Kalon, Oqsaroy va Ichan Qalʼaning qurilish tarixi hamda muhandislik sirlari.
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
            placeholder="Obida nomi, meʼmoriy uslubi yoki asoschisi..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-slate-700 focus:border-orange-400 text-white placeholder:text-slate-500 text-xs focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setSelectedCityFilter('all')}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap font-medium transition-all ${
              selectedCityFilter === 'all'
                ? 'bg-orange-500 text-black font-semibold shadow-md'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            Barcha Shaharlar
          </button>
          {uniqueCities.map(city => (
            <button
              key={city}
              onClick={() => setSelectedCityFilter(city)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCityFilter === city
                  ? 'bg-orange-500 text-black font-semibold shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Monuments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMonuments.map(monument => (
          <div
            key={monument.id}
            id={`monument-card-${monument.id}`}
            onClick={() => handleOpenDetail(monument)}
            className="group relative rounded-2xl overflow-hidden border border-orange-500/20 bg-[#121622] hover:border-orange-400/60 transition-all duration-300 shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={monument.heroBackgroundUrl}
                  alt={monument.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.65]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/40 to-transparent" />
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleBookmark(monument.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                    isBookmarked(monument.id) ? 'bg-orange-500 text-black' : 'bg-black/60 text-white hover:bg-orange-500'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-500/30 backdrop-blur-md">
                    {monument.locationCity}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-heading text-xl font-bold text-white group-hover:text-orange-200 transition-colors">
                  {monument.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-orange-400/90 font-medium">
                  <Hammer className="w-3.5 h-3.5" />
                  <span>Qurdirgan: {monument.commissionedBy}</span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {monument.shortDescription}
                </p>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-black/20 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-orange-300/90 font-mono font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-orange-400" />
                {monument.buildCentury}
              </span>
              <span className="text-orange-400 group-hover:underline font-semibold text-xs">
                Meʼmoriy tahlil →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Monument Detail Modal */}
      {selectedMonument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div
            id="monument-detail-modal"
            className="relative w-full max-w-4xl bg-[#121622] border border-orange-500/40 rounded-3xl shadow-2xl overflow-hidden my-8"
          >
            {/* Header Hero */}
            <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
              <img
                src={activeGalleryImage || selectedMonument.heroBackgroundUrl}
                alt={selectedMonument.name}
                className="w-full h-full object-cover filter brightness-[0.45] transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/60 to-transparent" />

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(selectedMonument.id)}
                  className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                    isBookmarked(selectedMonument.id) ? 'bg-orange-500 text-black' : 'bg-black/60 text-white hover:bg-orange-500'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
                <button
                  id="close-monument-modal-btn"
                  onClick={handleCloseDetail}
                  className="p-2 rounded-full bg-black/60 text-slate-300 hover:text-white hover:bg-black/80"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500 text-black">
                    {selectedMonument.locationCity}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md">
                    {selectedMonument.buildCentury}
                  </span>
                  <Link
                    to={`/map?lat=${selectedMonument.coordinates.lat}&lng=${selectedMonument.coordinates.lng}`}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1 hover:bg-blue-500/30"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Xaritada ochish
                  </Link>
                </div>
                <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-orange-100">
                  {selectedMonument.name}
                </h2>
                <p className="text-sm font-semibold text-orange-300">
                  Meʼmoriy uslubi: {selectedMonument.architecturalStyle} (Asoschisi: {selectedMonument.commissionedBy})
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
              {/* Architecture & Engineering Details */}
              <div>
                <h4 className="font-heading text-lg font-bold text-orange-200 mb-2 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-orange-400" />
                  Qurilish Tarixi va Meʼmoriy Muhandislik
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans-hist">
                  {selectedMonument.historyAndArchitecture}
                </p>
              </div>

              {/* Photo Gallery */}
              {selectedMonument.galleryUrls && selectedMonument.galleryUrls.length > 0 && (
                <div>
                  <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-orange-300 mb-3 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-orange-400" />
                    Fotogalereya va Meʼmoriy Detallar
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {selectedMonument.galleryUrls.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveGalleryImage(imgUrl)}
                        className={`h-24 rounded-xl overflow-hidden cursor-pointer border transition-all ${
                          activeGalleryImage === imgUrl ? 'border-orange-400 ring-2 ring-orange-500/50 scale-105' : 'border-white/10 hover:border-orange-400/50'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt="Meʼmoriy detal"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Citations */}
              <CitationList citations={selectedMonument.citations} />

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-orange-500/20">
                <button
                  id="propose-edit-monument-btn"
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 text-orange-400" />
                  <span>Ushbu obida maʼlumotiga taklif kiritish</span>
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
      {selectedMonument && (
        <EditProposalModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          targetId={selectedMonument.id}
          targetType="monument"
          targetTitle={selectedMonument.name}
          currentContent={selectedMonument.shortDescription + '\n\n' + selectedMonument.historyAndArchitecture}
        />
      )}
    </div>
  );
};
