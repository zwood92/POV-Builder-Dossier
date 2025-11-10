import React from 'react';
import type { UseCase } from '../types';

interface UseCasesProps {
  useCases: UseCase[];
}

const UseCases: React.FC<UseCasesProps> = ({ useCases }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-slate-800 mb-4">Relevant Use Cases</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map((useCase, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between relative border border-slate-200">
            <div>
              <h3 className="text-lg font-semibold text-[#111418] mt-4">{useCase.title}</h3>
              <p className="mt-2 text-sm text-[#617589]">
                <strong>Problem:</strong> {useCase.problem}
              </p>
              <p className="mt-2 text-sm text-[#617589]">
                <strong>Solution:</strong> {useCase.solution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UseCases;
