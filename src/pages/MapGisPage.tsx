import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import L from 'leaflet';
import {
  Map as MapIcon,
  Layers,
  Compass,
  Building2,
  Shield,
  Milestone,
  Sparkles,
  Info,
  Maximize2,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { useHistoricalData } from '../context/HistoricalDataContext';

export const MapGisPage: React.FC = () => {
  const { cities, monuments, conflicts, mapRoutes } = useHistoricalData();
  const [searchParams] = useSearchParams();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<{
    citiesGroup: L.LayerGroup;
    monumentsGroup: L.LayerGroup;
    conflictsGroup: L.LayerGroup;
    routesGroup: L.LayerGroup;
  } | null>(null);

  // Active Layer Toggles
  const [showSilkRoad, setShowSilkRoad] = useState(true);
  const [showTimurCampaign, setShowTimurCampaign] = useState(true);
  const [showAlexanderMarch, setShowAlexanderMarch] = useState(true);
  const [showCities, setShowCities] = useState(true);
  const [showMonuments, setShowMonuments] = useState(true);
  const [showConflicts, setShowConflicts] = useState(true);
  const [mapStyle, setMapStyle] = useState<'dark' | 'antique'>('dark');

  const [selectedFeature, setSelectedFeature] = useState<{
    title: string;
    category: string;
    snippet: string;
    imageUrl?: string;
    route?: string;
    coords: [number, number];
  } | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialLat = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : 39.6542;
      const initialLng = searchParams.get('lng') ? parseFloat(searchParams.get('lng')!) : 66.9597;
      const initialZoom = searchParams.get('lat') ? 8 : 5;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: initialZoom,
        minZoom: 3,
        maxZoom: 16
      });

      // Tile Layer (Dark Matter by CartoDB)
      const tileUrl =
        mapStyle === 'dark'
          ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
          : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}';

      const baseTile = L.tileLayer(tileUrl, {
        attribution: '&copy; CartoDB, OpenStreetMap & Historical GIS Project',
        maxZoom: 19
      }).addTo(map);

      // Create Layer Groups
      const citiesGroup = L.layerGroup().addTo(map);
      const monumentsGroup = L.layerGroup().addTo(map);
      const conflictsGroup = L.layerGroup().addTo(map);
      const routesGroup = L.layerGroup().addTo(map);

      layersGroupRef.current = {
        citiesGroup,
        monumentsGroup,
        conflictsGroup,
        routesGroup
      };

      mapInstanceRef.current = map;
    }

    return () => {
      // Map cleanup on unmount handled gracefully
    };
  }, []);

  // Update Markers & Polylines whenever states or data change
  useEffect(() => {
    if (!mapInstanceRef.current || !layersGroupRef.current) return;

    const { citiesGroup, monumentsGroup, conflictsGroup, routesGroup } = layersGroupRef.current;

    // Clear previous
    citiesGroup.clearLayers();
    monumentsGroup.clearLayers();
    conflictsGroup.clearLayers();
    routesGroup.clearLayers();

    // 1. Render Historical Routes
    mapRoutes.forEach(r => {
      let isVisible = false;
      if (r.id === 'silk-road-north' && showSilkRoad) isVisible = true;
      if (r.id === 'timur-campaigns' && showTimurCampaign) isVisible = true;
      if (r.id === 'alexander-campaign' && showAlexanderMarch) isVisible = true;

      if (isVisible) {
        const polyline = L.polyline(r.coordinates as [number, number][], {
          color: r.color,
          weight: 4,
          opacity: 0.85,
          dashArray: r.id.includes('alexander') ? '6, 8' : undefined
        });

        polyline.bindTooltip(
          `<div class="font-sans font-bold text-xs text-amber-200">${r.name}</div><div class="text-[10px] text-slate-300">${r.period}</div>`,
          { sticky: true, className: 'leaflet-custom-tooltip' }
        );

        polyline.on('click', () => {
          setSelectedFeature({
            title: r.name,
            category: 'Tarixiy Karvon / Yurish Yoʻli',
            snippet: r.description,
            coords: r.coordinates[0] as [number, number]
          });
        });

        routesGroup.addLayer(polyline);
      }
    });

    // 2. Render Cities
    if (showCities) {
      cities.forEach(c => {
        const customIcon = L.divIcon({
          className: 'custom-map-city-icon',
          html: `<div class="w-8 h-8 rounded-full bg-blue-600/90 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold hover:scale-125 transition-transform">🏛️</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([c.coordinates.lat, c.coordinates.lng], { icon: customIcon });
        marker.bindTooltip(`<strong>${c.name}</strong>${c.ancientName ? ` (${c.ancientName})` : ''}`, {
          direction: 'top',
          className: 'leaflet-custom-tooltip'
        });

        marker.on('click', () => {
          setSelectedFeature({
            title: c.name,
            category: `Qadimiy Shahar (${c.establishedYear}${c.isBCE ? ' m.avv.' : ''})`,
            snippet: c.shortDescription,
            imageUrl: c.heroBackgroundUrl,
            route: `/cities?id=${c.id}`,
            coords: [c.coordinates.lat, c.coordinates.lng]
          });
        });

        citiesGroup.addLayer(marker);
      });
    }

    // 3. Render Monuments
    if (showMonuments) {
      monuments.forEach(m => {
        const customIcon = L.divIcon({
          className: 'custom-map-monument-icon',
          html: `<div class="w-8 h-8 rounded-full bg-amber-500/95 border-2 border-black shadow-lg flex items-center justify-center text-black text-xs font-bold hover:scale-125 transition-transform">🕌</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([m.coordinates.lat, m.coordinates.lng], { icon: customIcon });
        marker.bindTooltip(`<strong>${m.name}</strong> - ${m.locationCity}`, {
          direction: 'top',
          className: 'leaflet-custom-tooltip'
        });

        marker.on('click', () => {
          setSelectedFeature({
            title: m.name,
            category: `Meʼmoriy Obida (${m.buildCentury})`,
            snippet: m.shortDescription,
            imageUrl: m.heroBackgroundUrl,
            route: `/monuments?id=${m.id}`,
            coords: [m.coordinates.lat, m.coordinates.lng]
          });
        });

        monumentsGroup.addLayer(marker);
      });
    }

    // 4. Render Conflicts / Battles
    if (showConflicts) {
      conflicts.forEach(cf => {
        const customIcon = L.divIcon({
          className: 'custom-map-battle-icon',
          html: `<div class="w-8 h-8 rounded-full bg-red-600/95 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold hover:scale-125 transition-transform">⚔️</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([cf.coordinates.lat, cf.coordinates.lng], { icon: customIcon });
        marker.bindTooltip(`<strong>${cf.title}</strong> (${cf.startYear}${cf.isBCE ? ' m.avv.' : ''})`, {
          direction: 'top',
          className: 'leaflet-custom-tooltip'
        });

        marker.on('click', () => {
          setSelectedFeature({
            title: cf.title,
            category: `Tarixiy Jang Maydoni (${cf.startYear}${cf.isBCE ? ' m.avv.' : ''})`,
            snippet: cf.outcome,
            imageUrl: cf.heroBackgroundUrl,
            route: `/conflicts?id=${cf.id}`,
            coords: [cf.coordinates.lat, cf.coordinates.lng]
          });
        });

        conflictsGroup.addLayer(marker);
      });
    }
  }, [
    showSilkRoad,
    showTimurCampaign,
    showAlexanderMarch,
    showCities,
    showMonuments,
    showConflicts,
    cities,
    monuments,
    conflicts,
    mapRoutes
  ]);

  // Center on map helper
  const handleFlyTo = (lat: number, lng: number, zoom = 10) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], zoom, { duration: 1.5 });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#121622] p-5 rounded-2xl border border-blue-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-1">
            <MapIcon className="w-3.5 h-3.5" />
            <span>Tarixiy Geografiya & GIS Qatlamlari</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-white">
            Interaktiv Tarixiy Xarita va Marshrutlar
          </h1>
        </div>

        {/* Quick Location Fly-to Preset buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-semibold hidden sm:inline">Tezkor Fokus:</span>
          <button
            onClick={() => handleFlyTo(39.6542, 66.9597, 11)}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20"
          >
            Samarqand
          </button>
          <button
            onClick={() => handleFlyTo(39.7747, 64.4286, 11)}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20"
          >
            Buxoro
          </button>
          <button
            onClick={() => handleFlyTo(41.3783, 60.3639, 11)}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20"
          >
            Xiva
          </button>
          <button
            onClick={() => handleFlyTo(39.75, 67.2, 9)}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-300 border border-red-500/20"
          >
            Politimet jangi
          </button>
          <button
            onClick={() => handleFlyTo(39.5, 66.5, 5)}
            className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40 font-semibold"
          >
            Umumiy Markaz
          </button>
        </div>
      </div>

      {/* Main GIS Map Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Layer Controls Panel (Left Col) */}
        <div className="space-y-4 lg:col-span-1">
          <div className="p-5 rounded-2xl bg-[#121622] border border-amber-500/20 space-y-4">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-amber-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              Xarita Qatlamlari (GIS Layers)
            </h3>

            {/* Routes Layers */}
            <div className="space-y-2 border-t border-white/5 pt-3">
              <div className="text-xs font-semibold text-slate-400">Tarixiy Marshrutlar:</div>
              <label className="flex items-center justify-between text-xs text-amber-200 cursor-pointer p-1.5 rounded hover:bg-white/5">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-1 bg-amber-400 rounded-full"></span>
                  Buyuk Ipak Yoʻli
                </span>
                <input
                  type="checkbox"
                  checked={showSilkRoad}
                  onChange={e => setShowSilkRoad(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-blue-200 cursor-pointer p-1.5 rounded hover:bg-white/5">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-1 bg-blue-500 rounded-full"></span>
                  Amir Temur Yurishlari
                </span>
                <input
                  type="checkbox"
                  checked={showTimurCampaign}
                  onChange={e => setShowTimurCampaign(e.target.checked)}
                  className="rounded text-blue-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-purple-200 cursor-pointer p-1.5 rounded hover:bg-white/5">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-1 bg-purple-400 border-b border-dashed"></span>
                  Aleksandr Makedonskiy
                </span>
                <input
                  type="checkbox"
                  checked={showAlexanderMarch}
                  onChange={e => setShowAlexanderMarch(e.target.checked)}
                  className="rounded text-purple-500 focus:ring-0"
                />
              </label>
            </div>

            {/* Marker Layers */}
            <div className="space-y-2 border-t border-white/5 pt-3">
              <div className="text-xs font-semibold text-slate-400">Obʼyekt Belgilari:</div>
              <label className="flex items-center justify-between text-xs text-blue-300 cursor-pointer p-1.5 rounded hover:bg-white/5">
                <span className="flex items-center gap-2">
                  <span>🏛️</span>
                  Qadimgi Shaharlar ({cities.length})
                </span>
                <input
                  type="checkbox"
                  checked={showCities}
                  onChange={e => setShowCities(e.target.checked)}
                  className="rounded text-blue-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-amber-300 cursor-pointer p-1.5 rounded hover:bg-white/5">
                <span className="flex items-center gap-2">
                  <span>🕌</span>
                  Meʼmoriy Obidalar ({monuments.length})
                </span>
                <input
                  type="checkbox"
                  checked={showMonuments}
                  onChange={e => setShowMonuments(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-red-300 cursor-pointer p-1.5 rounded hover:bg-white/5">
                <span className="flex items-center gap-2">
                  <span>⚔️</span>
                  Jang Maydonlari ({conflicts.length})
                </span>
                <input
                  type="checkbox"
                  checked={showConflicts}
                  onChange={e => setShowConflicts(e.target.checked)}
                  className="rounded text-red-500 focus:ring-0"
                />
              </label>
            </div>
          </div>

          {/* Feature Info Card (When a marker/route is clicked) */}
          {selectedFeature && (
            <div className="p-5 rounded-2xl bg-[#121622] border border-amber-500/40 shadow-xl space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10">
                  {selectedFeature.category}
                </span>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              {selectedFeature.imageUrl && (
                <div className="h-28 rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                  <img
                    src={selectedFeature.imageUrl}
                    alt={selectedFeature.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <h4 className="font-heading text-base font-bold text-white">
                {selectedFeature.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">
                {selectedFeature.snippet}
              </p>

              {selectedFeature.route && (
                <Link
                  to={selectedFeature.route}
                  className="block w-full text-center py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors"
                >
                  Toʻliq Maqolani Ochish →
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Leaflet Map Stage (Right Col) */}
        <div className="lg:col-span-3">
          <div className="relative h-[650px] w-full rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-[#090b10]">
            <div ref={mapContainerRef} className="w-full h-full z-10" />

            {/* Map Legend Overlay */}
            <div className="absolute bottom-4 left-4 z-20 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[11px] space-y-1.5 text-slate-300">
              <div className="font-bold text-amber-300 uppercase tracking-wider text-[10px] mb-1">
                Xarita Shartli Belgilari:
              </div>
              <div className="flex items-center gap-2">
                <span>🏛️</span>
                <span>Qadimgi va Tarixiy Shahar</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🕌</span>
                <span>Arxitektura Durdonasi</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⚔️</span>
                <span>Tarixiy Jang Maydoni</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
