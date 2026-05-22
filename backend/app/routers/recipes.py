"""Recipes Router — recipe generation and history endpoints."""
import logging

from fastapi import APIRouter, HTTPException

from app.models.schemas import AnalysisResponse, RecipeGenerateRequest
from app.services.ai_service import ai_service
from app.services.recipe_service import recipe_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/recipes", tags=["Recipes"])


@router.post("/generate", response_model=AnalysisResponse)
async def generate_recipe(request: RecipeGenerateRequest):
    """Generate a detailed recipe from a previous analysis."""

    analysis = recipe_service.get_analysis(request.analysis_id)
    if analysis is None:
        raise HTTPException(
            status_code=404,
            detail=f"Analysis '{request.analysis_id}' not found. Upload an image first.",
        )

    enhanced = await ai_service.generate_recipe(analysis, request.servings)

    # Save the enhanced version
    recipe_service.save_analysis(enhanced)

    return enhanced


@router.get("/history", response_model=list[AnalysisResponse])
async def get_history():
    """Return all past analyses (newest first)."""
    return recipe_service.get_history()


@router.delete("/history")
async def clear_history():
    """Clear all stored analyses."""
    count = recipe_service.clear_history()
    return {"message": f"Cleared {count} analysis record(s)."}
