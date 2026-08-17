import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  HistoricalPerson,
  HistoricalState,
  HistoricalCity,
  HistoricalConflict,
  HistoricalTreaty,
  HistoricalMonument,
  TimelineEvent,
  MapRouteLayer,
  EditProposal
} from '../types';
import {
  HISTORICAL_PERSONS,
  HISTORICAL_STATES,
  HISTORICAL_CITIES,
  HISTORICAL_CONFLICTS,
  HISTORICAL_TREATIES,
  HISTORICAL_MONUMENTS,
  TIMELINE_EVENTS,
  MAP_ROUTES,
  INITIAL_PROPOSALS
} from '../data/historicalData';

interface SearchResult {
  id: string;
  title: string;
  category: 'person' | 'state' | 'city' | 'conflict' | 'treaty' | 'monument';
  categoryLabel: string;
  route: string;
  yearDisplay: string;
  snippet: string;
  heroImage: string;
}

interface HistoricalDataContextType {
  persons: HistoricalPerson[];
  states: HistoricalState[];
  cities: HistoricalCity[];
  conflicts: HistoricalConflict[];
  treaties: HistoricalTreaty[];
  monuments: HistoricalMonument[];
  timelineEvents: TimelineEvent[];
  mapRoutes: MapRouteLayer[];
  proposals: EditProposal[];
  submitProposal: (proposal: Omit<EditProposal, 'id' | 'submittedAt' | 'status'>) => void;
  approveProposal: (proposalId: string) => void;
  rejectProposal: (proposalId: string, reason?: string) => void;
  addNewPerson: (person: HistoricalPerson) => void;
  addNewMonument: (monument: HistoricalMonument) => void;
  searchGlobal: (query: string) => SearchResult[];
}

const HistoricalDataContext = createContext<HistoricalDataContextType | undefined>(undefined);

