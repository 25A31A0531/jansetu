'use client';

import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { LearnCard } from '@/components/ui/learn-card';
import { LEARN_TOPICS } from '@/lib/learnTopics';

export default function LearnPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="max-w-3xl space-y-3 pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Civic Literacy & Process Guide</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">{t.learn.title}</h1>
        <p className="text-sm text-slate-600 leading-relaxed">{t.learn.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LEARN_TOPICS.map((topic) => <LearnCard key={topic.id} topic={topic} />)}
      </div>

      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Official Portals Reference</span>
          <h3 className="text-lg sm:text-xl font-bold text-white">Access Legitimate Government Infrastructure</h3>
          <p className="text-xs text-slate-400 max-w-xl">
            Always verify applications on official portals: scholarships.gov.in, pmfby.gov.in, crsorgi.gov.in, and serviceonline.gov.in.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition">
            <span>National Portal of India</span><ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a href="https://www.digilocker.gov.in" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white transition shadow-sm">
            <span>DigiLocker</span><ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
