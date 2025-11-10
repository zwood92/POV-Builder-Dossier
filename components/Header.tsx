import React from 'react';

interface HeaderProps {
  onNewSearch: () => void;
  onExport: () => void;
  onPrint: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewSearch, onExport, onPrint }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 p-4 sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center max-w-6xl">
        <div className="flex items-center gap-3">
          <svg className="h-7 w-7 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.72,12.96C12.43,12.24 11.57,12.24 11.28,12.96L8.6,19.35C8.31,20.07 8.89,20.8 9.69,20.8H14.31C15.11,20.8 15.69,20.07 15.4,19.35L12.72,12.96M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z"></path>
          </svg>
          <h1 className="text-xl font-semibold text-slate-700">Account Dossier</h1>
        </div>
        <div className="flex items-center gap-2">
            <button
              onClick={onNewSearch}
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              New Search
            </button>
            <button
                onClick={onExport}
                className="px-4 py-2 text-sm font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            >
                Export as PDF
            </button>
            <button
                onClick={onPrint}
                className="px-4 py-2 text-sm font-semibold rounded-md border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-colors"
            >
                Print
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
