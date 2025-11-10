import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onNavigate }) => {
  return (
    <aside className={`flex-shrink-0 bg-slate-50 border-r border-slate-200 flex flex-col transition-width duration-300 ease-in-out ${isOpen ? 'w-80' : 'w-20'}`}>
      <div className={`flex items-center gap-4 text-slate-800 px-6 py-4 h-[89px] border-b border-solid border-slate-200 ${isOpen ? 'justify-start' : 'justify-center'}`}>
        <div className="size-8 text-blue-600">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
          </svg>
        </div>
        {isOpen && <h1 className="text-2xl font-bold tracking-tight">Account Dossier</h1>}
      </div>
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        <div className="px-2 py-2">
          <div className="flex items-center justify-between px-2 mb-2">
            {isOpen && <h2 className="text-sm font-semibold text-slate-500">History</h2>}
            <button onClick={onToggle} className="text-slate-500 hover:text-blue-600 transition-colors duration-200">
              <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`}>chevron_left</span>
            </button>
          </div>
          <nav className="flex flex-col gap-1 mt-2">
            {/* History items will be added here */}
          </nav>
        </div>
      </div>
      <div className="p-4">
        <button onClick={() => onNavigate('settings')} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors duration-200">
            <span className="material-symbols-outlined !text-xl">settings</span>
            {isOpen && <span className="truncate">Settings</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
