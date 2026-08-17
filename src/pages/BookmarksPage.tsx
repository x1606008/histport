import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { useHistoricalData } from '../context/HistoricalDataContext';
import { useAuth } from '../context/AuthContext';

export const BookmarksPage: React.FC = () => {
  const { persons, states, cities, conflicts, treaties, monuments } = useHistoricalData();
  const { user, toggleBookmark } = useAuth();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <Bookmark className="w-12 h-12 text-amber-500 mx-auto opacity-50" />
        <h2 className="font-heading text-2xl font-bold text-white">
          Saqlangan Maqolalar
        </h2>
        <p className="text-sm text-slate-400">
          Shaxsiy mutolaa roʻyxatingizni koʻrish uchun tizimga kiring.
        </p>
      </div>
    );
  }

  // Find all items matching user's bookmarks
  const savedItems: {
    id: string;
    title: string;
    category: string;
    route: string;
    image: string;
    snippet: string;
  }[] = [];

  user.bookmarks.forEach(bId => {
    const p = persons.find(item => item.id === bId);
    if (p) {
      savedItems.push({
        id: p.id,
        title: p.name,
        category: 'Tarixiy Shaxs',
        route: `/persons?id=${p.id}`,
        image: p.avatarUrl || p.heroBackgroundUrl,
        snippet: p.shortBio
      });
      return;
    }

    const st = states.find(item => item.id === bId);
    if (st) {
      savedItems.push({
        id: st.id,
        title: st.name,
        category: 'Davlat / Imperiya',
        route: `/states?id=${st.id}`,
        image: st.heroBackgroundUrl,
        snippet: st.shortDescription
      });
      return;
    }

    const c = cities.find(item => item.id === bId);
    if (c) {
      savedItems.push({
        id: c.id,
        title: c.name,
        category: 'Qadimgi Shahar',
        route: `/cities?id=${c.id}`,
        image: c.heroBackgroundUrl,
        snippet: c.shortDescription
      });
      return;
    }

    const cf = conflicts.find(item => item.id === bId);
    if (cf) {
      savedItems.push({
        id: cf.id,
        title: cf.title,
        category: 'Jang / Qoʻzgʻolon',
        route: `/conflicts?id=${cf.id}`,
        image: cf.heroBackgroundUrl,
        snippet: cf.outcome
      });
      return;
    }

    const tr = treaties.find(item => item.id === bId);
    if (tr) {
      savedItems.push({
        id: tr.id,
        title: tr.title,
        category: 'Tinchlik Shartnomasi',
        route: `/treaties?id=${tr.id}`,
        image: tr.heroBackgroundUrl,
        snippet: tr.context
      });
      return;
    }

    const m = monuments.find(item => item.id === bId);
    if (m) {
      savedItems.push({
        id: m.id,
        title: m.name,
        category: 'Meʼmoriy Obida',
        route: `/monuments?id=${m.id}`,
        image: m.heroBackgroundUrl,
        snippet: m.shortDescription
      });
      return;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#121622] p-6 rounded-2xl border border-amber-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold text-white">
              Mening Saqlangan Maqolalarim
            </h1>
            <p className="text-xs text-slate-400">
              {user.name}ning shaxsiy ilmiy kutubxonasi ({savedItems.length} ta obʼyekt)
            </p>
          </div>
        </div>
      </div>

      {savedItems.length === 0 ? (
        <div className="p-12 text-center text-slate-400 bg-[#121622] rounded-2xl border border-white/5 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto opacity-50" />
          <p className="text-sm">Hozircha hech qanday maqolani saqlamadingiz.</p>
          <Link
            to="/persons"
            className="inline-block px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-bold"
          >
            Ensiklopediya boʻylab sayr qilish
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedItems.map(item => (
            <div
              key={item.id}
              className="group rounded-2xl overflow-hidden border border-amber-500/20 bg-[#121622] hover:border-amber-400/50 transition-all p-5 shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="h-36 rounded-xl overflow-hidden bg-slate-900 border border-white/10 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 text-amber-300 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-white group-hover:text-amber-200">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.snippet}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <button
                  onClick={() => toggleBookmark(item.id)}
                  className="text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Oʻchirish</span>
                </button>

                <Link
                  to={item.route}
                  className="flex items-center gap-1 text-amber-400 font-semibold hover:underline"
                >
                  Ochish
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
