import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen, MapPin, Shield, Scroll, Landmark, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHistoricalData } from '../context/HistoricalDataContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { searchGlobal } = useHistoricalData();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const rawResults = searchGlobal(query);
  const filteredResults = selectedCategory === 'all'
    ? rawResults
    : rawResults.filter(r => r.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'person': return <User className="w-4 h-4 text-amber-400" />;
      case 'state': return <Landmark className="w-4 h-4 text-emerald-400" />;
      case 'city': return <MapPin className="w-4 h-4 text-blue-400" />;
      case 'conflict': return <Shield className="w-4 h-4 text-red-400" />;
      case 'treaty': return <Scroll className="w-4 h-4 text-purple-400" />;
      case 'monument': return <BookOpen className="w-4 h-4 text-orange-400" />;
      default: return <BookOpen className="w-4 h-4 text-amber-400" />;
    }
  };

  const handleSelect = (route: string) => {
    navigate(route);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/80 backdrop-blur-md">
      <div
        id="global-search-card"
        className="relative w-full max-w-2xl bg-[#141210] border border-[#5E503F] rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#5E503F]/40 bg-[#0A0908]">
          <Search className="w-5 h-5 text-[#C6AC8F]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tarixiy shaxs, shahar, jang, sulh yoki davlatni izlash..."
            className="flex-1 bg-transparent text-[#EAE0D5] placeholder:text-[#5E503F] text-sm focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-[#A89F91] hover:text-[#EAE0D5] p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-[#141210] text-[#C6AC8F] hover:bg-[#1C1916] border border-[#5E503F]"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#0A0908]/60 border-b border-[#5E503F]/30 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'person', label: 'Shaxslar' },
            { id: 'state', label: 'Davlatlar' },
            { id: 'city', label: 'Shaharlar' },
            { id: 'conflict', label: 'Urushlar' },
            { id: 'treaty', label: 'Shartnomalar' },
            { id: 'monument', label: 'Obidalar' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#C6AC8F] text-[#0A0908] font-bold shadow-sm'
                  : 'bg-[#141210] text-[#A89F91] hover:text-[#EAE0D5] hover:bg-[#1C1916] border border-[#5E503F]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1 bg-[#141210]">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-[#A89F91] text-xs leading-relaxed">
              <BookOpen className="w-8 h-8 text-[#5E503F] mx-auto mb-2 opacity-60" />
              Qidirish uchun kalit soʻzni kiriting (masalan: "Temur", "Samarqand", "Politimet", "Kalon").
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="p-8 text-center text-[#A89F91] text-xs">
              "{query}" soʻrovi boʻyicha hech narsa topilmadi.
            </div>
          ) : (
            filteredResults.map(res => (
              <div
                key={`${res.category}-${res.id}`}
                onClick={() => handleSelect(res.route)}
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-[#0A0908] border border-transparent hover:border-[#5E503F] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#0A0908] border border-[#5E503F]/50">
                    <img
                      src={res.heroImage}
                      alt={res.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#EAE0D5] group-hover:text-[#C6AC8F] truncate font-heading">
                        {res.title}
                      </span>
                      <span className="flex items-center gap-1 text-[9px] px-2 py-0.5 rounded bg-[#0A0908] text-[#C6AC8F] font-mono border border-[#5E503F]/40 uppercase tracking-wider">
                        {getCategoryIcon(res.category)}
                        {res.categoryLabel}
                      </span>
                    </div>
                    <p className="text-xs text-[#A89F91] line-clamp-1 mt-0.5">
                      {res.snippet}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 pl-2">
                  <span className="text-xs text-[#C6AC8F] font-mono hidden sm:inline text-[11px]">
                    {res.yearDisplay}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#5E503F] group-hover:text-[#C6AC8F] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
