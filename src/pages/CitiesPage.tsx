import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Compass,
  Search,
  MapPin,
  Calendar,
  Building,
  Edit3,
  Bookmark,
  X,
  BookOpen,
  Milestone,
  ExternalLink
} from 'lucide-react';
import { useHistoricalData } from '../context/HistoricalDataContext';
import { useAuth } from '../context/AuthContext';
import { HistoricalCity } from '../types';
import { CitationList } from '../components/CitationList';
import { EditProposalModal } from '../components/EditProposalModal';

export const CitiesPage: React.FC = () => {
  const { cities } = useHistoricalData();
  const { isBookmarked, toggleBookmark } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<HistoricalCity | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const found = cities.find(c => c.id === id);
      if (found) {
        setSelectedCity(found);
      }
    }
  }, [searchParams, cities]);

  const filteredCities = cities.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.ancientName && c.ancientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    c.countryToday.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDetail = (c: HistoricalCity) => {
    setSelectedCity(c);
    setSearchParams({ id: c.id });
  };

  const handleCloseDetail = () => {
    setSelectedCity(null);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden border border-blue-500/20 bg-gradient-to-r from-[#0a121d] via-[#101b2c] to-[#0a121d] p-8 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>Qadimgi va Tarixiy Shaharlar</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-blue-100">
            Sharq Gavharlari va Karvon Yoʻli Markazlari
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed font-sans-hist">
            Buyuk Ipak Yoʻlining gavharlari — Samarqand, Buxoro, Xiva va boshqa qadimiy madaniy hamda savdo markazlarining 3000 yillik meʼmoriy va iqtisodiy rivojlanish tarixi.
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
            placeholder="Shahar yoki qadimgi nomi (masalan: Marokanda)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-slate-700 focus:border-blue-400 text-white placeholder:text-slate-500 text-xs focus:outline-none"
          />
        </div>
        <span className="text-xs text-slate-400 hidden sm:inline">
          Jami {filteredCities.length} ta tarixiy shahar
        </span>
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCities.map(city => (
          <div
            key={city.id}
            id={`city-card-${city.id}`}
            onClick={() => handleOpenDetail(city)}
            className="group relative rounded-2xl overflow-hidden border border-blue-500/20 bg-[#121622] hover:border-blue-400/60 transition-all duration-300 shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={city.heroBackgroundUrl}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.6]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/40 to-transparent" />
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleBookmark(city.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                    isBookmarked(city.id) ? 'bg-blue-500 text-black' : 'bg-black/60 text-white hover:bg-blue-500'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                {city.ancientName && (
                  <div className="absolute bottom-3 left-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-md">
                      Qadimda: {city.ancientName}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-heading text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                  {city.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-blue-400/90 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{city.countryToday}</span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {city.shortDescription}
                </p>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-black/20 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-blue-300/90 font-mono font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                Asos solingan: {city.establishedYear}{city.isBCE ? ' m.avv.' : ''}
              </span>
              <span className="text-blue-400 group-hover:underline font-semibold text-xs">
                Shaharga sayohat →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* City Detail Modal */}
      {selectedCity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div
            id="city-detail-modal"
            className="relative w-full max-w-4xl bg-[#121622] border border-blue-500/40 rounded-3xl shadow-2xl overflow-hidden my-8"
          >
            {/* Header Hero */}
            <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
              <img
                src={selectedCity.heroBackgroundUrl}
                alt={selectedCity.name}
                className="w-full h-full object-cover filter brightness-[0.4]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/60 to-transparent" />

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(selectedCity.id)}
                  className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                    isBookmarked(selectedCity.id) ? 'bg-blue-500 text-black' : 'bg-black/60 text-white hover:bg-blue-500'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
                <button
                  id="close-city-modal-btn"
                  onClick={handleCloseDetail}
                  className="p-2 rounded-full bg-black/60 text-slate-300 hover:text-white hover:bg-black/80"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedCity.ancientName && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500 text-black">
                      Qadimiy nomi: {selectedCity.ancientName}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md">
                    Asos solingan: {selectedCity.establishedYear}{selectedCity.isBCE ? ' m.avv.' : ''}
                  </span>
                  <Link
                    to={`/map?lat=${selectedCity.coordinates.lat}&lng=${selectedCity.coordinates.lng}`}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 hover:bg-emerald-500/30"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Xaritada joylashuvi
                  </Link>
                </div>
                <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-blue-100">
                  {selectedCity.name}
                </h2>
                <p className="text-sm font-semibold text-blue-300">
                  Zamonaviy joylashuvi: {selectedCity.countryToday} ({selectedCity.coordinates.locationName})
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
              {/* Strategic & Silk Road Role */}
              <div>
                <h4 className="font-heading text-lg font-bold text-blue-200 mb-2 flex items-center gap-2">
                  <Milestone className="w-5 h-5 text-blue-400" />
                  Ipak Yoʻlidagi Strategik va Iqtisodiy Ahamiyati
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed font-sans-hist">
                  {selectedCity.strategicImportance}
                </p>
              </div>

              {/* Key Historical Monuments in City */}
              {selectedCity.keyMonuments && selectedCity.keyMonuments.length > 0 && (
                <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-3">
                  <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-blue-300 flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-400" />
                    Shahardagi Mashhur Meʼmoriy Obidalar
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCity.keyMonuments.map((mon, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-black/40 border border-blue-500/30 text-xs text-blue-200 font-medium"
                      >
                        🏛️ {mon}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Chronological Milestones */}
              {selectedCity.chronology && selectedCity.chronology.length > 0 && (
                <div>
                  <h4 className="font-heading text-base font-bold text-blue-200 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    Shahar Tarixidagi Asosiy Burilish Bosqichlari
                  </h4>
                  <div className="space-y-2">
                    {selectedCity.chronology.map((chr, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-black/30 border border-white/5 text-xs">
                        <span className="font-bold text-amber-400 font-mono flex-shrink-0">
                          {chr.year}:
                        </span>
                        <span className="text-slate-200">{chr.event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Citations */}
              <CitationList citations={selectedCity.citations} />

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-blue-500/20">
                <button
                  id="propose-edit-city-btn"
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 text-blue-400" />
                  <span>Ushbu shahar maʼlumotiga taklif kiritish</span>
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
      {selectedCity && (
        <EditProposalModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          targetId={selectedCity.id}
          targetType="city"
          targetTitle={selectedCity.name}
          currentContent={selectedCity.shortDescription + '\n\n' + selectedCity.strategicImportance}
        />
      )}
    </div>
  );
};
