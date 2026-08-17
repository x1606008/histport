import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Landmark,
  Search,
  MapPin,
  Calendar,
  Crown,
  Edit3,
  Bookmark,
  X,
  Users,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Coins,
  Globe2,
  Scroll,
  Layers
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { useHistoricalData } from '../context/HistoricalDataContext';
import { useAuth } from '../context/AuthContext';
import { HistoricalState } from '../types';
import { CitationList } from '../components/CitationList';
import { EditProposalModal } from '../components/EditProposalModal';
import { StateEconomicDemographicsChart } from '../components/StateEconomicDemographicsChart';
import { STATE_COMPARISON_PROFILES } from '../data/historicalEconomicsData';

export const StatesPage: React.FC = () => {
  const { states } = useHistoricalData();
  const { isBookmarked, toggleBookmark } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<HistoricalState | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEraFilter, setSelectedEraFilter] = useState<string>('all');

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const found = states.find(s => s.id === id);
      if (found) {
        setSelectedState(found);
      }
    }
  }, [searchParams, states]);

  const filteredStates = states.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.dynasty && s.dynasty.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.era && s.era.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesEra =
      selectedEraFilter === 'all' ||
      (s.era && s.era.toLowerCase().includes(selectedEraFilter.toLowerCase()));

    return matchesSearch && matchesEra;
  });

  const handleOpenDetail = (st: HistoricalState) => {
    setSelectedState(st);
    setSearchParams({ id: st.id });
  };

  const handleCloseDetail = () => {
    setSelectedState(null);
    setSearchParams({});
  };

  // Find profile data for selected modal state
  const modalStateProfile = selectedState
    ? STATE_COMPARISON_PROFILES.find(p => p.stateId === selectedState.id)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header - Immersive UI */}
      <div className="relative rounded-3xl overflow-hidden border border-[#5E503F]/60 bg-gradient-to-r from-[#0A0908] via-[#141210] to-[#0A0908] p-8 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6AC8F]/10 border border-[#C6AC8F]/30 text-[#C6AC8F] text-xs font-semibold">
            <Landmark className="w-3.5 h-3.5" />
            <span>Tarixiy Davlatlar va Imperiyalar</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#EAE0D5]">
            Davlatlar, Saltanatlar va Uluslarning Yuksalishi
          </h1>
          <p className="text-sm text-[#EAE0D5]/70 leading-relaxed">
            Turon va Oʻrta Osiyo zaminida gullab-yashnagan qudratli davlatlarning tashkil topishi, poytaxtlari, boshqaruv tizimi, iqtisodiy qudrati, aholi demografiyasi va inqirozi xronologiyasi.
          </p>
        </div>
      </div>

      {/* Dynamic Data Visualization Section using Recharts */}
      <section id="states-dynamic-recharts-section" className="space-y-4">
        <StateEconomicDemographicsChart />
      </section>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0A0908]/90 p-4 sm:p-5 rounded-2xl border border-[#5E503F]/60 shadow-xl backdrop-blur-md">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#EAE0D5]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="states-search-input"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Davlat, imperiya yoki poytaxt nomi..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#141210] border border-[#5E503F]/50 focus:border-[#C6AC8F] text-[#EAE0D5] placeholder:text-[#EAE0D5]/40 text-xs focus:outline-none transition-colors"
          />
        </div>

        {/* Era Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setSelectedEraFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedEraFilter === 'all'
                ? 'bg-[#C6AC8F] text-[#0A0908] font-bold shadow-md'
                : 'bg-[#141210] text-[#EAE0D5]/70 hover:text-[#EAE0D5] border border-[#5E503F]/40'
            }`}
          >
            Barchasi ({states.length})
          </button>
          <button
            onClick={() => setSelectedEraFilter('antik')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedEraFilter === 'antik'
                ? 'bg-[#C6AC8F] text-[#0A0908] font-bold shadow-md'
                : 'bg-[#141210] text-[#EAE0D5]/70 hover:text-[#EAE0D5] border border-[#5E503F]/40'
            }`}
          >
            Antik Davr
          </button>
          <button
            onClick={() => setSelectedEraFilter("o'rta")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedEraFilter === "o'rta"
                ? 'bg-[#C6AC8F] text-[#0A0908] font-bold shadow-md'
                : 'bg-[#141210] text-[#EAE0D5]/70 hover:text-[#EAE0D5] border border-[#5E503F]/40'
            }`}
          >
            Oʻrta Asrlar (Sharq Renessansi)
          </button>
        </div>

        <span className="text-xs text-[#C6AC8F] font-mono hidden lg:inline">
          {filteredStates.length} ta natija
        </span>
      </div>

      {/* States Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStates.map(st => (
          <div
            key={st.id}
            id={`state-card-${st.id}`}
            onClick={() => handleOpenDetail(st)}
            className="group relative rounded-2xl overflow-hidden border border-[#5E503F]/50 bg-[#0A0908] hover:border-[#C6AC8F]/80 transition-all duration-300 shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-[#141210]">
                <img
                  src={st.heroBackgroundUrl}
                  alt={st.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.55]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-[#0A0908]/40 to-transparent" />
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleBookmark(st.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                    isBookmarked(st.id)
                      ? 'bg-[#C6AC8F] text-[#0A0908]'
                      : 'bg-black/60 text-[#EAE0D5] hover:bg-[#C6AC8F] hover:text-[#0A0908]'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C6AC8F]/20 text-[#C6AC8F] border border-[#C6AC8F]/40 backdrop-blur-md">
                    {st.era}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-heading text-xl font-bold text-[#EAE0D5] group-hover:text-[#C6AC8F] transition-colors">
                  {st.name}
                </h3>
                <div className="flex items-center gap-3 text-xs text-[#C6AC8F] font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C6AC8F]" />
                    Poytaxt: {st.capital}
                  </span>
                </div>
                <p className="text-xs text-[#EAE0D5]/70 line-clamp-3 leading-relaxed font-sans-hist">
                  {st.shortDescription}
                </p>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-[#141210] border-t border-[#5E503F]/30 flex items-center justify-between text-xs">
              <span className="text-[#C6AC8F] font-mono font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C6AC8F]" />
                {st.startYear} – {st.endYear}
              </span>
              <span className="text-[#C6AC8F] group-hover:text-[#EAE0D5] font-semibold text-xs transition-colors">
                Toʻliq tahlil & Grafika →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* State Detail Modal with Embedded Timeline Charts */}
      {selectedState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div
            id="state-detail-modal"
            className="relative w-full max-w-4xl bg-[#0A0908] border border-[#5E503F] rounded-3xl shadow-2xl overflow-hidden my-8"
          >
            {/* Header Hero */}
            <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
              <img
                src={selectedState.heroBackgroundUrl}
                alt={selectedState.name}
                className="w-full h-full object-cover filter brightness-[0.4]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-[#0A0908]/60 to-transparent" />

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(selectedState.id)}
                  className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                    isBookmarked(selectedState.id)
                      ? 'bg-[#C6AC8F] text-[#0A0908]'
                      : 'bg-black/60 text-[#EAE0D5] hover:bg-[#C6AC8F] hover:text-[#0A0908]'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
                <button
                  id="close-state-modal-btn"
                  onClick={handleCloseDetail}
                  className="p-2 rounded-full bg-black/60 text-[#EAE0D5]/70 hover:text-[#EAE0D5] hover:bg-black/80 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C6AC8F] text-[#0A0908]">
                    {selectedState.era}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md">
                    {selectedState.startYear} – {selectedState.endYear}
                  </span>
                  {selectedState.coordinates && (
                    <Link
                      to={`/map?lat=${selectedState.coordinates.lat}&lng=${selectedState.coordinates.lng}`}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-[#C6AC8F]/20 text-[#C6AC8F] border border-[#C6AC8F]/40 flex items-center gap-1 hover:bg-[#C6AC8F]/30"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      Xaritada koʻrish
                    </Link>
                  )}
                </div>
                <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-[#EAE0D5]">
                  {selectedState.name}
                </h2>
                <p className="text-sm font-semibold text-[#C6AC8F]">
                  Poytaxti: {selectedState.capital}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
              {/* State Specific Demographic & Economic Recharts Timeline */}
              {modalStateProfile && modalStateProfile.timelineMetrics && (
                <div className="p-5 rounded-2xl bg-[#141210] border border-[#5E503F]/60 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#5E503F]/40 pb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#C6AC8F]" />
                      <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#EAE0D5]">
                        {selectedState.name} Xronologik Iqtisodiy & Aholi Dinamikasi
                      </h4>
                    </div>
                    <span className="text-[11px] text-[#C6AC8F] font-mono">
                      Yillar boʻyicha oʻsish
                    </span>
                  </div>

                  {/* Modal Recharts Chart */}
                  <div className="h-[220px] w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={modalStateProfile.timelineMetrics}
                        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient id="modalPopGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C6AC8F" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#C6AC8F" stopOpacity={0.05} />
                          </linearGradient>
                          <linearGradient id="modalTaxGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#5E503F" opacity={0.25} />
                        <XAxis
                          dataKey="yearLabel"
                          stroke="#EAE0D5"
                          tick={{ fill: '#EAE0D5', fontSize: 10 }}
                        />
                        <YAxis stroke="#EAE0D5" tick={{ fill: '#EAE0D5', fontSize: 10 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0A0908',
                            borderColor: '#5E503F',
                            borderRadius: '12px',
                            color: '#EAE0D5',
                            fontSize: '11px'
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: '11px', color: '#EAE0D5' }} />
                        <Area
                          type="monotone"
                          dataKey="populationMillions"
                          name="Aholi (Mln)"
                          stroke="#C6AC8F"
                          fill="url(#modalPopGradient)"
                        />
                        <Area
                          type="monotone"
                          dataKey="annualTaxRevenueMillion"
                          name="Xazina (Mln tilla)"
                          stroke="#10B981"
                          fill="url(#modalTaxGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Foundation & Rise */}
              <div>
                <h4 className="font-heading text-lg font-bold text-[#EAE0D5] mb-2 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-[#C6AC8F]" />
                  Tashkil Topishi va Siyosiy Yuksalishi
                </h4>
                <p className="text-sm text-[#EAE0D5]/80 leading-relaxed font-sans-hist">
                  {selectedState.riseAndGrowth || selectedState.foundationStory}
                </p>
              </div>

              {/* Golden Age / Zenith */}
              <div className="p-5 rounded-2xl bg-[#141210] border border-[#C6AC8F]/30 space-y-2">
                <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#C6AC8F] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C6AC8F]" />
                  Eng Yuksak Rivojlangan Davri (Oltin Asri)
                </h4>
                <p className="text-xs sm:text-sm text-[#EAE0D5]/90 leading-relaxed">
                  {selectedState.goldenAge || selectedState.zenithPeriod}
                </p>
              </div>

              {/* Decline & Fall */}
              <div>
                <h4 className="font-heading text-lg font-bold text-rose-300 mb-2 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                  Inqirozi va Tugatilish Sabablari
                </h4>
                <p className="text-sm text-[#EAE0D5]/80 leading-relaxed font-sans-hist">
                  {selectedState.declineAndFall}
                </p>
              </div>

              {/* Territory & Dynasty Lineage */}
              {selectedState.dynastyLineage && selectedState.dynastyLineage.length > 0 && (
                <div>
                  <h4 className="font-heading text-base font-bold text-[#EAE0D5] mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C6AC8F]" />
                    Sulola Hukmdorlari va Hukmronlik Yillari
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedState.dynastyLineage.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#141210] border border-[#5E503F]/40 flex items-center justify-between text-xs"
                      >
                        <span className="font-bold text-[#EAE0D5]">👑 {item.ruler}</span>
                        <span className="font-mono text-[#C6AC8F]">{item.reign}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Citations */}
              <CitationList citations={selectedState.citations} />

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#5E503F]/40">
                <button
                  id="propose-edit-state-btn"
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C6AC8F]/20 hover:bg-[#C6AC8F]/30 border border-[#C6AC8F]/40 text-[#C6AC8F] text-xs font-semibold transition-all cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 text-[#C6AC8F]" />
                  <span>Ushbu davlat maʼlumotiga tahrir taklif qilish</span>
                </button>

                <button
                  onClick={handleCloseDetail}
                  className="px-5 py-2.5 rounded-xl bg-[#141210] hover:bg-[#5E503F]/30 text-[#EAE0D5] border border-[#5E503F]/50 text-xs font-semibold cursor-pointer"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Proposal Modal */}
      {selectedState && (
        <EditProposalModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          targetId={selectedState.id}
          targetType="state"
          targetTitle={selectedState.name}
          currentContent={
            (selectedState.riseAndGrowth || '') +
            '\n\n' +
            (selectedState.goldenAge || '') +
            '\n\n' +
            (selectedState.declineAndFall || '')
          }
        />
      )}
    </div>
  );
};
