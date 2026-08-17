import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  BookOpen,
  Globe2,
  Download,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  PlusCircle,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useHistoricalData } from '../context/HistoricalDataContext';
import { useAuth } from '../context/AuthContext';
import { Citation, HistoricalPerson } from '../types';

export const SourcesAndAiPage: React.FC = () => {
  const { addNewPerson, addNewMonument } = useHistoricalData();
  const { user, setIsAuthModalOpen } = useAuth();

  const [query, setQuery] = useState('');
  const [lang, setLang] = useState<'en' | 'ru'>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState<{
    title: string;
    originalExtract: string;
    translatedSummary: string;
    academicAnalysis: string;
    suggestedCategory: string;
    thumbnail?: string;
    sourceUrl?: string;
    citations: Citation[];
  } | null>(null);

  const [isSaved, setIsSaved] = useState(false);

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setFetchedData(null);
    setIsSaved(false);

    try {
      const res = await fetch('/api/wiki/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim(), language: lang })
      });

      if (!res.ok) {
        throw new Error('Xalqaro manbadan maʼlumot topilmadi yoki tarmoq xatosi.');
      }

      const data = await res.json();
      setFetchedData(data);
    } catch (err: any) {
      setError(err.message || 'Xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToEncyclopedia = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!fetchedData) return;

    const newPerson: HistoricalPerson = {
      id: `imported-${Date.now()}`,
      name: fetchedData.title,
      category: 'scientist',
      title: 'Tarixiy Shaxs va Alloma',
      dynastyOrState: 'Sharq Allomalari',
      birthYear: 1000,
      deathYear: 1080,
      isBCE: false,
      shortBio: fetchedData.translatedSummary.slice(0, 200) + '...',
      fullBio: fetchedData.translatedSummary + '\n\n' + (fetchedData.academicAnalysis || ''),
      avatarUrl: fetchedData.thumbnail || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80',
      heroBackgroundUrl: fetchedData.thumbnail || 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1200&q=80',
      achievements: ['Xalqaro ensiklopediyadan ilmiy tarjima qilindi', 'Akademik manbalar bilan boyitildi'],
      tags: ['ensiklopediya', 'ai_tarjima', 'manbashunoslik'],
      famousQuotes: [],
      majorWorksOrCampaigns: ['Akademik tarjima qilingan ilmiy maqola'],
      coordinates: { lat: 39.6542, lng: 66.9597, locationName: 'Sharq madaniyati markazi' },
      viewsCount: 1,
      citations: fetchedData.citations
    };

    addNewPerson(newPerson);
    setIsSaved(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 bg-gradient-to-r from-[#140b1e] via-[#1f102d] to-[#140b1e] p-8 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Xalqaro Manbalar & AI Akademik Tarjima</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-purple-100">
            Vikipediya & Britannica Ilmiy Integratsiyasi
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed font-sans-hist">
            Ixtiyoriy xalqaro tarixiy maqolani qidirib toping, uni Gemini 3.7 yordamida akademik oʻzbek tiliga tarjima qiling, manbashunoslik bibliografiyasini shakllantiring va portaldagi bazaga toʻgʻridan-toʻgʻri qoʻshing.
          </p>
        </div>
      </div>

      {/* Search & Fetch Form */}
      <form onSubmit={handleFetch} className="p-6 rounded-2xl bg-[#121622] border border-purple-500/20 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Mavzuni ingliz yoki rus tilida kiriting (masalan: Timur, Al-Khwarizmi, Samarkand, Battle of Ankara)..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-slate-700 focus:border-purple-400 text-white placeholder:text-slate-500 text-sm focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={lang}
              onChange={e => setLang(e.target.value as 'en' | 'ru')}
              className="px-3.5 py-3 rounded-xl bg-black/50 border border-slate-700 text-white text-xs focus:outline-none focus:border-purple-400"
            >
              <option value="en">English Wikipedia</option>
              <option value="ru">Русская Википедия</option>
            </select>

            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-purple-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Qidirilmoqda...</span>
                </>
              ) : (
                <>
                  <Globe2 className="w-4 h-4" />
                  <span>Manbani Yuklash & AI Tahlil</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Demo Chips */}
        <div className="flex items-center gap-2 text-xs text-slate-400 overflow-x-auto pt-1">
          <span className="font-semibold">Tezkor namunalar:</span>
          {['Timur', 'Avicenna', 'Al-Biruni', 'Battle of Ankara', 'Registan', 'Sogdia'].map(s => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setQuery(s);
                setLang('en');
              }}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-purple-500/20 text-purple-300 border border-white/10"
            >
              {s}
            </button>
          ))}
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Fetched & Translated Result */}
      {fetchedData && (
        <div className="rounded-3xl border border-purple-500/30 bg-[#121622] overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-6">
            <div className="flex items-center gap-4">
              {fetchedData.thumbnail && (
                <img
                  src={fetchedData.thumbnail}
                  alt={fetchedData.title}
                  className="w-16 h-16 rounded-2xl object-cover border border-purple-500/40"
                  referrerPolicy="no-referrer"
                />
              )}
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                  Akademik Tarjima & Tahlil Tayyor
                </span>
                <h2 className="font-heading text-2xl font-bold text-white">
                  {fetchedData.title}
                </h2>
                {fetchedData.sourceUrl && (
                  <a
                    href={fetchedData.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-purple-300/80 hover:text-purple-200 flex items-center gap-1 mt-1 underline"
                  >
                    <span>Asl manba havolasi (Wikipedia)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Save to Encyclopedia Button */}
            <div>
              {isSaved ? (
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ensiklopediya Bazasiga Qoʻshildi!</span>
                </div>
              ) : (
                <button
                  id="save-to-encyclopedia-btn"
                  onClick={handleSaveToEncyclopedia}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Ensiklopediya Bazasiga Saqlash</span>
                </button>
              )}
            </div>
          </div>

          {/* Side by side Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Translated Academic Uzbek */}
            <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/20 space-y-3">
              <h4 className="font-heading text-sm font-bold text-purple-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Akademik Oʻzbekcha Matn (AI Tarjimasi):
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans-hist">
                {fetchedData.translatedSummary}
              </p>
              {fetchedData.academicAnalysis && (
                <div className="pt-3 border-t border-purple-500/20">
                  <span className="text-xs font-bold text-amber-300 block mb-1">Tarixiy Ahamiyati:</span>
                  <p className="text-xs text-slate-300">{fetchedData.academicAnalysis}</p>
                </div>
              )}
            </div>

            {/* Original Source Text */}
            <div className="p-5 rounded-2xl bg-black/30 border border-white/5 space-y-3">
              <h4 className="font-heading text-sm font-bold text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Asl Manba Matni ({lang.toUpperCase()} Original):
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-wrap">
                {fetchedData.originalExtract}
              </p>
            </div>
          </div>

          {/* Generated Citations */}
          {fetchedData.citations && fetchedData.citations.length > 0 && (
            <div className="pt-4 border-t border-purple-500/20">
              <h4 className="font-heading text-sm font-bold text-amber-300 mb-2">
                Avtomatik Shakllantirilgan Bibliografiya (Citations):
              </h4>
              <div className="space-y-2">
                {fetchedData.citations.map((c, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-slate-300 flex items-center justify-between">
                    <span>• {c.author ? `${c.author}. ` : ''}<strong>"{c.sourceTitle}"</strong> ({c.year || '2024'})</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 uppercase font-semibold">
                      {c.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
