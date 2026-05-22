"""Recipe Service — in-memory storage for analysis history."""
import uuid
from app.models.schemas import AnalysisResponse


class RecipeService:
    """Manages an in-memory list of past analysis results."""

    def __init__(self):
        self._history: dict[str, AnalysisResponse] = {}

    def save_analysis(self, analysis: AnalysisResponse) -> str:
        """Persist an analysis and return its ID."""
        if not analysis.id:
            analysis.id = str(uuid.uuid4())
        self._history[analysis.id] = analysis
        return analysis.id

    def get_analysis(self, analysis_id: str) -> AnalysisResponse | None:
        """Retrieve an analysis by ID, or None if not found."""
        return self._history.get(analysis_id)

    def get_history(self) -> list[AnalysisResponse]:
        """Return all stored analyses (newest first)."""
        return list(reversed(self._history.values()))

    def clear_history(self) -> int:
        """Clear all stored analyses. Returns the count deleted."""
        count = len(self._history)
        self._history.clear()
        return count


# Module-level singleton
recipe_service = RecipeService()
