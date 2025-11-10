import React from 'react';
import type { OutreachTemplate } from '../types';

interface OutreachTemplatesProps {
  templates: OutreachTemplate[];
}

const OutreachTemplates: React.FC<OutreachTemplatesProps> = ({ templates }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-slate-800 mb-4">Outreach Templates</h3>
      <div className="space-y-6">
        {templates.map((template, index) => (
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
  );
};

export default OutreachTemplates;
