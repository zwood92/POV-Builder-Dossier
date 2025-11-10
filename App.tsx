import React, { useState, useCallback, useRef, useEffect } from 'react';
import ResultDisplay from './components/ResultDisplay';
import { generateCompanyAnalysis } from './services/geminiService';
import type { AnalysisFormInput, AnalysisResult, BuildOption } from './types';
import Header from './components/Header';
import { exportAsPdf } from './utils/exportUtils';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import SettingsPage from './components/SettingsPage';

const App: React.FC = () => {
  const [formInput, setFormInput] = useState<AnalysisFormInput>({
    companyName: '',
    buildOption: 'Account Dossier',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<string>('main');
  
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
    setCurrentPage('main');
  };

  const handleExport = () => {
    if (!result || !result.dossier) return;
    exportAsPdf(result, result.dossier.companyName);
  };

  const handlePrint = () => {
      window.print();
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <LandingPage
      formInput={formInput}
      isLoading={isLoading}
      isDropdownOpen={isDropdownOpen}
      dropdownRef={dropdownRef}
      buildOptions={buildOptions}
      handleInputChange={handleInputChange}
      handleOptionSelect={handleOptionSelect}
      setIsDropdownOpen={setIsDropdownOpen}
      handleSubmit={handleSubmit}
    />
  );
};

export default App;
