'use client';

import React from 'react';
import { JansetuChatbot } from '@/components/ui/chatbot';
import { Bot, Sparkles, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export default function AskPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Grounded AI Citizen Assistant</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          {t.ask.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t.ask.subtitle}
        </p>
      </div>

      {/* Main Grounded Chatbot Experience */}
      <JansetuChatbot />
    </div>
  );
}
