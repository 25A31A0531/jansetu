'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X, Globe, Bot } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { SupportedLanguage, LANGUAGE_OPTIONS } from '@/lib/i18n';
import { DemoScenarios } from './demo-scenarios';
import { MobileMenu } from './mobile-menu';

export function Navbar() {
  const currentPath = usePathname() ?? '/';
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const navItems = [
    { name: t.nav.home, href: '/' }, { name: t.nav.ask, href: '/ask' },
    { name: t.nav.discover, href: '/discover' }, { name: t.nav.myJourney, href: '/journey' },
    { name: t.nav.documents, href: '/documents' }, { name: t.nav.profile, href: '/profile' },
    { name: t.nav.learn, href: '/learn' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4 lg:gap-6">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md group-hover:bg-slate-800 transition">
                  <span className="font-bold text-lg tracking-wider text-amber-400">JS</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xl text-slate-950 tracking-tight">JANSETU</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">V1.0</span>
                  </div>
                  <p className="text-[11px] text-slate-500 hidden sm:block">Citizen Service Navigator</p>
                </div>
              </Link>

              <nav className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => {
                  const isActive = item.href === '/' ? currentPath === '/' : currentPath.startsWith(item.href);
                  return (
                    <Link key={item.href} href={item.href}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${isActive ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="hidden lg:flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-700">
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <select value={language} onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                  className="bg-transparent font-semibold focus:outline-none cursor-pointer text-xs pr-1" aria-label="Select Language">
                  {LANGUAGE_OPTIONS.map((opt) => (
                    <option key={opt.code} value={opt.code}>{opt.nativeName} ({opt.label})</option>
                  ))}
                </select>
              </div>

              <button onClick={() => setDemoModalOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" /><span>{t.nav.tryDemo}</span>
              </button>

              <Link href="/ask" className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:shadow transition">
                <Bot className="w-3.5 h-3.5 text-amber-400" /><span>{t.nav.startCTA}</span>
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button onClick={() => setDemoModalOpen(true)} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200">
                <Sparkles className="w-3 h-3 text-indigo-600" /><span>Demo</span>
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none" aria-label="Toggle Menu">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <MobileMenu currentPath={currentPath} language={language} onLanguageChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
            navItems={navItems} onClose={() => setMobileMenuOpen(false)} startCtaText={t.nav.startCTA} />
        )}
      </header>

      <DemoScenarios isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} variant="modal" />
    </>
  );
}
