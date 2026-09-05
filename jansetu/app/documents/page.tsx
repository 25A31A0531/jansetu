'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Lock, Filter } from 'lucide-react';
import { DocumentRequirement, DocumentStatus } from '@/lib/types';
import { getUserDocuments, updateUserDocument } from '@/lib/storage';
import { DocumentCard } from '@/components/ui/document-card';
import { useLanguage } from '@/components/LanguageProvider';
import { ReadinessGauge } from '@/components/ui/readiness-gauge';

const CATEGORIES = ['all', 'identity', 'income', 'residence', 'academic', 'land', 'legal', 'business'];

export default function DocumentCenterPage() {
  const { t } = useLanguage();
  const [documents, setDocuments] = useState<DocumentRequirement[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => { setDocuments(getUserDocuments()); }, []);

  const handleUpdateStatus = (docId: string, status: DocumentStatus) => {
    const currentDocs = getUserDocuments();
    const doc = currentDocs.find((d) => d.id === docId);
    if (!doc) return;
    const updatedDoc: DocumentRequirement = {
      ...doc,
      status,
      uploadedAt: status === 'ready' ? (doc.uploadedAt || new Date().toISOString()) : undefined,
      extractedData: status === 'ready' ? doc.extractedData : undefined,
    };
    const allDocs = updateUserDocument(updatedDoc);
    setDocuments([...allDocs]);
  };

  const handleSimulateUpload = (docId: string, extractedData: Record<string, any>) => {
    const currentDocs = getUserDocuments();
    const doc = currentDocs.find((d) => d.id === docId);
    if (!doc) return;
    const allDocs = updateUserDocument({
      ...doc,
      status: 'ready',
      uploadedAt: new Date().toISOString(),
      extractedData,
    });
    setDocuments([...allDocs]);
  };

  const readyCount = documents.filter((d) => d.status === 'ready').length;
  const totalCount = documents.length;
  const readinessPercent = totalCount > 0 ? Math.round((readyCount / totalCount) * 100) : 0;
  const filteredDocs = filterCategory === 'all' ? documents : documents.filter((d) => d.category === filterCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /><span>Encrypted Client-Side Readiness</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">{t.documents.title}</h1>
          <p className="text-sm text-slate-600 mt-1">{t.documents.subtitle}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xs">
          <Lock className="w-3.5 h-3.5 text-amber-400" /><span>Zero Cloud Storage</span>
        </span>
      </div>

      <ReadinessGauge readyCount={readyCount} totalCount={totalCount} readinessPercent={readinessPercent} />

      <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 text-indigo-950 text-xs flex items-start gap-3">
        <Lock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold block">Privacy & Security Commitment:</span>
          <p className="text-slate-600 leading-relaxed">{t.documents.simulatedOcrNotice}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-slate-400 shrink-0" />
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition ${
              filterCategory === cat ? 'bg-slate-900 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}>
            {cat === 'all' ? 'All Documents' : cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <DocumentCard key={doc.id} document={doc} onUpdateStatus={handleUpdateStatus} onSimulateUpload={handleSimulateUpload} />
        ))}
      </div>
    </div>
  );
}
