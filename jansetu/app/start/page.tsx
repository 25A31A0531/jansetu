'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles, AlertCircle, Layers, RefreshCcw } from 'lucide-react';
import { LifeEventInput } from '@/components/ui/life-event-input';
import { ClarificationForm } from '@/components/ui/clarification-form';
import { ProcessingCard } from '@/components/ui/processing-card';
import { CitizenProfile, LifeEvent } from '@/lib/types';
import { saveJourneyToStorage } from '@/lib/storage';
import { useLanguage } from '@/components/LanguageProvider';
import { buildStartJourney } from '@/lib/buildStartJourney';
import { runLifeEventClassification } from '@/lib/classifyEventHelper';

function StartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [naturalQuery, setNaturalQuery] = useState('');
  const [phase, setPhase] = useState<'input' | 'analyzing' | 'clarifying' | 'generating'>('input');
  const [detectedEvent, setDetectedEvent] = useState<LifeEvent | null>(null);
  const [classificationProfile, setClassificationProfile] = useState<Partial<CitizenProfile>>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInitialSubmit = (query: string) => {
    if (!query.trim()) return;
    setNaturalQuery(query); setPhase('analyzing'); setErrorMessage(null);
    setTimeout(() => {
      const res = runLifeEventClassification(query);
      if (res.error || !res.lifeEvent) { setErrorMessage(res.error || 'Unable to classify event.'); setPhase('input'); return; }
      setDetectedEvent(res.lifeEvent); setClassificationProfile(res.initialProfile || {}); setQuestions(res.questions || []); setPhase('clarifying');
    }, 1100);
  };

  useEffect(() => { const q = searchParams?.get('q'); if (q) { setNaturalQuery(q); handleInitialSubmit(q); } }, [searchParams]);

  const handleClarificationComplete = (completedProfile: CitizenProfile) => {
    if (!detectedEvent) return;
    setPhase('generating');
    setTimeout(() => { const journey = buildStartJourney(detectedEvent, completedProfile, naturalQuery); saveJourneyToStorage(journey); router.push(`/journey/${journey.id}`); }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold"><Sparkles className="w-3.5 h-3.5" /><span>Life-Event Intelligence Engine</span></div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          {phase === 'clarifying' ? t.start.clarificationTitle : phase === 'analyzing' || phase === 'generating' ? 'Preparing Your Action Plan' : t.start.title}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">{phase === 'clarifying' ? t.start.clarificationSubtitle : t.start.subtitle}</p>
      </div>
      {errorMessage && (
        <div className="max-w-xl mx-auto mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1"><span className="font-bold block">Need more context</span><p className="leading-relaxed">{errorMessage}</p></div>
        </div>
      )}
      {phase === 'input' && <LifeEventInput onSubmit={handleInitialSubmit} initialValue={naturalQuery} isAnalyzing={false} />}
      {(phase === 'analyzing' || phase === 'generating') && <ProcessingCard mode={phase} />}
      {phase === 'clarifying' && detectedEvent && (
        <div className="space-y-6">
          <div className="max-w-xl mx-auto flex items-center justify-between p-3.5 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs">
            <div className="flex items-center gap-2"><Layers className="w-4 h-4 text-indigo-600" /><span className="text-slate-600">Identified Life Event:</span><strong className="text-slate-900">{detectedEvent.name}</strong></div>
            <button onClick={() => setPhase('input')} className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"><RefreshCcw className="w-3 h-3" /><span>Change</span></button>
          </div>
          <ClarificationForm lifeEvent={detectedEvent} questions={questions} initialProfile={{ ...classificationProfile, hasHouseDamage: detectedEvent.id === 'disaster' ? true : undefined }} onSubmit={handleClarificationComplete} isLoading={false} />
        </div>
      )}
    </div>
  );
}

export default function StartPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Loading JANSETU Navigator...</div>}>
      <StartContent />
    </Suspense>
  );
}
