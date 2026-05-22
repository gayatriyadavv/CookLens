"""Analysis Router — image upload and AI analysis endpoints."""
import os
import uuid
import logging

from fastapi import APIRouter, File, UploadFile, Query, HTTPException

from app.config import settings
from app.models.schemas import AnalysisResponse
from app.services.ai_service import ai_service
from app.services.recipe_service import recipe_service

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Analysis"])


@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_image(
    file: UploadFile = File(..., description="Food image to analyze"),
    language: str = Query("en", description="Response language code"),
    cuisine_hint: str | None = Query(None, description="Optional cuisine hint (e.g. 'Indian')"),
):
    """Upload a food image and receive AI-powered cooking analysis."""

    # Validate file type
    if file.content_type and not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an image.")

    # Read & size-check
    image_bytes = await file.read()
    if len(image_bytes) > settings.MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail=f"File too large. Maximum size is {settings.MAX_FILE_SIZE // (1024 * 1024)} MB.",
        )

    # Save the upload for reference
    file_id = str(uuid.uuid4())
    ext = os.path.splitext(file.filename or "image.jpg")[1] or ".jpg"
    save_path = os.path.join(settings.UPLOAD_DIR, f"{file_id}{ext}")

    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    with open(save_path, "wb") as f:
        f.write(image_bytes)

    logger.info("Saved upload to %s (%d bytes)", save_path, len(image_bytes))

    # FIX #3/#4 — capture actual MIME type and forward it to the AI service
    mime_type = file.content_type or "image/jpeg"

    # Run AI analysis
    analysis = await ai_service.analyze_image(
        image_bytes,
        language,
        cuisine_hint,
        mime_type=mime_type,   # pass real MIME type — no more hardcoded jpeg
    )
    analysis.image_url = f"/uploads/{file_id}{ext}"

    # Persist to history
    recipe_service.save_analysis(analysis)

    # Register this real upload in the dataset pool
    try:
        from app.services.dataset_service import dataset_service
        dataset_service.register_real_upload(analysis, save_path)
    except Exception as d_exc:
        logger.warning("Failed to register upload in dataset pool: %s", d_exc)

    return analysis


@router.get("/analyze/{analysis_id}", response_model=AnalysisResponse)
async def get_analysis(analysis_id: str):
    """Retrieve a previous analysis by its ID."""
    result = recipe_service.get_analysis(analysis_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Analysis not found.")
    return result
