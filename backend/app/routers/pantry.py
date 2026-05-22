"""Pantry Router — in-memory pantry tracking and dish suggestions."""
import logging
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException

from app.models.schemas import PantryItem
from app.data.mock_responses import MOCK_RESPONSES

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/pantry", tags=["Pantry"])

# In-memory pantry store (keyed by item ID)
_pantry: dict[str, PantryItem] = {}


@router.get("", response_model=list[PantryItem])
async def list_pantry():
    """List all items currently in the pantry."""
    return list(_pantry.values())


@router.post("", response_model=PantryItem, status_code=201)
async def add_item(item: PantryItem):
    """Add an item to the pantry."""
    if not item.id:
        item.id = str(uuid.uuid4())
    if not item.added_at:
        item.added_at = datetime.now(timezone.utc).isoformat()
    _pantry[item.id] = item
    return item


@router.delete("/{item_id}")
async def remove_item(item_id: str):
    """Remove an item from the pantry by ID."""
    if item_id not in _pantry:
        raise HTTPException(status_code=404, detail="Pantry item not found.")
    del _pantry[item_id]
    return {"message": f"Item '{item_id}' removed from pantry."}


@router.get("/suggestions")
async def get_suggestions():
    """Suggest possible dishes based on current pantry contents.

    Matches pantry item names against ingredients in the mock dataset
    and returns dishes sorted by ingredient-match percentage.
    """
    if not _pantry:
        return {
            "suggestions": [],
            "message": "Your pantry is empty. Add some ingredients first!",
        }

    pantry_names = {item.name.lower() for item in _pantry.values()}

    scored: list[dict] = []
    for mock in MOCK_RESPONSES:
        ingredient_names = {ing.name.lower() for ing in mock.ingredients}
        matched = pantry_names & ingredient_names
        if matched:
            match_pct = round(len(matched) / len(ingredient_names) * 100, 1)
            scored.append({
                "dish": mock.dish_prediction.name,
                "cuisine": mock.dish_prediction.cuisine,
                "matched_ingredients": sorted(matched),
                "total_ingredients": len(ingredient_names),
                "match_percent": match_pct,
            })

    scored.sort(key=lambda d: d["match_percent"], reverse=True)

    return {
        "pantry_count": len(_pantry),
        "suggestions": scored[:10],
        "message": f"Found {len(scored)} possible dish(es) based on your pantry.",
    }
