'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Compass, Sparkles, Plus } from 'lucide-react';
import { Journey } from '@/lib/types';
import { getSavedJourneys } from '@/lib/storage';
import { useLanguage } from '@/components/LanguageProvider';
import { DemoScenarios } from '@/components/ui/demo-scenarios';
import { JourneyCardItem } from '@/components/ui/journey-card-item';

export default function MyJourneysDashboard() {
  const { t } = useLanguage();
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [mounted, setMounted] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  useEffect(() => {
    setJourneys(getSavedJourneys());
    setMounted(true);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" /><span>Citizen Journey Tracker</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">{t.nav.myJourney}</h1>
          <p className="text-sm text-slate-600 mt-1">Track and resume your personalized government service action plans.</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setDemoModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-xs font-bold text-indigo-700 transition">
            <Sparkles className="w-4 h-4 text-indigo-600" /><span>{t.nav.tryDemo}</span>
          </button>
          <Link href="/start" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition">
            <Plus className="w-4 h-4" /><span>New Action Plan</span>
          </Link>
        </div>
      </div>

      {mounted && journeys.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journeys.map((journey) => <JourneyCardItem key={journey.id} journey={journey} />)}
        </div>
      ) : (
        <div className="text-center bg-white border border-slate-200 rounded-3xl p-12 space-y-5 max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center">
            <Compass className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">No Active Journeys Yet</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
              Start by describing your situation in everyday language, or try one of our pre-configured demo scenarios.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/start" className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow transition">
              Start My First Plan
            </Link>
            <button onClick={() => setDemoModalOpen(true)} className="px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition">
              Try Demo Scenario
            </button>
          </div>
        </div>
      )}

      <DemoScenarios isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} variant="modal" />
    </div>
  );
}
