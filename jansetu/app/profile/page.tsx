'use client';

import React, { useState, useEffect } from 'react';
import { User, Lock, Check, ToggleLeft, ToggleRight, Save } from 'lucide-react';
import { CitizenProfile, FamilyMember, FamilyRelationship } from '@/lib/types';
import { getCitizenProfile, saveCitizenProfile, getFamilyMembers, saveFamilyMembers, getDebugMode, setDebugMode } from '@/lib/storage';
import { useLanguage } from '@/components/LanguageProvider';
import { LocationSection } from '@/components/ui/profile/LocationSection';
import { DemographicsSection } from '@/components/ui/profile/DemographicsSection';
import { FamilySection } from '@/components/ui/profile/FamilySection';

export default function ProfilePage() {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<CitizenProfile>(getCitizenProfile());
  const [family, setFamily] = useState<FamilyMember[]>([]);
  const [debugMode, setDebugModeState] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newRel, setNewRel] = useState<FamilyRelationship>('Father');
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState<number>(50);
  const [newOcc, setNewOcc] = useState('');
  useEffect(() => { setProfile(getCitizenProfile()); setFamily(getFamilyMembers()); setDebugModeState(getDebugMode()); }, []);
  const handleProfileChange = (field: keyof CitizenProfile, val: any) => {
    setProfile((prev) => ({ ...prev, [field]: val }));
  };
  const handleSaveProfile = (e: React.FormEvent) => { e.preventDefault(); saveCitizenProfile(profile); setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 2500); };
  const handleAddFamilyMember = () => {
    const updated = [...family, { id: `fam-${Date.now()}`, relationship: newRel, name: newName || newRel, age: newAge, occupation: newOcc, residenceState: profile.residenceState }];
    setFamily(updated); saveFamilyMembers(updated); setShowAddMember(false); setNewName(''); setNewOcc('');
  };
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2"><User className="w-3.5 h-3.5" /><span>Client-Side Citizen Data</span></div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">{t.profile.title}</h1>
          <p className="text-sm text-slate-600 mt-1">{t.profile.subtitle}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold"><Lock className="w-3.5 h-3.5" /><span>{t.profile.privacyNote}</span></span>
      </div>
      <form onSubmit={handleSaveProfile} className="space-y-8">
        <LocationSection profile={profile} onChange={handleProfileChange} />
        <DemographicsSection profile={profile} onChange={handleProfileChange} />
        <FamilySection
          family={family} showAddMember={showAddMember} newRel={newRel} newName={newName} newAge={newAge} newOcc={newOcc}
          onToggleAdd={() => setShowAddMember(!showAddMember)} onRelChange={setNewRel}
          onNameChange={setNewName} onAgeChange={setNewAge} onOccChange={setNewOcc}
          onAdd={handleAddFamilyMember} onDelete={(id) => { const u = family.filter(m => m.id !== id); setFamily(u); saveFamilyMembers(u); }}
        />
        <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-white">{t.profile.debugToggle}</h4>
            <p className="text-xs text-slate-400">Reveals the "Why was this not shown?" engine inspector to inspect excluded schemes.</p>
          </div>
          <button type="button" onClick={() => { const n = !debugMode; setDebugModeState(n); setDebugMode(n); setProfile(p => ({...p, debugMode: n})); }} className="p-2 rounded-xl text-amber-400 transition">
            {debugMode ? <ToggleRight className="w-8 h-8 text-emerald-400" /> : <ToggleLeft className="w-8 h-8 text-slate-500" />}
          </button>
        </div>
        <div className="flex items-center justify-between pt-2">
          {saveSuccess && <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200"><Check className="w-4 h-4" /> Profile saved locally!</span>}
          <div className="ml-auto"><button type="submit" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm shadow-md transition"><Save className="w-4 h-4 text-amber-400" /><span>Save Changes</span></button></div>
        </div>
      </form>
    </div>
  );
}