export const HistoricalDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [persons, setPersons] = useState<HistoricalPerson[]>(() => {
    const saved = localStorage.getItem('turon_persons');
    return saved ? JSON.parse(saved) : HISTORICAL_PERSONS;
  });

  const [states, setStates] = useState<HistoricalState[]>(() => {
    const saved = localStorage.getItem('turon_states');
    return saved ? JSON.parse(saved) : HISTORICAL_STATES;
  });

  const [cities, setCities] = useState<HistoricalCity[]>(() => {
    const saved = localStorage.getItem('turon_cities');
    return saved ? JSON.parse(saved) : HISTORICAL_CITIES;
  });

  const [conflicts, setConflicts] = useState<HistoricalConflict[]>(() => {
    const saved = localStorage.getItem('turon_conflicts');
    return saved ? JSON.parse(saved) : HISTORICAL_CONFLICTS;
  });

  const [treaties, setTreaties] = useState<HistoricalTreaty[]>(() => {
    const saved = localStorage.getItem('turon_treaties');
    return saved ? JSON.parse(saved) : HISTORICAL_TREATIES;
  });

  const [monuments, setMonuments] = useState<HistoricalMonument[]>(() => {
    const saved = localStorage.getItem('turon_monuments');
    return saved ? JSON.parse(saved) : HISTORICAL_MONUMENTS;
  });

  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(() => {
    const saved = localStorage.getItem('turon_timeline');
    return saved ? JSON.parse(saved) : TIMELINE_EVENTS;
  });

  const [mapRoutes] = useState<MapRouteLayer[]>(MAP_ROUTES);

  const [proposals, setProposals] = useState<EditProposal[]>(() => {
    const saved = localStorage.getItem('turon_proposals');
    return saved ? JSON.parse(saved) : INITIAL_PROPOSALS;
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('turon_persons', JSON.stringify(persons));
  }, [persons]);

  useEffect(() => {
    localStorage.setItem('turon_monuments', JSON.stringify(monuments));
  }, [monuments]);

  useEffect(() => {
    localStorage.setItem('turon_proposals', JSON.stringify(proposals));
  }, [proposals]);

  const submitProposal = (proposalData: Omit<EditProposal, 'id' | 'submittedAt' | 'status'>) => {
    const newProposal: EditProposal = {
      ...proposalData,
      id: `prop-${Date.now()}`,
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'pending'
    };
    setProposals(prev => [newProposal, ...prev]);
  };

  const approveProposal = (proposalId: string) => {
    setProposals(prev =>
      prev.map(p => {
        if (p.id === proposalId) {
          return { ...p, status: 'approved' as const };
        }
        return p;
      })
    );
  };

  const rejectProposal = (proposalId: string, reason?: string) => {
    setProposals(prev =>
      prev.map(p => {
        if (p.id === proposalId) {
          return { ...p, status: 'rejected' as const, rejectionReason: reason || 'Rad etildi' };
        }
        return p;
      })
    );
  };

  const addNewPerson = (person: HistoricalPerson) => {
    setPersons(prev => [person, ...prev]);
    // Add corresponding timeline event
    const newTl: TimelineEvent = {
      id: `tl-p-${person.id}`,
      title: `${person.name} faoliyati`,
      year: person.birthYear,
      isBCE: person.isBCE,
      century: person.isBCE ? `m.avv. ${Math.ceil(person.birthYear / 100)} asr` : `${Math.ceil(person.birthYear / 100)} asr`,
      category: 'person',
      summary: person.shortBio,
      entityId: person.id,
      route: '/persons',
      heroBackgroundUrl: person.heroBackgroundUrl,
      tags: person.tags
    };
    setTimelineEvents(prev => [newTl, ...prev]);
  };

  const addNewMonument = (monument: HistoricalMonument) => {
    setMonuments(prev => [monument, ...prev]);
  };

  const searchGlobal = (query: string): SearchResult[] => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Search Persons
    persons.forEach(p => {
      if (p.name.toLowerCase().includes(q) || p.title.toLowerCase().includes(q) || p.shortBio.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q))) {
        results.push({
          id: p.id,
          title: p.name,
          category: 'person',
          categoryLabel: 'Tarixiy Shaxs',
          route: `/persons?id=${p.id}`,
          yearDisplay: `${p.birthYear}${p.isBCE ? ' m.avv.' : ''} – ${p.deathYear}${p.isBCE ? ' m.avv.' : ''}`,
          snippet: p.shortBio,
          heroImage: p.avatarUrl || p.heroBackgroundUrl
        });
      }
    });

    // Search States
    states.forEach(s => {
      if (s.name.toLowerCase().includes(q) || s.capital.toLowerCase().includes(q) || s.shortDescription.toLowerCase().includes(q)) {
        results.push({
          id: s.id,
          title: s.name,
          category: 'state',
          categoryLabel: 'Davlat / Imperiya',
          route: `/states?id=${s.id}`,
          yearDisplay: `${s.startYear} – ${s.endYear}`,
          snippet: s.shortDescription,
          heroImage: s.heroBackgroundUrl
        });
      }
    });

    // Search Cities
    cities.forEach(c => {
      if (c.name.toLowerCase().includes(q) || (c.ancientName && c.ancientName.toLowerCase().includes(q)) || c.shortDescription.toLowerCase().includes(q)) {
        results.push({
          id: c.id,
          title: c.name,
          category: 'city',
          categoryLabel: 'Qadimiy Shahar',
          route: `/cities?id=${c.id}`,
          yearDisplay: `Asos solingan: ${c.establishedYear}${c.isBCE ? ' m.avv.' : ''}`,
          snippet: c.shortDescription,
          heroImage: c.heroBackgroundUrl
        });
      }
    });

    // Search Conflicts
    conflicts.forEach(cf => {
      if (cf.title.toLowerCase().includes(q) || cf.location.toLowerCase().includes(q) || cf.outcome.toLowerCase().includes(q)) {
        results.push({
          id: cf.id,
          title: cf.title,
          category: 'conflict',
          categoryLabel: 'Urush / Qoʻzgʻolon',
          route: `/conflicts?id=${cf.id}`,
          yearDisplay: `${cf.startYear}${cf.isBCE ? ' m.avv.' : ''}`,
          snippet: cf.outcome,
          heroImage: cf.heroBackgroundUrl
        });
      }
    });

    // Search Treaties
    treaties.forEach(tr => {
      if (tr.title.toLowerCase().includes(q) || tr.context.toLowerCase().includes(q)) {
        results.push({
          id: tr.id,
          title: tr.title,
          category: 'treaty',
          categoryLabel: 'Tinchlik Shartnomasi',
          route: `/treaties?id=${tr.id}`,
          yearDisplay: `${tr.signYear}${tr.isBCE ? ' m.avv.' : ''}`,
          snippet: tr.context,
          heroImage: tr.heroBackgroundUrl
        });
      }
    });

    // Search Monuments
    monuments.forEach(m => {
      if (m.name.toLowerCase().includes(q) || m.architecturalStyle.toLowerCase().includes(q) || m.locationCity.toLowerCase().includes(q)) {
        results.push({
          id: m.id,
          title: m.name,
          category: 'monument',
          categoryLabel: 'Meʼmoriy Obida',
          route: `/monuments?id=${m.id}`,
          yearDisplay: m.buildCentury,
          snippet: m.shortDescription,
          heroImage: m.heroBackgroundUrl
        });
      }
    });

    return results;
  };

  return (
    <HistoricalDataContext.Provider
      value={{
        persons,
        states,
        cities,
        conflicts,
        treaties,
        monuments,
        timelineEvents,
        mapRoutes,
        proposals,
        submitProposal,
        approveProposal,
        rejectProposal,
        addNewPerson,
        addNewMonument,
        searchGlobal
      }}
    >
      {children}
    </HistoricalDataContext.Provider>
  );
};

export const useHistoricalData = () => {
  const context = useContext(HistoricalDataContext);
  if (!context) {
    throw new Error('useHistoricalData must be used within a HistoricalDataProvider');
  }
  return context;
};
