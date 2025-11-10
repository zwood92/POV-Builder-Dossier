import React, { useState, useMemo } from 'react';
import type { AnalysisResult } from '../types';
import AccountDossierView from './AccountDossierView';
import Overview from './Overview';
import KeyContacts from './KeyContacts';
import RecentNewsComponent from './RecentNews';
import UseCases from './UseCases';
import OutreachTemplates from './OutreachTemplates';
import ConversationalAI from './ConversationalAI';

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode; icon: React.ReactElement; }> = ({ active, onClick, children, icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
      active
        ? 'bg-blue-100 text-blue-700'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
    }`}
  >
    {icon}
    {children}
  </button>
);

const ResultDisplay: React.FC<{ result: AnalysisResult; }> = ({ result }) => {
  const { dossier, useCases, outreachTemplates } = result;

  const availableTabs = useMemo(() => {
    const tabs = [];
    if (dossier?.overview) tabs.push('Overview');
    if (dossier?.keyContacts?.length) tabs.push('Key Contacts');
    if (dossier?.recentNews?.length) tabs.push('Recent News');
    if (useCases?.length) tabs.push('Relevant Use Cases');
    if (outreachTemplates?.length) tabs.push('Outreach Templates');
    tabs.push('Conversational AI'); // Add the new tab
    return tabs;
  }, [dossier, useCases, outreachTemplates]);

  const [activeTab, setActiveTab] = useState(availableTabs[0] || '');
  
  if (!dossier) {
    return (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-slate-700">No data available</h2>
            <p className="text-slate-500 mt-2">Could not load company information.</p>
        </div>
    )
  }

  return (
    <div className="w-full animate-fade-in space-y-8">
      <AccountDossierView dossier={dossier} />

      {/* Tabs */}
      <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm sticky top-[73px] z-[9] backdrop-blur-sm bg-white/80">
        <nav className="flex items-center gap-2 overflow-x-auto">
            {availableTabs.includes('Overview') && <TabButton active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} icon={<svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
                Overview
            </TabButton>}
            {availableTabs.includes('Key Contacts') && <TabButton active={activeTab === 'Key Contacts'} onClick={() => setActiveTab('Key Contacts')} icon={<svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 12a4 4 0 110-8 4 4 0 010 8z" /></svg>}>
                Key Contacts
            </TabButton>}
            {availableTabs.includes('Recent News') && <TabButton active={activeTab === 'Recent News'} onClick={() => setActiveTab('Recent News')} icon={<svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h3m-3 4h3m-3 4h3" /></svg>}>
                Recent News
            </TabButton>}
            {availableTabs.includes('Relevant Use Cases') && <TabButton active={activeTab === 'Relevant Use Cases'} onClick={() => setActiveTab('Relevant Use Cases')} icon={<svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}>
                Use Cases
            </TabButton>}
            {availableTabs.includes('Outreach Templates') && <TabButton active={activeTab === 'Outreach Templates'} onClick={() => setActiveTab('Outreach Templates')} icon={<svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}>
                Outreach
            </TabButton>}
            {availableTabs.includes('Conversational AI') && <TabButton active={activeTab === 'Conversational AI'} onClick={() => setActiveTab('Conversational AI')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}>
                Conversational AI
            </TabButton>}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm min-h-[400px]">
        {activeTab === 'Overview' && dossier.overview && (
            <Overview overview={dossier.overview} />
        )}
        {activeTab === 'Key Contacts' && dossier.keyContacts && (
            <KeyContacts contacts={dossier.keyContacts} />
        )}
        {activeTab === 'Recent News' && dossier.recentNews && (
            <RecentNewsComponent news={dossier.recentNews} />
        )}
        {activeTab === 'Relevant Use Cases' && useCases && (
            <UseCases useCases={useCases} />
        )}
        {activeTab === 'Outreach Templates' && outreachTemplates && (
            <OutreachTemplates templates={outreachTemplates} />
        )}
        {activeTab === 'Conversational AI' && (
            <ConversationalAI />
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;