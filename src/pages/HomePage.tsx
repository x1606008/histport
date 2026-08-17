import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Landmark,
  Compass,
  Shield,
  Scroll,
  BookOpen,
  Clock,
  Map,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle,
  Search,
  Globe2,
  Cpu
} from 'lucide-react';
import { useHistoricalData } from '../context/HistoricalDataContext';
import { useAuth } from '../context/AuthContext';

interface HomePageProps {
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenSearch }) => {
  const { persons, states, cities, conflicts, treaties, monuments, timelineEvents, proposals } = useHistoricalData();
  const { user, isBookmarked, toggleBookmark } = useAuth();

  const mainModules = [
    {
      title: 'Tarixiy Shaxslar',
      desc: 'Hukmdorlar, sarkardalar, allomalar va mutafakkirlar biosferasi.',
      count: persons.length,
      path: '/persons',
      icon: Users,
      color: 'from-amber-600 to-amber-800',
      bgImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Davlatlar & Imperiyalar',
      desc: 'Tashkil topishi, yuksalish bosqichlari, poytaxtlari va inqirozi.',
      count: states.length,
      path: '/states',
      icon: Landmark,
      color: 'from-emerald-600 to-emerald-800',
      bgImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Qadimgi Shaharlar',
      desc: 'Iqtisodiy, madaniy va strategik markazlar xronologiyasi.',
      count: cities.length,
      path: '/cities',
      icon: Compass,
      color: 'from-blue-600 to-blue-800',
      bgImage: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Urushlar & Janglar',
      desc: 'Sabablari, janglar ketma-ketligi va geopolitik natijalari.',
      count: conflicts.length,
      path: '/conflicts',
      icon: Shield,
      color: 'from-red-600 to-red-800',
      bgImage: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Sulhlar & Shartnomalar',
      desc: 'Hujjat matnlari, geopolitik shartlar va tomonlar ahdnomalari.',
      count: treaties.length,
      path: '/treaties',
      icon: Scroll,
      color: 'from-purple-600 to-purple-800',
      bgImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Meʼmoriy Obidalar',
      desc: 'Arxitektura uslubi, qurilgan asri va obʼyektlar galereyasi.',
      count: monuments.length,
      path: '/monuments',
      icon: BookOpen,
      color: 'from-orange-600 to-orange-800',
      bgImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section with HD Historical Background */}
      <section className="relative min-h-[580px] flex items-center justify-center overflow-hidden rounded-3xl border border-[#5E503F]/50 mx-4 sm:mx-6 lg:mx-8 mt-6 shadow-2xl bg-[#0A0908]">
        {/* Background Image & Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1920&q=80"
            alt="Samarqand Registon Tarixi"
            className="w-full h-full object-cover filter brightness-[0.25] scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-[#0A0908]/70 to-[#0A0908]/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0908_80%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141210]/90 border border-[#5E503F] text-[#C6AC8F] text-[11px] font-mono uppercase tracking-widest backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#C6AC8F]" />
            <span>Sharq va Jahon Tarixi Ilmiy Portali</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-[#EAE0D5] tracking-wide leading-tight drop-shadow-2xl">
            Buyuk Oʻtmish va Sivilizatsiyalar Qomusi
          </h1>

          <p className="text-sm sm:text-base text-[#A89F91] max-w-2xl mx-auto leading-relaxed font-sans-hist">
            Oʻquvchilar, izlanuvchilar va tarixchi-mutaxassislar uchun interaktiv GIS xaritasi, dinamik vaqt shkalasi, verifikatsiyalangan manbalar va akademik tadqiqotlar platformasi.
          </p>

          {/* Quick Action Search & Explore Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              id="hero-search-trigger-btn"
              onClick={onOpenSearch}
              className="flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#C6AC8F] hover:bg-[#EAE0D5] text-[#0A0908] font-sans font-bold text-xs uppercase tracking-wider shadow-xl shadow-black/60 transition-all hover:scale-105 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Ensiklopediya boʻyicha Qidiruv</span>
            </button>

            <Link
              to="/timeline"
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#141210]/90 hover:bg-[#1C1916] border border-[#5E503F] text-[#EAE0D5] font-sans font-semibold text-xs uppercase tracking-wider backdrop-blur-md transition-all hover:border-[#C6AC8F]"
            >
              <Clock className="w-4 h-4 text-[#C6AC8F]" />
              <span>Vaqt Shkalasi</span>
            </Link>

            <Link
              to="/map"
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#141210]/90 hover:bg-[#1C1916] border border-[#5E503F] text-[#EAE0D5] font-sans font-semibold text-xs uppercase tracking-wider backdrop-blur-md transition-all hover:border-[#C6AC8F]"
            >
              <Map className="w-4 h-4 text-[#C6AC8F]" />
              <span>GIS Tarixiy Xarita</span>
            </Link>
          </div>

          {/* Metric Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 max-w-3xl mx-auto">
            <div className="p-4 rounded-xl bg-[#141210]/90 border border-[#5E503F]/40 backdrop-blur-sm">
              <div className="font-heading text-xl sm:text-2xl font-bold text-[#EAE0D5]">2750+ Yil</div>
              <div className="text-[10px] uppercase tracking-widest text-[#C6AC8F] font-mono mt-0.5">Tarixiy Xronologiya</div>
            </div>
            <div className="p-4 rounded-xl bg-[#141210]/90 border border-[#5E503F]/40 backdrop-blur-sm">
              <div className="font-heading text-xl sm:text-2xl font-bold text-[#EAE0D5]">{persons.length} Shaxs</div>
              <div className="text-[10px] uppercase tracking-widest text-[#C6AC8F] font-mono mt-0.5">Verifikatsiya qilingan</div>
            </div>
            <div className="p-4 rounded-xl bg-[#141210]/90 border border-[#5E503F]/40 backdrop-blur-sm">
              <div className="font-heading text-xl sm:text-2xl font-bold text-[#EAE0D5]">30+ Manba</div>
              <div className="text-[10px] uppercase tracking-widest text-[#C6AC8F] font-mono mt-0.5">Qoʻlyozmalar</div>
            </div>
            <div className="p-4 rounded-xl bg-[#141210]/90 border border-[#5E503F]/40 backdrop-blur-sm">
              <div className="font-heading text-xl sm:text-2xl font-bold text-[#EAE0D5]">100% Ochiq</div>
              <div className="text-[10px] uppercase tracking-widest text-[#C6AC8F] font-mono mt-0.5">Akademik Erkinlik</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 6 Core Modules Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#5E503F]/40 pb-4">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#EAE0D5]">
              Asosiy Ilmiy Boʻlimlar
            </h2>
            <p className="text-xs sm:text-sm text-[#A89F91] mt-1">
              Tarixiy shaxslar, davlatlar, shaharlar, janglar, sulhlar va meʼmoriy meroslar
            </p>
          </div>
          <span className="text-xs text-[#C6AC8F] font-mono uppercase tracking-wider">
            6 ta toʻliq interaktiv modul
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainModules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <Link
                key={idx}
                to={mod.path}
                className="group relative h-64 rounded-2xl overflow-hidden border border-[#5E503F]/40 hover:border-[#C6AC8F] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-end p-6 bg-[#141210]"
              >
                {/* Background Image */}
                <img
                  src={mod.bgImage}
                  alt={mod.title}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.3] group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-[#0A0908]/75 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-[#0A0908]/80 border border-[#5E503F] text-[10px] font-mono uppercase tracking-widest text-[#C6AC8F] backdrop-blur-md">
                  {mod.count} ta maqola
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#141210] border border-[#5E503F] flex items-center justify-center text-[#C6AC8F] group-hover:border-[#C6AC8F] group-hover:bg-[#C6AC8F] group-hover:text-[#0A0908] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#EAE0D5] group-hover:text-[#C6AC8F] transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-[#A89F91] line-clamp-2 leading-relaxed">
                    {mod.desc}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#C6AC8F] pt-1 group-hover:translate-x-1 transition-transform uppercase tracking-wider font-mono">
                    <span>Boʻlimga oʻtish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Historical Figures Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#5E503F]/40 pb-4">
          <div>
            <h2 className="font-heading text-2xl font-bold text-[#EAE0D5]">
              Mashhur Tarixiy Siymolar
            </h2>
            <p className="text-xs text-[#A89F91]">
              Sarkardalar, davlat arboblari, olimlar va mutafakkirlar
            </p>
          </div>
          <Link
            to="/persons"
            className="flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-[#C6AC8F] hover:text-[#EAE0D5]"
          >
            Barchasini koʻrish
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {persons.slice(0, 3).map(person => (
            <div
              key={person.id}
              className="group relative rounded-2xl overflow-hidden border border-[#5E503F]/40 bg-[#141210] hover:border-[#C6AC8F]/70 transition-all shadow-xl flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={person.heroBackgroundUrl || person.avatarUrl}
                  alt={person.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.8]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-transparent" />
                <button
                  onClick={() => toggleBookmark(person.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                    isBookmarked(person.id)
                      ? 'bg-[#C6AC8F] text-[#0A0908]'
                      : 'bg-[#0A0908]/70 text-[#EAE0D5] hover:bg-[#C6AC8F] hover:text-[#0A0908] border border-[#5E503F]'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[10px] text-[#C6AC8F] font-mono font-semibold uppercase tracking-widest mb-1">
                    {person.dynastyOrState}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#EAE0D5] group-hover:text-[#C6AC8F] transition-colors">
                    {person.name}
                  </h3>
                  <p className="text-xs text-[#A89F91] mt-1 line-clamp-3 leading-relaxed">
                    {person.shortBio}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#5E503F]/30 flex items-center justify-between text-xs">
                  <span className="text-[#C6AC8F] font-mono text-[11px]">
                    {person.birthYear}{person.isBCE ? ' m.avv.' : ''} – {person.deathYear}{person.isBCE ? ' m.avv.' : ''}
                  </span>
                  <Link
                    to={`/persons?id=${person.id}`}
                    className="flex items-center gap-1 text-[#C6AC8F] hover:text-[#EAE0D5] font-semibold text-xs uppercase tracking-wider"
                  >
                    Batafsil
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive GIS & Timeline Highlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-[#5E503F] bg-[#141210] p-8 sm:p-12 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A0908] border border-[#5E503F] text-[#C6AC8F] text-xs font-mono uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5" />
              <span>GIS Xaritalar & Dinamik Vaqt Shkalasi</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#EAE0D5] leading-tight">
              Tarixni Xarita va Vaqt Boʻylab Jonli Kuzating
            </h2>
            <p className="text-sm text-[#A89F91] leading-relaxed">
              Buyuk Ipak Yoʻli marshrutlari, Amir Temur va Aleksandr Makedonskiyning harbiy yurishlari hamda qadimiy meʼmoriy obidalarning geografik koordinatalarini interaktiv GIS qatlamlarida tahlil qiling.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/map"
                className="px-6 py-2.5 rounded-lg bg-[#C6AC8F] hover:bg-[#EAE0D5] text-[#0A0908] font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2"
              >
                <Map className="w-4 h-4" />
                <span>Interaktiv Xaritani Ochish</span>
              </Link>
              <Link
                to="/timeline"
                className="px-6 py-2.5 rounded-lg bg-[#0A0908] hover:bg-[#1C1916] text-[#EAE0D5] font-semibold text-xs uppercase tracking-wider border border-[#5E503F] transition-all flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-[#C6AC8F]" />
                <span>Vaqt Shkalasini Koʻrish</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
