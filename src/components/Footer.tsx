import React from 'react';
import { BookOpen, ShieldCheck, Compass, Map, Landmark, Award, Globe, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-[#5E503F]/40 bg-[#0A0908] text-[#A89F91] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-[#C6AC8F] rotate-45 flex items-center justify-center bg-[#141210]">
                <span className="-rotate-45 font-heading font-black text-sm text-[#C6AC8F]">
                  T
                </span>
              </div>
              <span className="font-heading font-black text-base text-[#EAE0D5] tracking-wider">
                TURON TARIX
              </span>
            </div>
            <p className="text-xs text-[#A89F91] leading-relaxed">
              Tarix fani boʻyicha oʻquvchilar, ilmiy izlanuvchilar va mutaxassislar uchun interaktiv ensiklopediya, GIS xaritasi, vaqt shkalasi va ilmiy tadqiqotlar portali.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#C6AC8F] font-mono">
              <ShieldCheck className="w-4 h-4 text-[#C6AC8F]" />
              <span>Akademik faktlar verifikatsiyalangan</span>
            </div>
          </div>

          {/* Col 2: Interaktiv Modullar */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold text-[#EAE0D5] uppercase tracking-widest">
              Interaktiv Modullar
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/persons" className="hover:text-[#C6AC8F] transition-colors">
                  Tarixiy Shaxslar Biosferasi
                </Link>
              </li>
              <li>
                <Link to="/states" className="hover:text-[#C6AC8F] transition-colors">
                  Davlatlar va Imperiyalar
                </Link>
              </li>
              <li>
                <Link to="/cities" className="hover:text-[#C6AC8F] transition-colors">
                  Qadimgi va Tarixiy Shaharlar
                </Link>
              </li>
              <li>
                <Link to="/conflicts" className="hover:text-[#C6AC8F] transition-colors">
                  Qoʻzgʻolonlar va Janglar
                </Link>
              </li>
              <li>
                <Link to="/treaties" className="hover:text-[#C6AC8F] transition-colors">
                  Tinchlik Shartnomalari
                </Link>
              </li>
              <li>
                <Link to="/monuments" className="hover:text-[#C6AC8F] transition-colors">
                  Meʼmoriy Obidalar
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Ilmiy Vositalar & GIS */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold text-[#EAE0D5] uppercase tracking-widest">
              Ilmiy & GIS Vositalar
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/timeline" className="hover:text-[#C6AC8F] transition-colors flex items-center gap-1.5">
                  <span>Interaktiv Vaqt Shkalasi (Timeline)</span>
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-[#C6AC8F] transition-colors flex items-center gap-1.5">
                  <span>Tarixiy Geografiya (GIS Xarita)</span>
                </Link>
              </li>
              <li>
                <Link to="/sources" className="hover:text-[#C6AC8F] transition-colors flex items-center gap-1.5">
                  <span>Vikipediya & AI Tarjima Moduli</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/approvals" className="hover:text-[#C6AC8F] transition-colors flex items-center gap-1.5">
                  <span>Tahrirlash va Takliflar Kengashi</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Manbalar & Birlamchi Qo'lyozmalar */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold text-[#EAE0D5] uppercase tracking-widest">
              Tarixiy Manbalar
            </h4>
            <p className="text-xs text-[#A89F91] leading-relaxed">
              Barcha maqolalarda Sharafuddin Ali Yazdiy, Narshaxiy, Juvayniy, Arrian, Ibn Arabshoh va OʻzR Fanlar Akademiyasi ilmiy nashrlariga qatʼiy tayanilgan.
            </p>
            <div className="p-3 rounded-xl bg-[#141210] border border-[#5E503F]/50 text-[11px] text-[#EAE0D5]">
              <span className="font-semibold block mb-0.5 text-[#C6AC8F]">Xalqaro Bibliografiya:</span>
              APA va Chicago akademik iqtibos tizimi qoʻllab-quvvatlanadi.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#5E503F]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A89F91]">
          <p>© {new Date().getFullYear()} Turon Tarix Portali. Barcha akademik huquqlar himoyalangan.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#C6AC8F]">
              Immersive Historical Knowledge Engine
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
