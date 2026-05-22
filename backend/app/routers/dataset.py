"""Dataset Router — synthetic dataset generation, statistics, and browser downloads."""
import os
import logging
from fastapi import APIRouter, Query, HTTPException
from fastapi.responses import FileResponse

from app.models.schemas import DatasetGenerateRequest, DatasetEntry
from app.services.dataset_service import dataset_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/dataset", tags=["Dataset"])

# Define temporary exports folder inside workspace directory boundary
EXPORTS_DIR = os.path.join("datasets", "exports")
os.makedirs(EXPORTS_DIR, exist_ok=True)


@router.post("/generate", response_model=list[DatasetEntry])
async def generate_dataset(request: DatasetGenerateRequest):
    """Generate synthetic dataset entries (including physical JPEG images drawn using Pillow)."""
    try:
        entries = dataset_service.generate_synthetic_prompts(
            count=request.count,
            cuisine=request.cuisine_filter,
        )
        return entries
    except Exception as e:
        logger.error(f"Failed to generate synthetic dataset: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")


@router.get("/stats")
async def get_stats():
    """Return aggregate live statistics over all dataset entries."""
    try:
        return dataset_service.get_stats()
    except Exception as e:
        logger.error(f"Failed to load dataset stats: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to load statistics")


@router.get("/entries", response_model=list[DatasetEntry])
async def get_entries():
    """Get all dataset entries in the pool."""
    try:
        return dataset_service._entries
    except Exception as e:
        logger.error(f"Failed to load dataset entries: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to load entries")


@router.post("/export")
async def export_dataset():
    """Export all generated dataset entries as JSON."""
    try:
        return dataset_service.export_dataset()
    except Exception as e:
        logger.error(f"Failed to export dataset: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Export failed")


@router.get("/download")
async def download_dataset(format: str = Query("zip", description="Format to download: 'zip', 'csv', or 'json'")):
    """Stream browser downloads of the dataset package in ZIP, CSV, or JSON formats."""
    stats = dataset_service.get_stats()
    if stats["total"] == 0:
        raise HTTPException(status_code=400, detail="Cannot download an empty dataset. Please generate data first.")

    try:
        # Create clear workspace sub-folders
        os.makedirs(EXPORTS_DIR, exist_ok=True)
        
        if format == "zip":
            # Generate the full training ZIP package with 70/15/15 splits
            zip_path = dataset_service.generate_zip_package(EXPORTS_DIR)
            if not os.path.exists(zip_path):
                raise HTTPException(status_code=500, detail="ZIP compilation failed.")
            
            logger.info(f"Streaming ZIP package download: {zip_path}")
            return FileResponse(
                path=zip_path,
                media_type="application/zip",
                filename="cooklens_ml_dataset.zip"
            )
            
        elif format == "csv":
            # Export labels CSV representing the complete dataset pool
            csv_path = os.path.join(EXPORTS_DIR, "cooklens_dataset_labels.csv")
            entries = dataset_service.export_dataset()["entries"]
            flat_items = []
            for entry in entries:
                flat_items.append({
                    "image": os.path.basename(entry["image_path"]),
                    "ingredients": [i["name"] for i in entry["response"]["ingredients"]],
                    "cuisine": entry["response"]["dish_prediction"]["cuisine"],
                    "stage": entry["metadata"].get("stage", "cooking"),
                    "dish_prediction": entry["response"]["dish_prediction"]["name"],
                    "instruction": entry["response"]["instructions"][0]["instruction"] if entry["response"]["instructions"] else "Cook slowly",
                    "confidence": entry["response"]["dish_prediction"]["confidence"]
                })
            
            dataset_service._write_csv_labels(csv_path, flat_items)
            
            logger.info(f"Streaming CSV labels download: {csv_path}")
            return FileResponse(
                path=csv_path,
                media_type="text/csv",
                filename="cooklens_dataset_labels.csv"
            )
            
        elif format == "json":
            # Export raw JSON annotations database
            json_path = os.path.join(EXPORTS_DIR, "cooklens_dataset_annotations.json")
            entries_data = dataset_service.export_dataset()
            with open(json_path, "w", encoding="utf-8") as f:
                json.dump(entries_data, f, indent=2, ensure_ascii=False)
                
            logger.info(f"Streaming JSON annotations download: {json_path}")
            return FileResponse(
                path=json_path,
                media_type="application/json",
                filename="cooklens_dataset_annotations.json"
            )
            
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported format '{format}'. Use 'zip', 'csv', or 'json'.")
            
    except Exception as e:
        logger.error(f"Download request failed for format {format}: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Download failed: {str(e)}")
