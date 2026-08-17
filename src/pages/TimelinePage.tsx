import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Search,
  Filter,
  ArrowRight,
  User,
  Landmark,
  Compass,
  Shield,
  Scroll,
  BookOpen,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useHistoricalData } from '../context/HistoricalDataContext';
import { TimelineEvent } from '../types';

export const TimelinePage: React.FC = () => {
  const { timelineEvents } = useHistoricalData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedEra, setSelectedEra] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Barcha Voqealar' },
    { id: 'person', label: 'Shaxslar', icon: User },
    { id: 'state', label: 'Davlatlar', icon: Landmark },
    { id: 'city', label: 'Shaharlar', icon: Compass },
    { id: 'conflict', label: 'Janglar', icon: Shield },
    { id: 'treaty', label: 'Sulhlar', icon: Scroll },
    { id: 'monument', label: 'Obidalar', icon: BookOpen }
  ];

  const eras = [
    { id: 'all', label: 'Barcha Davrlar' },
    { id: 'ancient', label: 'Qadimgi Dunyo (Miloddan avvalgi)' },
    { id: 'early_middle', label: 'Ilk Oʻrta Asrlar (V–X asrlar)' },
    { id: 'renaissance', label: 'Sharq Uygʻonishi (IX–XV asrlar)' },
    { id: 'modern_era', label: 'Keyingi Davr (XVI–XX asrlar)' }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'person': return <User className="w-4 h-4 text-amber-400" />;
      case 'state': return <Landmark className="w-4 h-4 text-emerald-400" />;
      case 'city': return <Compass className="w-4 h-4 text-blue-400" />;
      case 'conflict': return <Shield className="w-4 h-4 text-red-400" />;
      case 'treaty': return <Scroll className="w-4 h-4 text-purple-400" />;
      case 'monument': return <BookOpen className="w-4 h-4 text-orange-400" />;
      default: return <Clock className="w-4 h-4 text-amber-400" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'person': return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'state': return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'city': return 'bg-blue-500/10 text-blue-300 border-blue-500/30';
      case 'conflict': return 'bg-red-500/10 text-red-300 border-red-500/30';
      case 'treaty': return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
      case 'monument': return 'bg-orange-500/10 text-orange-300 border-orange-500/30';
      default: return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
    }
  };

  const filteredEvents = timelineEvents.filter(ev => {
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCat = selectedCategory === 'all' || ev.category === selectedCategory;

    let matchesEra = true;
    if (selectedEra === 'ancient') matchesEra = ev.isBCE === true;
    else if (selectedEra === 'early_middle') matchesEra = !ev.isBCE && ev.year >= 400 && ev.year < 900;
    else if (selectedEra === 'renaissance') matchesEra = !ev.isBCE && ev.year >= 900 && ev.year <= 1500;
    else if (selectedEra === 'modern_era') matchesEra = !ev.isBCE && ev.year > 1500;

    return matchesSearch && matchesCat && matchesEra;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const yearA = a.isBCE ? -a.year : a.year;
    const yearB = b.isBCE ? -b.year : b.year;
    return sortOrder === 'asc' ? yearA - yearB : yearB - yearA;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-r from-[#120f0a] via-[#1a140a] to-[#120f0a] p-8 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Interaktiv Xronologiya</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-amber-100">
            Tarixiy Voqealar Vaqt Shkalasi
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed font-sans-hist">
            Miloddan avvalgi asrlardan to hozirgi kungacha boʻlgan eng muhim tarixiy burilish nuqtalari, imperiyalar asos solinishi, janglar va meʼmoriy moʻjizalar xronologiyasi.
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="space-y-4 bg-[#121622] p-5 rounded-2xl border border-amber-500/20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Voqea, asr yoki shaxs nomini qidirish..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-slate-700 focus:border-amber-400 text-white placeholder:text-slate-500 text-xs focus:outline-none"
            />
          </div>

          {/* Sort Order Toggle */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Tartib:</span>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 border border-white/10 font-semibold transition-colors"
            >
              {sortOrder === 'asc' ? 'Qadimgidan yangisiga (Oʻsish)' : 'Yangisidan qadimgisiga (Kamayish)'}
            </button>
          </div>
        </div>

        {/* Era Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs border-t border-white/5 pt-3">
          <span className="text-slate-400 font-semibold flex-shrink-0">Davrlar:</span>
          {eras.map(era => (
            <button
              key={era.id}
              onClick={() => setSelectedEra(era.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                selectedEra === era.id
                  ? 'bg-amber-500 text-black font-semibold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {era.label}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold flex-shrink-0">Modullar:</span>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Vertical Timeline Track */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-amber-400/50 before:to-amber-900">
        {sortedEvents.map((ev, index) => (
          <div
            key={ev.id}
            id={`timeline-event-${ev.id}`}
            className="relative flex items-start gap-4 sm:gap-6 group"
          >
            {/* Timeline Node Point */}
            <div className="absolute -left-6 sm:-left-10 mt-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#121622] border-2 border-amber-500 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-125 group-hover:bg-amber-500 group-hover:text-black transition-all">
              {getCategoryIcon(ev.category)}
            </div>

            {/* Event Card */}
            <div className="flex-1 rounded-2xl overflow-hidden border border-amber-500/20 bg-[#121622] hover:border-amber-400/50 transition-all p-5 sm:p-6 shadow-xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-lg sm:text-xl font-bold text-amber-300 font-mono">
                    {ev.year} {ev.isBCE ? 'm.avv.' : 'yil'}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">({ev.century})</span>
                </div>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${getCategoryBadgeClass(ev.category)}`}>
                  {ev.category}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {ev.heroBackgroundUrl && (
                  <div className="h-28 sm:h-auto rounded-xl overflow-hidden bg-slate-900 border border-white/10 sm:col-span-1">
                    <img
                      src={ev.heroBackgroundUrl}
                      alt={ev.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <div className={`${ev.heroBackgroundUrl ? 'sm:col-span-3' : 'sm:col-span-4'} space-y-2`}>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                    {ev.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-hist">
                    {ev.summary}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {ev.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-slate-400 border border-white/5">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    {ev.route && (
                      <Link
                        to={`${ev.route}?id=${ev.entityId}`}
                        className="flex items-center gap-1 text-xs text-amber-400 font-semibold hover:underline"
                      >
                        Maqolani oʻqish
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
