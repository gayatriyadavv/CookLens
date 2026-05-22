'use client';

import { useState, useCallback } from 'react';
import type { AnalysisResponse } from '@/types';
import { analyzeImage } from '@/lib/api';

interface UseAnalysisReturn {
  analysis: AnalysisResponse | null;
  isAnalyzing: boolean;
  error: string | null;
  analyze: (file: File) => Promise<void>;
  clearAnalysis: () => void;
  setAnalysis: (a: AnalysisResponse) => void;
}

export function useAnalysis(): UseAnalysisReturn {
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeImage(file);
      setAnalysis(result);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Analysis failed. Please try again.';
      setError(message);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const clearAnalysis = useCallback(() => {
    setAnalysis(null);
    setError(null);
    setIsAnalyzing(false);
  }, []);

  return { analysis, isAnalyzing, error, analyze, clearAnalysis, setAnalysis };
}
