import React from 'react';
import TextInput from './TextInput';
import Button from './Button';
import type { AnalysisFormInput, BuildOption } from '../types';

interface LandingPageProps {
  formInput: AnalysisFormInput;
  isLoading: boolean;
  isDropdownOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  buildOptions: BuildOption[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOptionSelect: (option: BuildOption) => void;
  setIsDropdownOpen: (isOpen: boolean) => void;
  handleSubmit: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  formInput,
  isLoading,
  isDropdownOpen,
  dropdownRef,
  buildOptions,
  handleInputChange,
  handleOptionSelect,
  setIsDropdownOpen,
  handleSubmit,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans antialiased flex items-center justify-center p-4">
      <main className="max-w-xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Build Your Point of View</h1>
          <p className="mt-2 text-lg text-slate-600">Enter a company name to get started.</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md border border-slate-200">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <TextInput
              id="companyName"
              label="Company Name"
              value={formInput.companyName}
              onChange={handleInputChange}
              placeholder="e.g., Salesforce, Google, etc."
            />
            <div ref={dropdownRef} className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                What do you want to build?
              </label>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-full rounded-md border border-slate-300 bg-white py-2.5 px-3 text-slate-800 shadow-sm sm:text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{formInput.buildOption}</span>
                <svg className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-slate-200">
                  <ul className="py-1">
                    {buildOptions.map((option) => (
                      <li
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer flex items-center justify-between"
                      >
                        {option}
                        {formInput.buildOption === option && <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="pt-2">
              <Button onClick={handleSubmit} disabled={!formInput.companyName || isLoading} isLoading={isLoading}>
                Generate
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
