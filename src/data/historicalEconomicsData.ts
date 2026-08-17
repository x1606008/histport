import { StateEconomicMetric, StatePowerRadar } from '../types';

export interface CenturyDataPoint {
  century: string;
  yearApprox: number;
  periodLabel: string;
  majorState: string;
  totalPopulationMillions: number;
  urbanPopulationMillions: number;
  ruralPopulationMillions: number;
  silkRoadTradeIndex: number; // 0 - 100
  treasuryRevenueGoldMillion: number; // million gold dinor/mithqal equivalent
  standingArmyThousands: number;
  territoryControlledMillionKm2: number;
  keyEconomicCenter: string;
  monetaryStandard: string;
}

export interface SectorDistribution {
  name: string;
  percentage: number;
  annualValueEstimateMillion: number;
  color: string;
  description: string;
}

export interface StateComparisonProfile {
  stateId: string;
  stateName: string;
  era: string;
  dynasty: string;
  peakYear: number;
  capital: string;
  color: string;
  populationAtPeakMillion: number;
  armyAtPeakThousands: number;
  territoryAtPeakMillionKm2: number;
  tradeVolumeIndex: number;
  radar: StatePowerRadar;
  timelineMetrics: StateEconomicMetric[];
  sectors: SectorDistribution[];
}

