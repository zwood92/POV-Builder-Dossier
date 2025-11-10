import React from 'react';
import type { RecentNews } from '../types';

interface RecentNewsProps {
  news: RecentNews[];
}

const RecentNewsComponent: React.FC<RecentNewsProps> = ({ news }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-slate-800 mb-4">Recent News/Events</h3>
      <div className="space-y-4">
        {news.map((item, index) => (
          <div key={index} className="p-4 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
            <p className="font-semibold text-slate-800">{item.title}</p>
            <p className="text-sm text-slate-600 mt-1">{item.summary}</p>
            <div className="text-xs text-slate-400 mt-2">
              <span>{item.source}</span> &bull; <span>{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNewsComponent;
