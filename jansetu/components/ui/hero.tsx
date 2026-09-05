'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles, Bot } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { DemoScenarios } from './demo-scenarios';
import { LifeEventInput } from './life-event-input';
import { HeroCapabilities } from './hero-capabilities';
import { HeroTransformationSection } from './hero-transformation';

export function Hero() {
  const { t } = useLanguage();
  const router = useRouter();
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const handleInputSubmit = (query: string) => {
    router.push(`/start?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-indigo-100/60 via-amber-50/40 to-emerald-50/40 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-5 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 font-bold">JANSETU V1.0</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-200">“From ‘What do I need?’ to ‘What do I do next?’”</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
            {t.home.heroTitle}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            {t.home.heroSubtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/ask" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md hover:shadow-lg transition">
              <Bot className="w-4 h-4 text-amber-400" />
              <span>{t.home.primaryCTA}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
            <Link href="/discover" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition">
              <span>{t.home.secondaryCTA}</span>
            </Link>
            <button onClick={() => setDemoModalOpen(true)} className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-2xl text-sm font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>7 Demo Scenarios</span>
            </button>
          </div>
        </div>

        <div className="mb-16">
          <LifeEventInput onSubmit={handleInputSubmit} />
        </div>

        <HeroCapabilities />
        <HeroTransformationSection title={t.home.transformationTitle} subtitle={t.home.transformationSubtitle} />

        <div className="mb-16">
          <DemoScenarios variant="inline" />
        </div>
      </div>

      <DemoScenarios isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} variant="modal" />
    </section>
  );
}
