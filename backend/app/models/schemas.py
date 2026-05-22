"""Pydantic schemas for CookLens API."""
from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


class CookingStageEnum(str, Enum):
    RAW = "raw"
    CHOPPED = "chopped"
    PREP = "preparation"
    SAUTEING = "sautéing"
    SIMMERING = "simmering"
    FRYING = "frying"
    BOILING = "boiling"
    GRAVY_THICKENING = "gravy_thickening"
    OIL_SEPARATING = "oil_separating"
    COOKING = "cooking"
    ALMOST_DONE = "almost_done"
    DONE = "done"
    PLATED = "plated"
    OVERCOOKED = "overcooked"


class Ingredient(BaseModel):
    name: str
    confidence: float = Field(ge=0, le=1)
    emoji: str = "🥘"
    quantity: Optional[str] = None


class CookingStep(BaseModel):
    step_number: int
    instruction: str
    duration: Optional[str] = None
    temperature: Optional[str] = None
    tip: Optional[str] = None


class DishPrediction(BaseModel):
    name: str
    cuisine: str
    confidence: float = Field(ge=0, le=1)
    description: Optional[str] = None
    alternatives: list[str] = []
    reasoning: Optional[str] = None


class CopilotSuggestion(BaseModel):
    next_step: str
    mistakes_detected: list[str] = []
    fixes: list[str] = []
    readiness_percent: float = Field(ge=0, le=100)
    readiness_label: str = "In Progress"


class NutritionEstimate(BaseModel):
    calories: int
    protein_g: float
    carbs_g: float
    fat_g: float
    fiber_g: float
    tags: list[str] = []


class SpiceRecommendation(BaseModel):
    name: str
    emoji: str = "🌿"
    reason: str


class AnalysisResponse(BaseModel):
    """Full AI analysis response for a food image."""
    id: str
    image_url: Optional[str] = None
    ingredients: list[Ingredient]
    stage: CookingStageEnum
    dish_prediction: DishPrediction
    instructions: list[CookingStep]
    remaining_time: str
    tips: list[str]
    copilot: CopilotSuggestion
    nutrition: NutritionEstimate
    spice_recommendations: list[SpiceRecommendation] = []
    cuisine_style: str = "International"
    language: str = "en"


class AnalysisRequest(BaseModel):
    """Request to analyze a food image."""
    language: str = "en"
    cuisine_hint: Optional[str] = None


class RecipeGenerateRequest(BaseModel):
    """Request to generate a recipe from analysis results."""
    analysis_id: str
    servings: int = 2
    dietary_preferences: list[str] = []
    language: str = "en"


class DatasetEntry(BaseModel):
    """A single dataset entry for fine-tuning."""
    image_path: str
    prompt: str
    response: AnalysisResponse
    metadata: dict = {}


class DatasetGenerateRequest(BaseModel):
    """Request to generate synthetic dataset entries."""
    count: int = 10
    cuisine_filter: Optional[str] = None
    include_stages: list[CookingStageEnum] = []


class PantryItem(BaseModel):
    """An item in the user's pantry."""
    id: str
    name: str
    emoji: str = "🥫"
    quantity: Optional[str] = None
    category: str = "Other"
    added_at: str


class HealthResponse(BaseModel):
    status: str = "healthy"
    version: str
    mock_mode: bool
