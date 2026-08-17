import React from 'react';
import { BookOpen, FileText, Globe, Bookmark, ExternalLink } from 'lucide-react';
import { Citation } from '../types';

interface CitationListProps {
  citations: Citation[];
}

export const CitationList: React.FC<CitationListProps> = ({ citations }) => {
  if (!citations || citations.length === 0) return null;

  return (
    <div id="citations-section" className="mt-8 pt-6 border-t border-amber-500/20">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-amber-500" />
        <h4 className="font-heading text-lg font-bold text-amber-200">
          Asosiy Manbalar va Bibliografiya (Footnotes)
        </h4>
      </div>
      <p className="text-xs text-slate-400 mb-4">
        Ushbu maqoladagi barcha tarixiy faktlar, sanalar va iqtiboslar quyidagi birlamchi qoʻlyozmalar, akademik asarlar va arxiv hujjatlariga asoslangan:
      </p>
      <div className="space-y-3">
        {citations.map((c, index) => (
          <div
            key={c.id || index}
            id={`citation-${c.id || index}`}
            className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-white/5 hover:border-amber-500/30 transition-colors text-sm"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center text-xs font-semibold">
              [{index + 1}]
            </span>
            <div className="flex-1">
              <div className="font-medium text-slate-200">
                {c.author && <span className="font-semibold text-amber-300">{c.author}. </span>}
                <span className="italic text-slate-100">"{c.sourceTitle}"</span>
                {c.year && <span className="text-slate-400"> ({c.year}-yil).</span>}
              </div>
              {c.publisherOrUrl && (
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  {c.type === 'web' ? <Globe className="w-3.5 h-3.5 text-blue-400" /> : <Bookmark className="w-3.5 h-3.5 text-amber-400" />}
                  {c.publisherOrUrl.startsWith('http') ? (
                    <a
                      href={c.publisherOrUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400/90 hover:text-amber-300 flex items-center gap-1 underline underline-offset-2"
                    >
                      {c.publisherOrUrl}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span>{c.publisherOrUrl}</span>
                  )}
                  {c.pageNumber && <span>, Bet: {c.pageNumber}</span>}
                </div>
              )}
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded uppercase font-medium bg-amber-500/10 text-amber-300">
              {c.type === 'manuscript' ? 'Qoʻlyozma' : c.type === 'academic_paper' ? 'Akademik' : c.type === 'archive' ? 'Arxiv' : 'Nashr'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