/** Century-by-Century Economic & Demographics Timeline */
export const CENTURY_TIMELINE_DATA: CenturyDataPoint[] = [
  {
    century: 'm.avv. IV asr',
    yearApprox: -330,
    periodLabel: 'Ahamoniylar & Ellin davri',
    majorState: 'Qadimgi Soʻgʻdiyona & Baqtriya',
    totalPopulationMillions: 2.8,
    urbanPopulationMillions: 0.45,
    ruralPopulationMillions: 2.35,
    silkRoadTradeIndex: 35,
    treasuryRevenueGoldMillion: 1.2,
    standingArmyThousands: 40,
    territoryControlledMillionKm2: 0.8,
    keyEconomicCenter: 'Marokanda, Baqtra',
    monetaryStandard: 'Kumush draxma & Doriq oltini'
  },
  {
    century: 'm.avv. I asr',
    yearApprox: -50,
    periodLabel: 'Yunon-Baqtriya & Qangʻ davlati',
    majorState: 'Qangʻ davlati & Parfiya',
    totalPopulationMillions: 4.2,
    urbanPopulationMillions: 0.85,
    ruralPopulationMillions: 3.35,
    silkRoadTradeIndex: 58,
    treasuryRevenueGoldMillion: 2.4,
    standingArmyThousands: 75,
    territoryControlledMillionKm2: 1.4,
    keyEconomicCenter: 'Qangʻdex, Binkat',
    monetaryStandard: 'Ellincha kumush tetradraxmalar'
  },
  {
    century: 'II asr (milodiy)',
    yearApprox: 150,
    periodLabel: 'Kushon Imperiyasi Oltin Asri',
    majorState: 'Kushon Imperiyasi',
    totalPopulationMillions: 11.5,
    urbanPopulationMillions: 2.6,
    ruralPopulationMillions: 8.9,
    silkRoadTradeIndex: 92,
    treasuryRevenueGoldMillion: 6.8,
    standingArmyThousands: 120,
    territoryControlledMillionKm2: 3.2,
    keyEconomicCenter: 'Baqtra, Dalvarzintepa, Peshovar',
    monetaryStandard: 'Kanishka I oltin dinorlari (8.4 gr)'
  },
  {
    century: 'VI asr',
    yearApprox: 580,
    periodLabel: 'Turk Hoqonligi & Soʻgʻd ixshidliklari',
    majorState: 'Buyuk Turk Hoqonligi',
    totalPopulationMillions: 6.5,
    urbanPopulationMillions: 1.4,
    ruralPopulationMillions: 5.1,
    silkRoadTradeIndex: 84,
    treasuryRevenueGoldMillion: 4.5,
    standingArmyThousands: 150,
    territoryControlledMillionKm2: 6.0,
    keyEconomicCenter: 'Suyob, Samarqand, Poykand',
    monetaryStandard: 'Soʻgʻd kvadrat teshikli bronza & Oltin tangalar'
  },
  {
    century: 'X asr',
    yearApprox: 950,
    periodLabel: 'Somoniylar & Musulmon Renessansi',
    majorState: 'Somoniylar Davlati',
    totalPopulationMillions: 8.4,
    urbanPopulationMillions: 2.3,
    ruralPopulationMillions: 6.1,
    silkRoadTradeIndex: 90,
    treasuryRevenueGoldMillion: 5.9,
    standingArmyThousands: 85,
    territoryControlledMillionKm2: 2.5,
    keyEconomicCenter: 'Buxoro, Samarqand, Marv',
    monetaryStandard: 'Somoniy kumush dirhamlari & Oltin dinorlar'
  },
  {
    century: 'XII asr',
    yearApprox: 1180,
    periodLabel: 'Qoraxoniylar & Saljuqiylar davri',
    majorState: 'Buyuk Saljuqiylar & Qoraxoniylar',
    totalPopulationMillions: 9.8,
    urbanPopulationMillions: 2.5,
    ruralPopulationMillions: 7.3,
    silkRoadTradeIndex: 78,
    treasuryRevenueGoldMillion: 5.2,
    standingArmyThousands: 110,
    territoryControlledMillionKm2: 3.8,
    keyEconomicCenter: 'Bolosogʻun, Oʻzgan, Marv',
    monetaryStandard: 'Saljuqiy tilla dinori'
  },
  {
    century: 'XIII asr boshi',
    yearApprox: 1215,
    periodLabel: 'Xorazmshohlar qudrati choʻqqisi',
    majorState: 'Anushteginiylar Xorazmshohlari',
    totalPopulationMillions: 12.2,
    urbanPopulationMillions: 2.9,
    ruralPopulationMillions: 9.3,
    silkRoadTradeIndex: 88,
    treasuryRevenueGoldMillion: 7.5,
    standingArmyThousands: 200,
    territoryControlledMillionKm2: 4.9,
    keyEconomicCenter: 'Koʻhna Urganch (Gurganj), Samarqand',
    monetaryStandard: 'Oltin dinor va kumush dirhamlar'
  },
  {
    century: 'XV asr',
    yearApprox: 1440,
    periodLabel: 'Temuriylar Uygʻonish Davri',
    majorState: 'Temuriylar Saltanati',
    totalPopulationMillions: 16.8,
    urbanPopulationMillions: 4.6,
    ruralPopulationMillions: 12.2,
    silkRoadTradeIndex: 98,
    treasuryRevenueGoldMillion: 14.5,
    standingArmyThousands: 250,
    territoryControlledMillionKm2: 5.5,
    keyEconomicCenter: 'Samarqand, Hirot, Buxoro, Tabriz',
    monetaryStandard: 'Temuriy kumush tangʻa va Oltin dinor'
  },
  {
    century: 'XVII asr',
    yearApprox: 1650,
    periodLabel: 'Ashtarxoniylar & Buxoro Xonligi',
    majorState: 'Buxoro Xonligi (Ashtarxoniylar)',
    totalPopulationMillions: 5.4,
    urbanPopulationMillions: 1.1,
    ruralPopulationMillions: 4.3,
    silkRoadTradeIndex: 45,
    treasuryRevenueGoldMillion: 2.8,
    standingArmyThousands: 60,
    territoryControlledMillionKm2: 1.2,
    keyEconomicCenter: 'Buxoro, Samarqand, Balx',
    monetaryStandard: 'Buxoro kumush tangasi va tillasi'
  },
  {
    century: 'XIX asr',
    yearApprox: 1850,
    periodLabel: 'Uch Xonlik davri',
    majorState: 'Buxoro Amirligi, Qoʻqon & Xiva xonliklari',
    totalPopulationMillions: 6.8,
    urbanPopulationMillions: 1.35,
    ruralPopulationMillions: 5.45,
    silkRoadTradeIndex: 38,
    treasuryRevenueGoldMillion: 3.4,
    standingArmyThousands: 70,
    territoryControlledMillionKm2: 1.6,
    keyEconomicCenter: 'Qoʻqon, Buxoro, Xiva, Toshkent',
    monetaryStandard: 'Tilla, kumush tanga va miri'
  }
];

