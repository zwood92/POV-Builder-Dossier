import React, { useState, useCallback, useRef, useEffect } from 'react';
import TextInput from './components/TextInput';
import Button from './components/Button';
import ResultDisplay from './components/ResultDisplay';
import { generateCompanyAnalysis } from './services/geminiService';
import type { AnalysisFormInput, AnalysisResult, BuildOption } from './types';

const App: React.FC = () => {
  const [formInput, setFormInput] = useState<AnalysisFormInput>({
    companyName: '',
    buildOption: 'Account Dossier',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const buildOptions: BuildOption[] = ['Account Dossier', 'Use Cases', 'Outreach Templates', 'All'];

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handleOptionSelect = (option: BuildOption) => {
      setFormInput(prev => ({ ...prev, buildOption: option }));
      setIsDropdownOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async () => {
    if (!formInput.companyName) {
        setError("Company Name is required.");
        return;
    }
    setIsLoading(true);
    setError(null);
    
    try {
      const generatedResult = await generateCompanyAnalysis(formInput);
      setResult(generatedResult);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
      setResult(null); // Clear previous results on new error
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSearch = () => {
    setResult(null);
    setFormInput({ companyName: '', buildOption: 'Account Dossier' });
    setError(null);
  };

  if (result) {
    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans antialiased">
          <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 p-4 sticky top-0 z-20">
              <div className="container mx-auto flex justify-between items-center max-w-6xl">
                 <div className="flex items-center gap-3">
                    <svg className="h-7 w-7 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12.72,12.96C12.43,12.24 11.57,12.24 11.28,12.96L8.6,19.35C8.31,20.07 8.89,20.8 9.69,20.8H14.31C15.11,20.8 15.69,20.07 15.4,19.35L12.72,12.96M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z"></path></svg>
                    <h1 className="text-xl font-semibold text-slate-700">Account Dossier</h1>
                 </div>
                 <button onClick={handleNewSearch} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">New Search</button>
              </div>
          </header>
          <main className="container mx-auto px-4 py-8 max-w-6xl">
            <ResultDisplay result={result} />
          </main>
        </div>
    );
  }

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
        {error && (
            <div className="mt-6 p-4 text-center bg-red-100 text-red-700 rounded-lg border border-red-200">
                <p><strong>Error:</strong> {error}</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default App;