import React from 'react';

interface OverviewProps {
  overview: string;
}

const Overview: React.FC<OverviewProps> = ({ overview }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-slate-800 mb-4">Company Overview</h3>
      <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{overview}</p>
    </div>
  );
};

export default Overview;
