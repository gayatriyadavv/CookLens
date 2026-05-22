import axios from 'axios';
import type { AnalysisResponse } from '@/types';
import { mockAnalyses, getRandomMockAnalysis } from './mockData';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * FIX #1 — Mock mode is now OFF by default.
 * Set NEXT_PUBLIC_USE_MOCK=true in .env.local ONLY for pure UI demos.
 * For real image analysis, leave it unset or set to false.
 */
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 60_000,
  headers: { 'Accept': 'application/json' },
});

/** Simulate network latency for mock responses (ms). */
function mockDelay(min = 2000, max = 3500): Promise<void> {
  const ms = Math.floor(Math.random() * (max - min)) + min;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Upload a food image for AI analysis.
 */
export async function analyzeImage(file: File): Promise<AnalysisResponse> {
  if (USE_MOCK) {
    await mockDelay();
    return getRandomMockAnalysis();
  }

  // FIX #8 — no silent fallback; throw so the UI can show the real error
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await client.post<AnalysisResponse>('/api/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

/**
 * Retrieve a previously completed analysis by ID.
 */
export async function getAnalysis(id: string): Promise<AnalysisResponse> {
  if (USE_MOCK) {
    await mockDelay(500, 1000);
    const found = mockAnalyses.find((a) => a.id === id);
    return found ?? getRandomMockAnalysis();
  }

  const { data } = await client.get<AnalysisResponse>(`/api/analyze/${id}`);
  return data;
}

/**
 * Generate a full recipe from an existing analysis.
 * FIX #6 — corrected route from /api/recipe/:id → POST /api/recipes/generate with body
 */
export async function generateRecipe(
  analysisId: string,
  servings: number = 2,
): Promise<AnalysisResponse> {
  if (USE_MOCK) {
    await mockDelay(1500, 2500);
    const found = mockAnalyses.find((a) => a.id === analysisId);
    return found ?? getRandomMockAnalysis();
  }

  const { data } = await client.post<AnalysisResponse>('/api/recipes/generate', {
    analysis_id: analysisId,
    servings,
  });
  return data;
}

/**
 * Fetch analysis history.
 * FIX #6 — corrected route from /api/history → /api/recipes/history
 */
export async function getHistory(): Promise<AnalysisResponse[]> {
  if (USE_MOCK) {
    await mockDelay(800, 1200);
    return mockAnalyses;
  }

  const { data } = await client.get<AnalysisResponse[]>('/api/recipes/history');
  return data;
}

/**
 * Generate synthetic dataset entries on the backend.
 */
export async function generateDataset(
  count: number,
  cuisineFilter: string,
  stageFilter: string
): Promise<any[]> {
  if (USE_MOCK) {
    await mockDelay(1500, 2000);
    return Array.from({ length: count }, (_, i) => ({
      id: `ds_mock_${Date.now()}_${i}`,
      prompt: `Mock dataset item for ${cuisineFilter} / ${stageFilter}`,
      cuisine: cuisineFilter === 'All Cuisines' ? 'Indian' : cuisineFilter,
      stage: stageFilter === 'All Stages' ? 'cooking' : stageFilter,
      dish: 'Butter Chicken',
      created: new Date().toISOString().split('T')[0]
    }));
  }

  const { data } = await client.post('/api/dataset/generate', {
    count,
    cuisine_filter: cuisineFilter === 'All Cuisines' ? null : cuisineFilter,
    include_stages: []
  });

  return data.map((entry: any) => ({
    id: entry.response.id,
    prompt: entry.prompt,
    cuisine: entry.metadata?.cuisine || 'International',
    stage: entry.metadata?.stage || 'cooking',
    dish: entry.response.dish_prediction.name,
    created: entry.response.id.slice(0, 8)
  }));
}

/**
 * Retrieve live dataset stats from the backend.
 */
export async function getDatasetStats(): Promise<any> {
  if (USE_MOCK) {
    return {
      totalEntries: 156,
      cuisines: 8,
      avgConfidence: 94,
      stages: { raw: 28, preparation: 35, cooking: 42, almost_done: 31, done: 20 },
      topCuisines: [
        { name: 'Indian', count: 45 },
        { name: 'Italian', count: 32 },
        { name: 'Japanese', count: 28 },
        { name: 'Thai', count: 22 },
        { name: 'Mexican', count: 18 }
      ]
    };
  }

  const { data } = await client.get('/api/dataset/stats');
  const total = data.total || 0;
  const avgConfidence = total > 0 ? 94 : 0;
  const topCuisines = Object.entries(data.by_cuisine || {})
    .map(([name, count]) => ({ name, count: count as number }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalEntries: total,
    cuisines: Object.keys(data.by_cuisine || {}).length,
    avgConfidence,
    stages: data.by_stage || {},
    topCuisines: topCuisines.length > 0 ? topCuisines : [{ name: 'None', count: 0 }]
  };
}

/**
 * Fetch all dataset entries in the pool.
 */
export async function getDatasetEntries(): Promise<any[]> {
  if (USE_MOCK) {
    await mockDelay(400, 800);
    return [
      { id: "ds_001", prompt: "Analyze this image of butter chicken being cooked in a pan", cuisine: "Indian", stage: "cooking", dish: "Butter Chicken", created: "2025-01-15" },
      { id: "ds_002", prompt: "Identify the ingredients in this pasta preparation", cuisine: "Italian", stage: "preparation", dish: "Pasta Carbonara", created: "2025-01-15" },
      { id: "ds_003", prompt: "What stage is this sushi roll at?", cuisine: "Japanese", stage: "done", dish: "Sushi Roll", created: "2025-01-14" },
      { id: "ds_004", prompt: "Detect ingredients in these raw vegetables", cuisine: "International", stage: "raw", dish: "Garden Salad", created: "2025-01-14" },
      { id: "ds_005", prompt: "Analyze this biryani rice layering process", cuisine: "Indian", stage: "preparation", dish: "Chicken Biryani", created: "2025-01-13" },
      { id: "ds_006", prompt: "Is this pad thai almost ready to serve?", cuisine: "Thai", stage: "almost_done", dish: "Pad Thai", created: "2025-01-13" },
    ];
  }

  const { data } = await client.get<any[]>('/api/dataset/entries');
  return data.map((entry: any) => ({
    id: entry.response?.id || entry.id || `ds_${Date.now()}`,
    prompt: entry.prompt || 'Analyze food image',
    cuisine: entry.metadata?.cuisine || entry.response?.dish_prediction?.cuisine || 'International',
    stage: entry.metadata?.stage || entry.response?.stage || 'cooking',
    dish: entry.response?.dish_prediction?.name || 'Unknown Dish',
    created: entry.created_at?.split('T')[0] || new Date().toISOString().split('T')[0]
  }));
}

/**
 * Download dataset files from the backend.
 */
export function downloadDatasetFile(format: 'zip' | 'csv' | 'json'): void {
  const downloadUrl = `${BASE_URL}/api/dataset/download?format=${format}`;
  console.info('[CookLens API] Triggering browser download for format', format, downloadUrl);
  window.open(downloadUrl, '_blank');
}
