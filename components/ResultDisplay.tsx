import React, { useState, useMemo } from 'react';
import type { AnalysisResult } from '../types';
import { exportAsPdf } from '../utils/exportUtils';

// Fix: Replaced `JSX.Element` with `React.ReactElement` to resolve the namespace error.
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
    return tabs;
  }, [dossier, useCases, outreachTemplates]);

  const [activeTab, setActiveTab] = useState(availableTabs[0] || '');

  const handleExport = () => {
    if (!result || !dossier) return;
    exportAsPdf(result, dossier.companyName);
  };
  
  const handlePrint = () => {
      window.print();
  }

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
      {/* Company Header Card */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0 bg-slate-100 h-16 w-16 rounded-md flex items-center justify-center text-slate-500 font-bold text-lg">
            {dossier.companyName.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-slate-800">{dossier.companyName}</h2>
            <div className="text-sm text-slate-500 mt-1 flex items-center gap-4 flex-wrap">
              <span>{dossier.industry}</span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span>{dossier.employeeCount} employees</span>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2 pt-4 sm:pt-0">
            <button onClick={handleExport} className="px-4 py-2 text-sm font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors">Export as PDF</button>
            <button onClick={handlePrint} className="px-4 py-2 text-sm font-semibold rounded-md border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-colors">Print</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm sticky top-[73px] z-[9] backdrop-blur-sm bg-white/80">
        <nav className="flex items-center gap-2 overflow-x-auto">
            {availableTabs.includes('Overview') && <TabButton active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} icon={<svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
                Overview
            </TabButton>}
            {availableTabs.includes('Key Contacts') && <TabButton active={activeTab === 'Key Contacts'} onClick={() => setActiveTab('Key Contacts')} icon={<svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 12a4 4 0 110-8 4 4 0 010 8z" /></svg>}>
                Key Contacts
            </TabButton>}
            {availableTabs.includes('Recent News') && <TabButton active={activeTab === 'Recent News'} onClick={() => setActiveTab('Recent News')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h3m-3 4h3m-3 4h3" /></svg>}>
                Recent News
            </TabButton>}
            {availableTabs.includes('Relevant Use Cases') && <TabButton active={activeTab === 'Relevant Use Cases'} onClick={() => setActiveTab('Relevant Use Cases')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}>
                Use Cases
            </TabButton>}
            {availableTabs.includes('Outreach Templates') && <TabButton active={activeTab === 'Outreach Templates'} onClick={() => setActiveTab('Outreach Templates')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}>
                Outreach
            </TabButton>}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm min-h-[400px]">
        {activeTab === 'Overview' && dossier.overview && (
            <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Company Overview</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{dossier.overview}</p>
            </div>
        )}
        {activeTab === 'Key Contacts' && dossier.keyContacts && (
            <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Key Contacts</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {dossier.keyContacts.map((contact, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{contact.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{contact.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500"><a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-800">{contact.email}</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
        {activeTab === 'Recent News' && dossier.recentNews && (
            <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Recent News/Events</h3>
                <div className="space-y-4">
                    {dossier.recentNews.map((news, index) => (
                        <div key={index} className="p-4 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
                            <p className="font-semibold text-slate-800">{news.title}</p>
                            <p className="text-sm text-slate-600 mt-1">{news.summary}</p>
                            <div className="text-xs text-slate-400 mt-2">
                                <span>{news.source}</span> &bull; <span>{news.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
        {activeTab === 'Relevant Use Cases' && useCases && (
            <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Relevant Use Cases</h3>
                <div className="space-y-4">
                    {useCases.map((useCase, index) => (
                         <div key={index} className="p-4 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
                            <p className="font-semibold text-slate-800">{useCase.title}</p>
                             <div className="mt-2 space-y-2 text-sm text-slate-600">
                                <p><span className="font-semibold text-slate-700">Problem:</span> {useCase.problem}</p>
                                <p><span className="font-semibold text-slate-700">Solution:</span> {useCase.solution}</p>
                             </div>
                         </div>
                    ))}
                </div>
            </div>
        )}
        {activeTab === 'Outreach Templates' && outreachTemplates && (
             <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Outreach Templates</h3>
                <div className="space-y-6">
                    {outreachTemplates.map((template, index) => (
                         <div key={index} className="p-4 border border-slate-200 rounded-lg">
                            <div className="flex justify-between items-center mb-3">
                                <p className="font-semibold text-slate-800">{template.title}</p>
                                <span className="text-xs text-white bg-blue-500 font-semibold rounded-full px-2 py-0.5">{template.channel}</span>
                            </div>
                             <div className="mt-2 space-y-3 text-sm text-slate-700">
                                <p className="font-semibold bg-slate-50 p-2 rounded-md">Subject: <span className="font-normal">{template.subject}</span></p>
                                <div className="font-semibold bg-slate-50 p-2 rounded-md">
                                    <p>Body:</p>
                                    <p className="font-normal whitespace-pre-wrap mt-1">{template.body}</p>
                                </div>
                             </div>
                         </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;