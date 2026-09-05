'use client';

import React, { useState, useMemo } from 'react';
import { Compass, Search } from 'lucide-react';
import { CitizenProfile } from '@/lib/types';
import { getCitizenProfile } from '@/lib/storage';
import { ServiceCard } from '@/components/ui/service-card';
import { DiscoverFiltersBar } from '@/components/ui/discover-filters-bar';
import { filterAndRankServices } from '@/lib/discoverServices';

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<'ALL' | 'CENTRAL' | 'STATE'>('ALL');
  const [sortBy, setSortBy] = useState<'relevant' | 'confidence'>('relevant');

  const userProfile = useMemo(() => getCitizenProfile(), []);

  const defaultProfile: CitizenProfile = useMemo(() => {
    if (selectedState === 'ALL') {
      return userProfile;
    }
    return {
      ...userProfile,
      residenceState: selectedState,
      studyState: selectedState,
      employmentState: selectedState,
      propertyState: selectedState,
      agricultureState: selectedState,
      businessState: selectedState,
    };
  }, [selectedState, userProfile]);

  const filteredRecommendations = useMemo(() => {
    return filterAndRankServices(
      searchQuery, selectedCategory, selectedJurisdiction, selectedState, sortBy, defaultProfile
    );
  }, [searchQuery, selectedState, selectedCategory, selectedJurisdiction, sortBy]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" /><span>National & State Scheme Repository</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">Discover Government Services</h1>
          <p className="text-sm text-slate-600 mt-1">Search verified central and state public schemes with jurisdiction filters and official source links.</p>
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-200">
          Showing {filteredRecommendations.length} Services
        </div>
      </div>

      <DiscoverFiltersBar
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
        selectedState={selectedState} setSelectedState={setSelectedState}
        selectedJurisdiction={selectedJurisdiction} setSelectedJurisdiction={setSelectedJurisdiction}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      <div className="space-y-6">
        {filteredRecommendations.length > 0 ? (
          filteredRecommendations.map((rec) => (
            <ServiceCard key={rec.serviceId} recommendation={rec} profile={defaultProfile} />
          ))
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3 max-w-md mx-auto">
            <Search className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No Services Found</h3>
            <p className="text-xs text-slate-500">Try adjusting your search terms, changing the category, or switching state domicile to ‘All India’.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); setSelectedState('ALL'); setSelectedJurisdiction('ALL'); }}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
