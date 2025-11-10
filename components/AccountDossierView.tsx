import React from 'react';
import type { Dossier } from '../types';

interface AccountDossierViewProps {
  dossier: Dossier;
}

const AccountDossierView: React.FC<AccountDossierViewProps> = ({ dossier }) => {
  return (
    <div className="space-y-8">
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
        </div>
      </div>
    </div>
  );
};

export default AccountDossierView;
