import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Users,
  Search,
  Bookmark,
  Edit3,
  MapPin,
  Quote,
  Award,
  BookOpen,
  X,
  Share2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useHistoricalData } from '../context/HistoricalDataContext';
import { useAuth } from '../context/AuthContext';
import { HistoricalPerson } from '../types';
import { CitationList } from '../components/CitationList';
import { EditProposalModal } from '../components/EditProposalModal';

export const PersonsPage: React.FC = () => {
  const { persons } = useHistoricalData();
  const { isBookmarked, toggleBookmark } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPerson, setSelectedPerson] = useState<HistoricalPerson | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Check URL query param ?id=
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const found = persons.find(p => p.id === id);
      if (found) {
        setSelectedPerson(found);
      }
    }
  }, [searchParams, persons]);

  const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: 'ruler', label: 'Hukmdorlar' },
    { id: 'commander', label: 'Sarkardalar' },
    { id: 'scientist', label: 'Olimlar & Astronomlar' },
    { id: 'philosopher', label: 'Mutafakkirlar' }
  ];

  const filteredPersons = persons.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.dynastyOrState.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  const handleOpenDetail = (person: HistoricalPerson) => {
    setSelectedPerson(person);
    setSearchParams({ id: person.id });
  };

  const handleCloseDetail = () => {
    setSelectedPerson(null);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/20 bg-gradient-to-r from-[#0d1017] via-[#151a26] to-[#0d1017] p-8 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>Tarixiy Shaxslar Biosferasi</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-amber-100">
            Hukmdorlar, Sarkardalar va Allomalar
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed font-sans-hist">
            Sharq Uygʻonish davri va qadimgi dunyo sivilizatsiyasida oʻchmas iz qoldirgan buyuk shaxslarning toʻliq biografiyasi, harbiy sanʼati, ilmiy kashfiyotlari va birlamchi manbalari.
          </p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121622] p-4 rounded-2xl border border-amber-500/20">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Shaxs nomi yoki sulolasi..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-slate-700 focus:border-amber-400 text-white placeholder:text-slate-500 text-xs focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-black font-semibold shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Historical Persons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPersons.map(person => (
          <div
            key={person.id}
            id={`person-card-${person.id}`}
            onClick={() => handleOpenDetail(person)}
            className="group relative rounded-2xl overflow-hidden border border-amber-500/20 bg-[#121622] hover:border-amber-400/60 transition-all duration-300 shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Header Hero Image */}
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={person.heroBackgroundUrl || person.avatarUrl}
                  alt={person.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.65]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/40 to-transparent" />

                {/* Bookmark Button */}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleBookmark(person.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                    isBookmarked(person.id)
                      ? 'bg-amber-500 text-black'
                      : 'bg-black/60 text-white hover:bg-amber-500 hover:text-black'
                  }`}
                  title="Saqlab qoʻyish"
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                {/* Dynasty Tag */}
                <div className="absolute bottom-3 left-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                    {person.dynastyOrState}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <h3 className="font-heading text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                  {person.name}
                </h3>
                <p className="text-xs text-amber-400/90 font-medium line-clamp-1">
                  {person.title}
                </p>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {person.shortBio}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3.5 bg-black/20 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-amber-300/90 font-mono font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {person.birthYear}{person.isBCE ? ' m.avv.' : ''} – {person.deathYear}{person.isBCE ? ' m.avv.' : ''}
              </span>
              <span className="text-amber-400 group-hover:underline font-semibold text-xs">
                Toʻliq biografiya →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Full Biography Detail Modal */}
      {selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div
            id="person-detail-modal"
            className="relative w-full max-w-4xl bg-[#121622] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-8"
          >
            {/* Modal Header with Hero Background */}
            <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
              <img
                src={selectedPerson.heroBackgroundUrl}
                alt={selectedPerson.name}
                className="w-full h-full object-cover filter brightness-[0.4]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/60 to-transparent" />

              {/* Close & Action Buttons */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(selectedPerson.id)}
                  className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                    isBookmarked(selectedPerson.id)
                      ? 'bg-amber-500 text-black'
                      : 'bg-black/60 text-white hover:bg-amber-500 hover:text-black'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
                <button
                  id="close-person-modal-btn"
                  onClick={handleCloseDetail}
                  className="p-2 rounded-full bg-black/60 text-slate-300 hover:text-white hover:bg-black/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Hero Title & Badges */}
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-black">
                    {selectedPerson.dynastyOrState}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md">
                    {selectedPerson.birthYear}{selectedPerson.isBCE ? ' m.avv.' : ''} – {selectedPerson.deathYear}{selectedPerson.isBCE ? ' m.avv.' : ''}
                  </span>
                  {selectedPerson.coordinates && (
                    <Link
                      to={`/map?lat=${selectedPerson.coordinates.lat}&lng=${selectedPerson.coordinates.lng}`}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1 hover:bg-blue-500/30"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      {selectedPerson.coordinates.locationName}
                    </Link>
                  )}
                </div>
                <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-amber-100">
                  {selectedPerson.name}
                </h2>
                {selectedPerson.nativeName && (
                  <p className="text-xs text-amber-300/80 font-mono">{selectedPerson.nativeName}</p>
                )}
                <p className="text-sm font-semibold text-amber-300">{selectedPerson.title}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
              {/* Full Biography Narrative */}
              <div>
                <h4 className="font-heading text-lg font-bold text-amber-200 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  Tarixiy Hayoti va Faoliyati
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans-hist">
                  {selectedPerson.fullBio}
                </p>
              </div>

              {/* Key Achievements */}
              {selectedPerson.achievements && selectedPerson.achievements.length > 0 && (
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
                  <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    Asosiy Tarixiy Yutuqlari va Merosi
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                    {selectedPerson.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Famous Quotes */}
              {selectedPerson.famousQuotes && selectedPerson.famousQuotes.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-heading text-base font-bold text-amber-200 flex items-center gap-2">
                    <Quote className="w-4 h-4 text-amber-400" />
                    Mashhur Hikmatlari va Tarixiy Iqtiboslari
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedPerson.famousQuotes.map((q, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
                        <p className="text-xs sm:text-sm italic text-amber-100 font-serif-hist">
                          "{q.quote}"
                        </p>
                        {q.context && (
                          <span className="block text-[11px] text-slate-400">
                            — {q.context}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Major Works / Campaigns */}
              {selectedPerson.majorWorksOrCampaigns && (
                <div>
                  <h4 className="font-heading text-base font-bold text-amber-200 mb-2">
                    Asosiy Ilmiy Asarlari va Harbiy Yurishlari
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPerson.majorWorksOrCampaigns.map((w, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 font-medium"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footnotes & Citations */}
              <CitationList citations={selectedPerson.citations} />

              {/* Action Buttons: Edit Proposal & Share */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-amber-500/20">
                <button
                  id="propose-edit-person-btn"
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 text-amber-400" />
                  <span>Ushbu maqolaga tahrir yoki taklif kiritish</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCloseDetail}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                  >
                    Yopish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Proposal Modal */}
      {selectedPerson && (
        <EditProposalModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          targetId={selectedPerson.id}
          targetType="person"
          targetTitle={selectedPerson.name}
          currentContent={selectedPerson.fullBio}
        />
      )}
    </div>
  );
};
