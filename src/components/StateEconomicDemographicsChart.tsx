import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
  ComposedChart
} from 'recharts';
import {
  TrendingUp,
  Users,
  Coins,
  Shield,
  Layers,
  Sparkles,
  ArrowUpRight,
  Maximize2,
  PieChart as PieIcon,
  Compass
} from 'lucide-react';
import {
  CENTURY_TIMELINE_DATA,
  STATE_COMPARISON_PROFILES,
  CenturyDataPoint,
  StateComparisonProfile
} from '../data/historicalEconomicsData';

type MetricMode = 'demographics' | 'economics' | 'military' | 'territory';
type ActiveTab = 'century_timeline' | 'state_radar' | 'sector_distribution';

interface Props {
  initialStateId?: string;
  className?: string;
}

export const StateEconomicDemographicsChart: React.FC<Props> = ({
  initialStateId,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('century_timeline');
  const [metricMode, setMetricMode] = useState<MetricMode>('demographics');
  const [selectedStateId, setSelectedStateId] = useState<string>(
    initialStateId || 'temuriylar-saltanati'
  );
  const [hoveredDataPoint, setHoveredDataPoint] = useState<CenturyDataPoint | null>(null);

  const selectedProfile: StateComparisonProfile =
    STATE_COMPARISON_PROFILES.find(p => p.stateId === selectedStateId) ||
    STATE_COMPARISON_PROFILES[0];

  // Prepare Radar Data for all states comparison
  const radarMetricsData = [
    {
      metric: 'Harbiy Qudrat',
      Temuriylar: 98,
      Somoniylar: 82,
      Kushonlar: 88,
      fullMark: 100
    },
    {
      metric: 'Savdo & Diplomatiya',
      Temuriylar: 95,
      Somoniylar: 90,
      Kushonlar: 96,
      fullMark: 100
    },
    {
      metric: 'Ilm-Fan & Madaniyat',
      Temuriylar: 100,
      Somoniylar: 98,
      Kushonlar: 85,
      fullMark: 100
    },
    {
      metric: 'Shaharlashuv (Urban)',
      Temuriylar: 92,
      Somoniylar: 88,
      Kushonlar: 84,
      fullMark: 100
    },
    {
      metric: 'Hududiy Nazorat',
      Temuriylar: 94,
      Somoniylar: 84,
      Kushonlar: 90,
      fullMark: 100
    },
    {
      metric: 'Pul-Moliya Barqarorligi',
      Temuriylar: 96,
      Somoniylar: 94,
      Kushonlar: 98,
      fullMark: 100
    }
  ];

  // Custom Tooltip for Timeline
  const CustomTimelineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data: CenturyDataPoint = payload[0].payload;
      return (
        <div className="bg-[#0A0908]/95 border border-[#5E503F] p-4 rounded-xl shadow-2xl backdrop-blur-md max-w-xs text-xs space-y-2">
          <div className="border-b border-[#5E503F]/50 pb-1.5 flex items-center justify-between">
            <span className="font-heading font-bold text-[#EAE0D5] text-sm">
              {label}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C6AC8F]/20 text-[#C6AC8F] border border-[#C6AC8F]/30">
              {data.periodLabel}
            </span>
          </div>

          <p className="text-[11px] text-[#C6AC8F] font-semibold">
            🏛️ Yetakchi davlat: <span className="text-[#EAE0D5]">{data.majorState}</span>
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#5E503F]/30 text-[11px]">
            <div>
              <span className="text-[#EAE0D5]/60 block">Umumiy Aholi:</span>
              <span className="font-bold text-[#EAE0D5] font-mono">{data.totalPopulationMillions} mln kishi</span>
            </div>
            <div>
              <span className="text-[#EAE0D5]/60 block">Shahar Aholisi:</span>
              <span className="font-bold text-[#C6AC8F] font-mono">{data.urbanPopulationMillions} mln ({Math.round((data.urbanPopulationMillions / data.totalPopulationMillions) * 100)}%)</span>
            </div>
            <div>
              <span className="text-[#EAE0D5]/60 block">Yillik Soliq/Xazina:</span>
              <span className="font-bold text-emerald-300 font-mono">{data.treasuryRevenueGoldMillion} mln tilla</span>
            </div>
            <div>
              <span className="text-[#EAE0D5]/60 block">Qoʻshin Safarbarligi:</span>
              <span className="font-bold text-amber-200 font-mono">{data.standingArmyThousands} ming jangchi</span>
            </div>
          </div>

          <div className="pt-1 text-[10px] text-[#EAE0D5]/70 border-t border-[#5E503F]/30">
            <span className="font-medium text-[#C6AC8F]">Savdo markazi:</span> {data.keyEconomicCenter}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      id="states-economic-analytics-container"
      className={`rounded-3xl border border-[#5E503F]/60 bg-[#0A0908]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6 ${className}`}
    >
      {/* Analytics Module Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#5E503F]/40 pb-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6AC8F]/10 border border-[#C6AC8F]/30 text-[#C6AC8F] text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Tarixiy Demografiya va Iqtisodiy Dinamika</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#EAE0D5] flex items-center gap-2">
            <span>Asrlar Boʻylab Davlatlar Qudrati & Demografik Oʻsish</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#EAE0D5]/70 max-w-2xl">
            Turon va Oʻrta Osiyo davlatlarining iqtisodiy salohiyati, Ipak yoʻli savdo aylanmasi, shahar-qishloq aholisi hamda soliq tushumlarining dinamik qiyosiy tahlili.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#141210] rounded-2xl border border-[#5E503F]/50">
          <button
            id="tab-century-timeline-btn"
            onClick={() => setActiveTab('century_timeline')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'century_timeline'
                ? 'bg-[#C6AC8F] text-[#0A0908] shadow-md font-bold'
                : 'text-[#EAE0D5]/70 hover:text-[#EAE0D5] hover:bg-[#5E503F]/20'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Asrlar Xronologiyasi</span>
          </button>

          <button
            id="tab-state-radar-btn"
            onClick={() => setActiveTab('state_radar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'state_radar'
                ? 'bg-[#C6AC8F] text-[#0A0908] shadow-md font-bold'
                : 'text-[#EAE0D5]/70 hover:text-[#EAE0D5] hover:bg-[#5E503F]/20'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Qudrat Radari (6 Mezon)</span>
          </button>

          <button
            id="tab-sector-distribution-btn"
            onClick={() => setActiveTab('sector_distribution')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'sector_distribution'
                ? 'bg-[#C6AC8F] text-[#0A0908] shadow-md font-bold'
                : 'text-[#EAE0D5]/70 hover:text-[#EAE0D5] hover:bg-[#5E503F]/20'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>Iqtisodiyot Tarmoqlari</span>
          </button>
        </div>
      </div>

      {/* KPI Highlights Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#141210]/90 border border-[#5E503F]/40 space-y-1">
          <div className="flex items-center justify-between text-[#EAE0D5]/60 text-xs">
            <span>Maksimal Aholi (XV asr)</span>
            <Users className="w-4 h-4 text-[#C6AC8F]" />
          </div>
          <p className="font-heading text-xl sm:text-2xl font-bold text-[#EAE0D5]">16.8 mln</p>
          <p className="text-[10px] text-[#C6AC8F]">Temuriylar Oltin Davrida</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#141210]/90 border border-[#5E503F]/40 space-y-1">
          <div className="flex items-center justify-between text-[#EAE0D5]/60 text-xs">
            <span>Yillik Xazina Oqimi</span>
            <Coins className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-heading text-xl sm:text-2xl font-bold text-emerald-300">14.5M Tilla</p>
          <p className="text-[10px] text-emerald-400/80">Dinor & Kumush Tangʻa</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#141210]/90 border border-[#5E503F]/40 space-y-1">
          <div className="flex items-center justify-between text-[#EAE0D5]/60 text-xs">
            <span>Eng Yirik Doimiy Qoʻshin</span>
            <Shield className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-heading text-xl sm:text-2xl font-bold text-amber-200">250,000</p>
          <p className="text-[10px] text-amber-300/80">Saralangan Jangchilar</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#141210]/90 border border-[#5E503F]/40 space-y-1">
          <div className="flex items-center justify-between text-[#EAE0D5]/60 text-xs">
            <span>Ipak Yoʻli Tranzit Indeksi</span>
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          <p className="font-heading text-xl sm:text-2xl font-bold text-blue-300">98 / 100</p>
          <p className="text-[10px] text-blue-300/80">Global Savdo Nazorati</p>
        </div>
      </div>

      {/* VIEW 1: Century Timeline (Area / Composed Charts) */}
      {activeTab === 'century_timeline' && (
        <div className="space-y-4">
          {/* Sub-Metric Selectors */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#141210] p-3 rounded-2xl border border-[#5E503F]/30">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#EAE0D5]/70 font-semibold hidden sm:inline">Koʻrsatkich:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  id="metric-demographics-btn"
                  onClick={() => setMetricMode('demographics')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    metricMode === 'demographics'
                      ? 'bg-[#C6AC8F] text-[#0A0908] font-bold'
                      : 'bg-[#0A0908] text-[#EAE0D5]/70 hover:text-[#EAE0D5] border border-[#5E503F]/30'
                  }`}
                >
                  👥 Aholi & Shaharlashuv (Mln)
                </button>
                <button
                  id="metric-economics-btn"
                  onClick={() => setMetricMode('economics')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    metricMode === 'economics'
                      ? 'bg-[#C6AC8F] text-[#0A0908] font-bold'
                      : 'bg-[#0A0908] text-[#EAE0D5]/70 hover:text-[#EAE0D5] border border-[#5E503F]/30'
                  }`}
                >
                  💰 Xazina & Savdo Indeksi
                </button>
                <button
                  id="metric-military-btn"
                  onClick={() => setMetricMode('military')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    metricMode === 'military'
                      ? 'bg-[#C6AC8F] text-[#0A0908] font-bold'
                      : 'bg-[#0A0908] text-[#EAE0D5]/70 hover:text-[#EAE0D5] border border-[#5E503F]/30'
                  }`}
                >
                  ⚔️ Qoʻshin & Safarbarlik (Ming)
                </button>
                <button
                  id="metric-territory-btn"
                  onClick={() => setMetricMode('territory')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    metricMode === 'territory'
                      ? 'bg-[#C6AC8F] text-[#0A0908] font-bold'
                      : 'bg-[#0A0908] text-[#EAE0D5]/70 hover:text-[#EAE0D5] border border-[#5E503F]/30'
                  }`}
                >
                  🗺️ Hudud Nazorati (Mln km²)
                </button>
              </div>
            </div>

            <div className="text-[11px] text-[#C6AC8F] font-mono hidden md:block">
              * Arxeologik va akademik manbalar asosida (m.avv. IV – XIX asr)
            </div>
          </div>

          {/* Recharts Main Canvas */}
          <div className="h-[360px] sm:h-[420px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              {metricMode === 'demographics' ? (
                <AreaChart
                  data={CENTURY_TIMELINE_DATA}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="totalPopGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C6AC8F" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#C6AC8F" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="urbanPopGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="ruralPopGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5E503F" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#5E503F" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#5E503F" opacity={0.25} />
                  <XAxis
                    dataKey="century"
                    stroke="#EAE0D5"
                    opacity={0.7}
                    tick={{ fill: '#EAE0D5', fontSize: 11 }}
                    angle={-15}
                    textAnchor="end"
                    height={45}
                  />
                  <YAxis
                    stroke="#EAE0D5"
                    opacity={0.7}
                    tick={{ fill: '#EAE0D5', fontSize: 11 }}
                    unit=" mln"
                  />
                  <Tooltip content={<CustomTimelineTooltip />} />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ fontSize: '12px', color: '#EAE0D5' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="totalPopulationMillions"
                    name="Umumiy Aholi (Mln)"
                    stroke="#C6AC8F"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#totalPopGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="urbanPopulationMillions"
                    name="Shahar Aholisi (Mln)"
                    stroke="#10B981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#urbanPopGradient)"
                  />
                </AreaChart>
              ) : metricMode === 'economics' ? (
                <ComposedChart
                  data={CENTURY_TIMELINE_DATA}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#5E503F" opacity={0.25} />
                  <XAxis
                    dataKey="century"
                    stroke="#EAE0D5"
                    opacity={0.7}
                    tick={{ fill: '#EAE0D5', fontSize: 11 }}
                    angle={-15}
                    textAnchor="end"
                    height={45}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="#10B981"
                    tick={{ fill: '#10B981', fontSize: 11 }}
                    unit="M tilla"
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#C6AC8F"
                    tick={{ fill: '#C6AC8F', fontSize: 11 }}
                    unit=" ball"
                  />
                  <Tooltip content={<CustomTimelineTooltip />} />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ fontSize: '12px', color: '#EAE0D5' }}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="treasuryRevenueGoldMillion"
                    name="Xazina Tushumlari (Mln Tilla Dinor)"
                    fill="#10B981"
                    radius={[6, 6, 0, 0]}
                    barSize={28}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="silkRoadTradeIndex"
                    name="Ipak Yoʻli Savdo Indeksi (0-100)"
                    stroke="#C6AC8F"
                    strokeWidth={3}
                    dot={{ fill: '#C6AC8F', r: 5, strokeWidth: 2, stroke: '#0A0908' }}
                    activeDot={{ r: 8 }}
                  />
                </ComposedChart>
              ) : metricMode === 'military' ? (
                <BarChart
                  data={CENTURY_TIMELINE_DATA}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="armyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#B45309" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#5E503F" opacity={0.25} />
                  <XAxis
                    dataKey="century"
                    stroke="#EAE0D5"
                    opacity={0.7}
                    tick={{ fill: '#EAE0D5', fontSize: 11 }}
                    angle={-15}
                    textAnchor="end"
                    height={45}
                  />
                  <YAxis
                    stroke="#EAE0D5"
                    opacity={0.7}
                    tick={{ fill: '#EAE0D5', fontSize: 11 }}
                    unit=" ming"
                  />
                  <Tooltip content={<CustomTimelineTooltip />} />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ fontSize: '12px', color: '#EAE0D5' }}
                  />
                  <Bar
                    dataKey="standingArmyThousands"
                    name="Safarbar Qoʻshin Soni (Ming kishi)"
                    fill="url(#armyGradient)"
                    radius={[8, 8, 0, 0]}
                    barSize={32}
                  />
                </BarChart>
              ) : (
                <AreaChart
                  data={CENTURY_TIMELINE_DATA}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="territoryGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#5E503F" opacity={0.25} />
                  <XAxis
                    dataKey="century"
                    stroke="#EAE0D5"
                    opacity={0.7}
                    tick={{ fill: '#EAE0D5', fontSize: 11 }}
                    angle={-15}
                    textAnchor="end"
                    height={45}
                  />
                  <YAxis
                    stroke="#EAE0D5"
                    opacity={0.7}
                    tick={{ fill: '#EAE0D5', fontSize: 11 }}
                    unit="M km²"
                  />
                  <Tooltip content={<CustomTimelineTooltip />} />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ fontSize: '12px', color: '#EAE0D5' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="territoryControlledMillionKm2"
                    name="Nazorat Ostidagi Hudud (Mln km²)"
                    stroke="#3B82F6"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#territoryGradient)"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* VIEW 2: State Power Radar (6-Axis Comparison) */}
      {activeTab === 'state_radar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarMetricsData}>
                <PolarGrid stroke="#5E503F" opacity={0.4} />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: '#EAE0D5', fontSize: 11, fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: '#EAE0D5', fontSize: 10 }}
                  stroke="#5E503F"
                />
                <Radar
                  name="Temuriylar Saltanati"
                  dataKey="Temuriylar"
                  stroke="#C6AC8F"
                  fill="#C6AC8F"
                  fillOpacity={0.4}
                  strokeWidth={2}
                />
                <Radar
                  name="Somoniylar Davlati"
                  dataKey="Somoniylar"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="Kushon Imperiyasi"
                  dataKey="Kushonlar"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <Legend
                  wrapperStyle={{ fontSize: '12px', color: '#EAE0D5', paddingTop: '10px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A0908',
                    borderColor: '#5E503F',
                    borderRadius: '12px',
                    color: '#EAE0D5',
                    fontSize: '12px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Analysis Explanations */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-heading text-lg font-bold text-[#EAE0D5] flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#C6AC8F]" />
              Qiyosiy Qudrat Xarakteristikasi
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#141210] border border-[#C6AC8F]/40 space-y-1">
                <div className="flex items-center justify-between font-bold text-[#C6AC8F]">
                  <span>Temuriylar Saltanati (XV asr)</span>
                  <span className="font-mono">98/100 Qudrat</span>
                </div>
                <p className="text-[#EAE0D5]/80 leading-relaxed">
                  Harbiy qudrat, xalqaro savdo diplomatiyasi va fan-madaniyat rivojida (Ulugʻbek, Navoiy) mintaqa tarixidagi eng yuqori integral koʻrsatkichga erishgan.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141210] border border-emerald-500/40 space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-300">
                  <span>Somoniylar Davlati (X asr)</span>
                  <span className="font-mono">92/100 Qudrat</span>
                </div>
                <p className="text-[#EAE0D5]/80 leading-relaxed">
                  Movarounnahrda pul-kredit tizimi (Ismoiliy kumush dirhamlari) va 10 ta markaziy vazirlik devonlari orqali boshqaruvda benuqson intizom oʻrnatgan.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141210] border border-blue-500/40 space-y-1">
                <div className="flex items-center justify-between font-bold text-blue-300">
                  <span>Kushon Imperiyasi (II asr)</span>
                  <span className="font-mono">91/100 Qudrat</span>
                </div>
                <p className="text-[#EAE0D5]/80 leading-relaxed">
                  Rim va Xitoy oʻrtasidagi Ipak yoʻli xalqaro oltin standarti va koʻp madaniyatli ellin-hind-baqtriya sivilizatsiyasini barpo etgan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Sector Distribution (Pie / Donut + Sector Breakdown) */}
      {activeTab === 'sector_distribution' && (
        <div className="space-y-6">
          {/* Select State for Sector Analysis */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#141210] p-3 rounded-2xl border border-[#5E503F]/30">
            <span className="text-xs text-[#EAE0D5]/70 font-semibold">
              Tahlil qilinayotgan davlat:
            </span>
            <div className="flex flex-wrap gap-2">
              {STATE_COMPARISON_PROFILES.map(profile => (
                <button
                  key={profile.stateId}
                  id={`select-profile-${profile.stateId}-btn`}
                  onClick={() => setSelectedStateId(profile.stateId)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedStateId === profile.stateId
                      ? 'bg-[#C6AC8F] text-[#0A0908] font-bold shadow-md'
                      : 'bg-[#0A0908] text-[#EAE0D5]/70 hover:text-[#EAE0D5] border border-[#5E503F]/30'
                  }`}
                >
                  {profile.stateName}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Pie Chart */}
            <div className="lg:col-span-6 h-[320px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={selectedProfile.sectors}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={115}
                    paddingAngle={4}
                    dataKey="percentage"
                    label={({ name, percentage }) => `${percentage}%`}
                  >
                    {selectedProfile.sectors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#0A0908" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: number) => [`${val}%`, 'Ulush']}
                    contentStyle={{
                      backgroundColor: '#0A0908',
                      borderColor: '#5E503F',
                      borderRadius: '12px',
                      color: '#EAE0D5',
                      fontSize: '12px'
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', color: '#EAE0D5' }}
                    layout="horizontal"
                    verticalAlign="bottom"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Sectors Breakdown */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between border-b border-[#5E503F]/30 pb-2">
                <h4 className="font-heading text-sm font-bold text-[#EAE0D5] uppercase tracking-wider">
                  {selectedProfile.stateName} Xazina Daromad Manbalari
                </h4>
                <span className="text-xs font-mono text-[#C6AC8F]">
                  Poytaxt: {selectedProfile.capital}
                </span>
              </div>

              <div className="space-y-2.5">
                {selectedProfile.sectors.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#141210] border border-[#5E503F]/30 flex items-start gap-3"
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full mt-0.5 flex-shrink-0"
                      style={{ backgroundColor: sec.color }}
                    />
                    <div className="space-y-0.5 flex-1 text-xs">
                      <div className="flex items-center justify-between font-bold text-[#EAE0D5]">
                        <span>{sec.name}</span>
                        <span className="font-mono text-[#C6AC8F]">
                          {sec.percentage}% (~{sec.annualValueEstimateMillion}M tilla)
                        </span>
                      </div>
                      <p className="text-[11px] text-[#EAE0D5]/70 leading-relaxed">
                        {sec.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
