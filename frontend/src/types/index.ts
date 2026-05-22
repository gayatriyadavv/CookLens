export type CookingStage = 'raw' | 'chopped' | 'preparation' | 'sautéing' | 'simmering' | 'frying' | 'boiling' | 'gravy_thickening' | 'oil_separating' | 'cooking' | 'almost_done' | 'done' | 'plated' | 'overcooked';

export interface Ingredient {
  name: string;
  confidence: number;
  emoji: string;
  quantity?: string;
}

export interface CookingStep {
  step_number: number;
  instruction: string;
  duration?: string;
  temperature?: string;
  tip?: string;
}

export interface DishPrediction {
  name: string;
  cuisine: string;
  confidence: number;
  description?: string;
  alternatives?: string[];
  reasoning?: string;
}

export interface CopilotSuggestion {
  next_step: string;
  mistakes_detected: string[];
  fixes: string[];
  readiness_percent: number;
  readiness_label: string;
}

export interface NutritionEstimate {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
  tags: string[];
}

export interface SpiceRecommendation {
  name: string;
  emoji: string;
  reason: string;
}

export interface AnalysisResponse {
  id: string;
  image_url?: string;
  ingredients: Ingredient[];
  stage: CookingStage;
  dish_prediction: DishPrediction;
  instructions: CookingStep[];
  remaining_time: string;
  tips: string[];
  copilot: CopilotSuggestion;
  nutrition: NutritionEstimate;
  spice_recommendations: SpiceRecommendation[];
  cuisine_style: string;
  language: string;
}

export interface PantryItem {
  id: string;
  name: string;
  emoji: string;
  quantity?: string;
  category: string;
  added_at: string;
}