/** State Profiles for Deep Dive & Comparison */
export const STATE_COMPARISON_PROFILES: StateComparisonProfile[] = [
  {
    stateId: 'temuriylar-saltanati',
    stateName: 'Temuriylar Saltanati',
    era: "O'rta asrlar (Sharq Uyg'onishi)",
    dynasty: 'Temuriylar (Gurkaniya)',
    peakYear: 1405,
    capital: 'Samarqand & Hirot',
    color: '#C6AC8F',
    populationAtPeakMillion: 16.8,
    armyAtPeakThousands: 250,
    territoryAtPeakMillionKm2: 5.5,
    tradeVolumeIndex: 98,
    radar: {
      militaryPower: 98,
      tradeDiplomacy: 95,
      scienceCulture: 100,
      urbanization: 92,
      territorialControl: 94,
      monetaryStability: 96
    },
    timelineMetrics: [
      {
        year: 1370,
        yearLabel: '1370 (Taxtga oʻtirish)',
        populationMillions: 4.5,
        urbanPopulationPercent: 18,
        tradeVolumeGoldCoinsMillion: 3.2,
        annualTaxRevenueMillion: 2.8,
        standingArmyThousands: 80,
        territoryMillionKm2: 1.1,
        agricultureIndex: 65,
        craftsmanshipIndex: 68,
        notableEvent: 'Amir Temurning Movarounnahrda hokimiyat tepasiga kelishi'
      },
      {
        year: 1395,
        yearLabel: '1395 (Toʻxtamish ustidan gʻalaba)',
        populationMillions: 9.8,
        urbanPopulationPercent: 22,
        tradeVolumeGoldCoinsMillion: 7.8,
        annualTaxRevenueMillion: 6.9,
        standingArmyThousands: 180,
        territoryMillionKm2: 3.4,
        agricultureIndex: 78,
        craftsmanshipIndex: 82,
        notableEvent: 'Terek jangi va Ipak yoʻli shimoliy tarmogʻining Samarqandga burilishi'
      },
      {
        year: 1405,
        yearLabel: '1405 (Temur saltanati choʻqqisi)',
        populationMillions: 16.8,
        urbanPopulationPercent: 27,
        tradeVolumeGoldCoinsMillion: 14.5,
        annualTaxRevenueMillion: 12.8,
        standingArmyThousands: 250,
        territoryMillionKm2: 5.5,
        agricultureIndex: 90,
        craftsmanshipIndex: 95,
        notableEvent: 'Hindistondan Oʻrtayer dengizigacha yagona iqtisodiy makon'
      },
      {
        year: 1449,
        yearLabel: '1449 (Mirzo Ulugʻbek davri)',
        populationMillions: 15.2,
        urbanPopulationPercent: 28,
        tradeVolumeGoldCoinsMillion: 13.1,
        annualTaxRevenueMillion: 11.2,
        standingArmyThousands: 140,
        territoryMillionKm2: 4.1,
        agricultureIndex: 92,
        craftsmanshipIndex: 98,
        notableEvent: 'Rasadxona, madrasalar va fanning mislsiz taraqqiyoti'
      },
      {
        year: 1495,
        yearLabel: '1495 (Husayn Boyqaro & Navoiy)',
        populationMillions: 11.5,
        urbanPopulationPercent: 26,
        tradeVolumeGoldCoinsMillion: 9.4,
        annualTaxRevenueMillion: 8.1,
        standingArmyThousands: 90,
        territoryMillionKm2: 2.8,
        agricultureIndex: 85,
        craftsmanshipIndex: 96,
        notableEvent: 'Hirotda adabiyot, sanʼat va miniatyura oltin davri'
      }
    ],
    sectors: [
      {
        name: 'Ipak Yoʻli Tranzit Bojlari & Karvon Savdosi',
        percentage: 38,
        annualValueEstimateMillion: 5.5,
        color: '#C6AC8F',
        description: 'Xitoy, Hindiston, Yaqin Sharq va Yevropani bogʻlovchi savdo bojlari'
      },
      {
        name: 'Sugʻorma Ziroatchilik & Bogʻdorchilik',
        percentage: 30,
        annualValueEstimateMillion: 4.35,
        color: '#5E503F',
        description: 'Zarafshon, Amudaryo va Murgʻob boʻylaridagi kanallar va paxtachilik'
      },
      {
        name: 'Hunarmandchilik, Toʻqimachilik & Samarqand Qogʻozi',
        percentage: 20,
        annualValueEstimateMillion: 2.9,
        color: '#8A7968',
        description: 'Ipak gazlamalar, mashhur Samarqand qogʻozi va qurolsozlik ustaxonalari'
      },
      {
        name: 'Konchilik, Qimmatbaho Toshlar & Metallurgiya',
        percentage: 12,
        annualValueEstimateMillion: 1.75,
        color: '#A89F91',
        description: 'Badaxshon laʼli, Feruza, kumush va temir konlari'
      }
    ]
  },
  {
    stateId: 'somoniylar-davlati',
    stateName: 'Somoniylar Davlati',
    era: "Ilk O'rta asrlar (Musulmon Renessansi)",
    dynasty: 'Somoniylar',
    peakYear: 950,
    capital: 'Buxoro',
    color: '#10B981',
    populationAtPeakMillion: 8.4,
    armyAtPeakThousands: 85,
    territoryAtPeakMillionKm2: 2.5,
    tradeVolumeIndex: 90,
    radar: {
      militaryPower: 82,
      tradeDiplomacy: 90,
      scienceCulture: 98,
      urbanization: 88,
      territorialControl: 84,
      monetaryStability: 94
    },
    timelineMetrics: [
      {
        year: 875,
        yearLabel: '875 (Yorliq olinishi)',
        populationMillions: 4.2,
        urbanPopulationPercent: 19,
        tradeVolumeGoldCoinsMillion: 2.1,
        annualTaxRevenueMillion: 1.9,
        standingArmyThousands: 35,
        territoryMillionKm2: 0.9,
        agricultureIndex: 70,
        craftsmanshipIndex: 72,
        notableEvent: 'Xalifalikdan mustaqillik va Samarqand hokimiyati'
      },
      {
        year: 892,
        yearLabel: '892 (Ismoil Somoniy birlashtiruvi)',
        populationMillions: 6.5,
        urbanPopulationPercent: 23,
        tradeVolumeGoldCoinsMillion: 4.2,
        annualTaxRevenueMillion: 3.8,
        standingArmyThousands: 65,
        territoryMillionKm2: 1.8,
        agricultureIndex: 82,
        craftsmanshipIndex: 85,
        notableEvent: 'Buxoro poytaxt etilib, yagona markazlashgan davlat tuzildi'
      },
      {
        year: 950,
        yearLabel: '950 (Nasr II davri choʻqqisi)',
        populationMillions: 8.4,
        urbanPopulationPercent: 27,
        tradeVolumeGoldCoinsMillion: 5.9,
        annualTaxRevenueMillion: 5.1,
        standingArmyThousands: 85,
        territoryMillionKm2: 2.5,
        agricultureIndex: 88,
        craftsmanshipIndex: 92,
        notableEvent: 'Ibn Sino, Rudakiy va Forobiy ijodi; 10 markaziy devon tizimi'
      },
      {
        year: 999,
        yearLabel: '999 (Inqiroz davri)',
        populationMillions: 7.1,
        urbanPopulationPercent: 24,
        tradeVolumeGoldCoinsMillion: 3.4,
        annualTaxRevenueMillion: 2.6,
        standingArmyThousands: 45,
        territoryMillionKm2: 1.2,
        agricultureIndex: 74,
        craftsmanshipIndex: 76,
        notableEvent: 'Qoraxoniylar va Gʻaznaviylar tomonidan davlat boʻlib olinishi'
      }
    ],
    sectors: [
      {
        name: 'Kumush Dirham Zarbxonasi & Xalqaro Savdo',
        percentage: 34,
        annualValueEstimateMillion: 2.0,
        color: '#10B981',
        description: 'Vikinglar yurtigacha yetib borgan mashhur Ismoiliy dirhamlari'
      },
      {
        name: 'Zarafshon va Amudaryo Dehqonchiligi',
        percentage: 35,
        annualValueEstimateMillion: 2.06,
        color: '#059669',
        description: 'Bugʻdoy, paxta, mevalar va qadimiy sugʻorish tarmoqlari'
      },
      {
        name: 'Toʻqimachilik, Ipakchilik & Zandaniy Gazlamalari',
        percentage: 21,
        annualValueEstimateMillion: 1.24,
        color: '#047857',
        description: 'Butun xalifalikda mashhur boʻlgan Buxoro zandoniy matolari'
      },
      {
        name: 'Chorvachilik & Qorakoʻl Teri Oshlash',
        percentage: 10,
        annualValueEstimateMillion: 0.6,
        color: '#065F46',
        description: 'Sahro va togʻ oldi qabilalari bilan ipak va teri ayirboshlash'
      }
    ]
  },
  {
    stateId: 'kushon-imperiyasi',
    stateName: 'Kushon Imperiyasi',
    era: 'Antik davr',
    dynasty: 'Kushonlar (Yuechji)',
    peakYear: 150,
    capital: 'Baqtra & Purushapura (Peshovar)',
    color: '#3B82F6',
    populationAtPeakMillion: 11.5,
    armyAtPeakThousands: 120,
    territoryAtPeakMillionKm2: 3.2,
    tradeVolumeIndex: 92,
    radar: {
      militaryPower: 88,
      tradeDiplomacy: 96,
      scienceCulture: 85,
      urbanization: 84,
      territorialControl: 90,
      monetaryStability: 98
    },
    timelineMetrics: [
      {
        year: 30,
        yearLabel: '30 (Kujula Kadfiz davri)',
        populationMillions: 3.8,
        urbanPopulationPercent: 16,
        tradeVolumeGoldCoinsMillion: 1.8,
        annualTaxRevenueMillion: 1.4,
        standingArmyThousands: 45,
        territoryMillionKm2: 0.7,
        agricultureIndex: 64,
        craftsmanshipIndex: 66,
        notableEvent: 'Besh beklikning yagona Kushon davlatiga birlashtirilishi'
      },
      {
        year: 90,
        yearLabel: '90 (Vima Kadfiz oltin islohoti)',
        populationMillions: 7.2,
        urbanPopulationPercent: 20,
        tradeVolumeGoldCoinsMillion: 4.1,
        annualTaxRevenueMillion: 3.6,
        standingArmyThousands: 80,
        territoryMillionKm2: 1.9,
        agricultureIndex: 78,
        craftsmanshipIndex: 80,
        notableEvent: 'Rim imperiyasi bilan tenglashgan oltin tangalar zarb etilishi'
      },
      {
        year: 150,
        yearLabel: '150 (Kanishka I Oltin Asri)',
        populationMillions: 11.5,
        urbanPopulationPercent: 24,
        tradeVolumeGoldCoinsMillion: 6.8,
        annualTaxRevenueMillion: 5.9,
        standingArmyThousands: 120,
        territoryMillionKm2: 3.2,
        agricultureIndex: 86,
        craftsmanshipIndex: 90,
        notableEvent: 'Gandxara sanʼati, quruqlik va dengiz Ipak yoʻli nazorati'
      },
      {
        year: 250,
        yearLabel: '250 (Inqiroz boshlanishi)',
        populationMillions: 6.9,
        urbanPopulationPercent: 18,
        tradeVolumeGoldCoinsMillion: 2.9,
        annualTaxRevenueMillion: 2.3,
        standingArmyThousands: 55,
        territoryMillionKm2: 1.4,
        agricultureIndex: 68,
        craftsmanshipIndex: 70,
        notableEvent: 'Sosoniylar va koʻchmanchilar zarbasi ostida parchalanish'
      }
    ],
    sectors: [
      {
        name: 'Buyuk Ipak Yoʻli Bojlari & Rim Savdosi',
        percentage: 42,
        annualValueEstimateMillion: 2.85,
        color: '#3B82F6',
        description: 'Rim, Xitoy va Hindiston oʻrtasidagi tranzit oltin toshlari'
      },
      {
        name: 'Baqtriya Sugʻorish Tizimlari & Bogʻlar',
        percentage: 28,
        annualValueEstimateMillion: 1.9,
        color: '#2563EB',
        description: 'Surxondaryo va Amudaryo boʻylaridagi yirik kanallar tarmogʻi'
      },
      {
        name: 'Haykaltaroshlik, Kulolchilik & Zargarlik',
        percentage: 18,
        annualValueEstimateMillion: 1.22,
        color: '#1D4ED8',
        description: 'Dalvarzintepa oltin xazinalari va Gandxara uslubidagi haykallar'
      },
      {
        name: 'Togʻ Konchilik & Zangori Feruza',
        percentage: 12,
        annualValueEstimateMillion: 0.81,
        color: '#1E40AF',
        description: 'Hindukush va Pomir konlaridan qazib olingan minerallar'
      }
    ]
  }
];
