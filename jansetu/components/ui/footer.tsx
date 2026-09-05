'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, FileCheck, Lock, ExternalLink, Globe2, Bot } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-20 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">JS</div>
              <span className="font-extrabold text-lg text-white tracking-tight">JANSETU</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-powered citizen government-service navigator for India. Converting everyday life events into personalized, dependency-aware action plans.
            </p>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-1 rounded-md">
              <Lock className="w-3 h-3" /> Client-Side Privacy First
            </span>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Navigator</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/ask" className="hover:text-white transition flex items-center gap-1 text-amber-300 font-semibold"><Bot className="w-3 h-3" /><span>Ask JANSETU (AI Assistant)</span></Link></li>
              <li><Link href="/start" className="hover:text-white transition">Start with My Situation</Link></li>
              <li><Link href="/discover" className="hover:text-white transition">Discover Schemes & Services</Link></li>
              <li><Link href="/journey" className="hover:text-white transition">My Active Journeys</Link></li>
              <li><Link href="/profile" className="hover:text-white transition">Citizen Profile & Family Context</Link></li>
              <li><Link href="/documents" className="hover:text-white transition">Document Readiness Center</Link></li>
              <li><Link href="/learn" className="hover:text-white transition">Civic Literacy & Process Guide</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Civic Architecture</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2"><Shield className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" /><span>Transparent rule matching without opaque black boxes.</span></li>
              <li className="flex items-start gap-2"><FileCheck className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" /><span>Zero permanent document storage in prototype.</span></li>
              <li className="flex items-start gap-2"><Globe2 className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" /><span>13 Indian languages supported natively.</span></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold"><Shield className="w-3.5 h-3.5" /><span>Independent Civic Prototype</span></div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              JANSETU is an independent prototype and is not an official Government of India or State Government service. All official applications must be completed on designated ministry/state portals.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} JANSETU Prototype. Built for Indian Civic Navigation.</p>
          <div className="flex items-center gap-4">
            <Link href="/learn" className="hover:text-slate-400 transition">Privacy & Data Ethics</Link><span>•</span>
            <Link href="/learn" className="hover:text-slate-400 transition">How Schemes Work</Link><span>•</span>
            <a href="https://data.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-slate-400 transition"><span>data.gov.in</span><ExternalLink className="w-3 h-3" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
