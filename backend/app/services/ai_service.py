"""AI Service — wraps Google Gemini (via OpenAI-compatible endpoint) with robust multi-stage reasoning."""
import base64
import json
import logging
import uuid
import time

from openai import AsyncOpenAI
from fastapi import HTTPException

from app.config import settings
from app.data.mock_responses import get_random_mock, get_mock_by_cuisine
from app.models.schemas import (
    AnalysisResponse,
    Ingredient,
    CookingStep,
    DishPrediction,
    CopilotSuggestion,
    NutritionEstimate,
    SpiceRecommendation,
    CookingStageEnum,
)

logger = logging.getLogger(__name__)

# ── Stage alias map ──────────────────────────────────────────────────────────
# Gemini (or any LLM) may return plain-ASCII or short variants.
# Map them to exact CookingStageEnum values before matching.
STAGE_ALIASES: dict[str, str] = {
    "sauteing":          "sautéing",
    "saute":             "sautéing",
    "sautee":            "sautéing",
    "sauteeing":         "sautéing",
    "prep":              "preparation",
    "preparing":         "preparation",
    "almost done":       "almost_done",
    "almostdone":        "almost_done",
    "gravy thickening":  "gravy_thickening",
    "oil separating":    "oil_separating",
    "over cooked":       "overcooked",
    "over-cooked":       "overcooked",
}

# Strict 6-Stage VLM prompt for visual reasoning
ANALYSIS_SYSTEM_PROMPT = """You are a highly advanced Multi-Stage AI Vision Reasoning System for Culinary Analysis.
You must execute a 6-stage sequential analysis pipeline to inspect the food image. Think step-by-step.

### 6-STAGE PIPELINE:

STAGE 1: Visual Quality & Preprocessing Inspection
- Analyze the physical properties of the image (lighting, noise, camera blur, messy cookware, shadows, hostel-style cooking environments).
- Note if the environment is low-light, messy, or has reflections.

STAGE 2: Granular Ingredient Detection
- Detect visible raw/chopped/cooking ingredients, textures, shapes, grains (e.g. long-grain basmati rice vs short-grain, paneer vs tofu cubes, chopped onions, tomato paste, garlic pieces).

STAGE 3: Cuisine Style Inference
- Infer the culinary style, region, or specific sub-cuisine (e.g. Hyderabadi Indian, Punjabi Indian, Roman Italian, Central Mexican).

STAGE 4: Cooking Stage Classification
- Classify the precise stage of cooking. Choose exactly ONE of these values:
  "raw", "chopped", "preparation", "sautéing", "simmering", "frying", "boiling", "gravy_thickening", "oil_separating", "cooking", "almost_done", "done", "plated", "overcooked"
- CRITICAL CUES: Look for browning onions, separated oil at the margins (indicating the Punjabi 'bhuna' stage), boiling bubbles, steam, bubbling cheese, or beautifully plated finished items.

STAGE 5: Top Dish Predictions (Top-K)
- Generate a list of the top 3-5 most likely candidate dishes based on the detected ingredients, stage, and cuisine cues.
- Assign confidence scores (0.0 to 1.0) to each.
- CRITICAL UNCERTAINTY HANDLING: If the image is blurry, has low light, or is at a very early stage of cooking, do not confidently guess the wrong dish! Set the top prediction confidence to < 0.70, declare it as uncertain, and list the other top candidates in `alternatives`.

STAGE 6: Final Synthesis
- Synthesize all steps into a single structured culinary response matching the required schema.

---

### OUTPUT FORMAT:
Return ONLY a valid JSON object matching this exact structure:
{
  "visual_inspection": {
    "image_quality": "blurry | low-light | clear | high-contrast | noisy",
    "cookware_cleanliness": "messy | clean | well-used",
    "lighting_cues": "Hostel room/dim kitchen light | Natural light | Bright kitchen lamps",
    "oil_and_texture_notes": "E.g., visible oil pools, separated gravy, simmering steam bubbles"
  },
  "stage_reasoning": {
    "visual_indicators": "Describe why this stage was chosen (e.g., tomato skin curling, cheese melting)",
    "stage": "raw | chopped | preparation | sautéing | simmering | frying | boiling | gravy_thickening | oil_separating | cooking | almost_done | done | plated | overcooked"
  },
  "dish_prediction": {
    "name": "Winning Dish Name", 
    "cuisine": "Specific Cuisine Style", 
    "confidence": 0.92, 
    "description": "Short appetizing description of what's shown.",
    "reasoning": "Step-by-step reasoning log explaining how you reached this decision (Visual Cues -> Ingredients -> Cuisine -> Stage -> Match).",
    "alternatives": ["Alternative Candidate Dish 1", "Alternative Candidate Dish 2"]
  },
  "ingredients": [
    {"name": "Ingredient Name", "confidence": 0.95, "emoji": "🥑", "quantity": "E.g., 200g or 1 cup"}
  ],
  "instructions": [
    {"step_number": 1, "instruction": "Step instruction", "duration": "5 mins", "temperature": "Medium heat", "tip": "Pro tip"}
  ],
  "remaining_time": "15 minutes",
  "tips": [
    "Tip 1...", "Tip 2..."
  ],
  "copilot": {
    "next_step": "Next logical step in cooking based on current stage",
    "mistakes_detected": ["List of possible mistakes, like heat too high, or oil not separated yet"],
    "fixes": ["How to fix the detected mistakes"],
    "readiness_percent": 65,
    "readiness_label": "Simmering Base"
  },
  "nutrition": {
    "calories": 450,
    "protein_g": 18.5,
    "carbs_g": 32.0,
    "fat_g": 15.0,
    "fiber_g": 4.5,
    "tags": ["High Protein", "Gluten-Free"]
  },
  "spice_recommendations": [
    {"name": "Spice Name", "emoji": "🌶️", "reason": "Why this spice is recommended"}
  ],
  "cuisine_style": "Cuisine region style"
}

CRITICAL RULES:
- Return ONLY valid JSON, do NOT wrap it in ```json ... ``` markdown fences.
- All numbers for confidence must be floats between 0.0 and 1.0.
- All numbers for readiness_percent must be floats/ints between 0 and 100.
- If confidence is < 0.70, you must list at least 2 realistic `alternatives`.
- Be extremely accurate and rigorous about Indian dishes (e.g., Biryani vs Pulao, Paneer Masala vs Tofu Curry).
"""

RECIPE_SYSTEM_PROMPT = """You are CookLens, an expert master chef AI.
Given the following food analysis, generate a more detailed recipe adjusted for {servings} servings.
Ensure the instructions are professional, detailed, and clear.
Return ONLY valid JSON matching the same AnalysisResponse schema. Do not write markdown fences or explanations."""


class AIService:
    """Handles AI-powered image analysis and recipe generation using Google Gemini."""

    def __init__(self):
        api_key = settings.GEMINI_API_KEY
        if not api_key:
            logger.warning(
                "GEMINI_API_KEY is not configured. Real VLM mode will fail. "
                "Get a free key at https://aistudio.google.com/apikey"
            )

        # Use OpenAI client pointed at Gemini's OpenAI-compatible endpoint
        self.client = AsyncOpenAI(
            api_key=api_key or "not-set",
            base_url=settings.AI_BASE_URL,
        )
        self.model = settings.AI_MODEL

    async def analyze_image(
        self,
        image_bytes: bytes,
        language: str = "en",
        cuisine_hint: str | None = None,
        mime_type: str = "image/jpeg",   # FIX #3/#4 — accept actual MIME type
    ) -> AnalysisResponse:
        """Analyze a food image using Gemini vision, executing a strict 6-stage reasoning pipeline."""

        # Fast-path: mock data
        if settings.USE_MOCK_DATA:
            logger.info("🍳 [Mock Mode] Returning high-quality culinary mock responses.")
            if cuisine_hint:
                return get_mock_by_cuisine(cuisine_hint)
            return get_random_mock()

        # Guard: key must be present
        if not settings.GEMINI_API_KEY:
            logger.error("❌ Real Vision API requested, but GEMINI_API_KEY is not configured!")
            raise HTTPException(
                status_code=500,
                detail=(
                    "Inference Engine Error: GEMINI_API_KEY is missing. "
                    "Set it in your .env file. Get a free key at https://aistudio.google.com/apikey"
                ),
            )

        # Sanitize MIME type — Gemini supports jpeg, png, webp, gif
        supported_mime_types = {"image/jpeg", "image/png", "image/webp", "image/gif"}
        safe_mime = mime_type if mime_type in supported_mime_types else "image/jpeg"
        if safe_mime != mime_type:
            logger.warning("Unsupported MIME type '%s' — coercing to image/jpeg", mime_type)

        start_time = time.time()
        logger.info("🔍 [Inference Pipeline] Step 1: Initializing Gemini Vision Pipeline")

        try:
            image_b64 = base64.b64encode(image_bytes).decode("utf-8")
            logger.info("🔍 [Inference Pipeline] Step 2: Image preprocessed. Size: %d bytes.", len(image_bytes))

            user_content = [
                {
                    "type": "text",
                    "text": self._build_analysis_prompt(language, cuisine_hint),
                },
                {
                    "type": "image_url",
                    # FIX #3 — use actual mime type, not hardcoded jpeg
                    "image_url": {"url": f"data:{safe_mime};base64,{image_b64}"},
                },
            ]

            logger.info("🔍 [Inference Pipeline] Step 3: Sending request to Gemini API using model: %s", self.model)

            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": ANALYSIS_SYSTEM_PROMPT},
                    {"role": "user", "content": user_content},
                ],
                max_tokens=3000,
                temperature=0.3,
            )

            raw_text = response.choices[0].message.content or ""
            duration = time.time() - start_time
            logger.info("🔍 [Inference Pipeline] Step 4: Gemini response received in %.2f seconds.", duration)

            parsed_response = self._parse_analysis(raw_text, language)
            self._log_debug_report(parsed_response)
            return parsed_response

        except HTTPException:
            raise
        except Exception as exc:
            duration = time.time() - start_time
            logger.error("❌ [Inference Pipeline] Failed after %.2f seconds: %s", duration, str(exc), exc_info=True)
            raise HTTPException(
                status_code=502,
                detail=f"Inference Engine failed to analyze image: {str(exc)}",
            )

    async def generate_recipe(
        self,
        analysis: AnalysisResponse,
        servings: int = 2,
    ) -> AnalysisResponse:
        """Enhance an existing analysis with a more detailed recipe for *servings*."""

        if settings.USE_MOCK_DATA:
            return self._scale_mock_recipe(analysis, servings)

        if not settings.GEMINI_API_KEY:
            raise HTTPException(
                status_code=500,
                detail="Inference Engine Error: GEMINI_API_KEY is missing.",
            )

        try:
            logger.info("🍳 [Recipe Generator] Generating custom recipe for servings: %d", servings)
            prompt = RECIPE_SYSTEM_PROMPT.format(servings=servings)
            analysis_json = analysis.model_dump_json()

            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": prompt},
                    {"role": "user", "content": analysis_json},
                ],
                max_tokens=2048,
                temperature=0.3,
            )

            raw_text = response.choices[0].message.content or ""
            return self._parse_analysis(raw_text, analysis.language)

        except HTTPException:
            raise
        except Exception as exc:
            logger.error("❌ [Recipe Generator] Failed: %s", exc, exc_info=True)
            raise HTTPException(
                status_code=502,
                detail=f"Failed to generate recipe: {str(exc)}",
            )

    @staticmethod
    def _build_analysis_prompt(language: str, cuisine_hint: str | None) -> str:
        parts = ["Analyze this cooking image following the 6-stage visual reasoning pipeline."]
        if cuisine_hint:
            parts.append(f"Cuisine cue is: {cuisine_hint}.")
        if language != "en":
            parts.append(f"Respond in {language} where possible.")
        return " ".join(parts)

    @staticmethod
    def _parse_analysis(raw_text: str, language: str = "en") -> AnalysisResponse:
        """Parse raw JSON text from the AI into an AnalysisResponse."""
        text = raw_text.strip()
        # Strip markdown fences if the model ignored system prompt instructions
        if text.startswith("```"):
            lines = text.split("\n")
            if lines[0].startswith("```json") or lines[0] == "```":
                lines = lines[1:]
            if lines[-1] == "```":
                lines = lines[:-1]
            text = "\n".join(lines).strip()

        try:
            data = json.loads(text)
        except json.JSONDecodeError as e:
            logger.error("Failed to decode VLM response as JSON: %s\nRaw output: %s", e, raw_text)
            raise ValueError(f"Invalid JSON returned from vision engine: {e}")

        # ── FIX #5: Normalize stage string before enum lookup ──────────────
        stage_str = (
            data.get("stage_reasoning", {}).get("stage")
            or data.get("stage")
            or "cooking"
        )
        stage_str = str(stage_str).strip().lower()
        # Resolve known aliases (e.g. "sauteing" → "sautéing", "prep" → "preparation")
        stage_str = STAGE_ALIASES.get(stage_str, stage_str)

        stage_val = "cooking"
        for enum_member in CookingStageEnum:
            if enum_member.value == stage_str:
                stage_val = enum_member.value
                break
        else:
            logger.warning(
                "Unknown cooking stage '%s' returned by model — defaulting to 'cooking'.", stage_str
            )

        dish_data = data.get("dish_prediction", {})

        return AnalysisResponse(
            id=str(uuid.uuid4()),
            ingredients=[
                Ingredient(
                    name=i.get("name", "Unknown"),
                    confidence=float(i.get("confidence", 0.80)),
                    emoji=i.get("emoji", "🥘"),
                    quantity=i.get("quantity"),
                )
                for i in data.get("ingredients", [])
            ],
            stage=CookingStageEnum(stage_val),
            dish_prediction=DishPrediction(
                name=dish_data.get("name", "Unknown Dish"),
                cuisine=dish_data.get("cuisine", "Unknown"),
                confidence=float(dish_data.get("confidence", 0.50)),
                description=dish_data.get("description", ""),
                alternatives=dish_data.get("alternatives", []),
                reasoning=dish_data.get("reasoning", ""),
            ),
            instructions=[
                CookingStep(
                    step_number=int(s.get("step_number", idx + 1)),
                    instruction=s.get("instruction", ""),
                    duration=s.get("duration"),
                    temperature=s.get("temperature"),
                    tip=s.get("tip"),
                )
                for idx, s in enumerate(data.get("instructions", []))
            ],
            remaining_time=data.get("remaining_time", "Unknown"),
            tips=data.get("tips", []),
            copilot=CopilotSuggestion(
                next_step=data.get("copilot", {}).get("next_step", "Continue cooking"),
                mistakes_detected=data.get("copilot", {}).get("mistakes_detected", []),
                fixes=data.get("copilot", {}).get("fixes", []),
                readiness_percent=float(data.get("copilot", {}).get("readiness_percent", 50.0)),
                readiness_label=data.get("copilot", {}).get("readiness_label", "In Progress"),
            ),
            nutrition=NutritionEstimate(
                calories=int(data.get("nutrition", {}).get("calories", 0)),
                protein_g=float(data.get("nutrition", {}).get("protein_g", 0.0)),
                carbs_g=float(data.get("nutrition", {}).get("carbs_g", 0.0)),
                fat_g=float(data.get("nutrition", {}).get("fat_g", 0.0)),
                fiber_g=float(data.get("nutrition", {}).get("fiber_g", 0.0)),
                tags=data.get("nutrition", {}).get("tags", []),
            ),
            spice_recommendations=[
                SpiceRecommendation(
                    name=s.get("name", ""),
                    emoji=s.get("emoji", "🌿"),
                    reason=s.get("reason", ""),
                )
                for s in data.get("spice_recommendations", [])
            ],
            cuisine_style=data.get("cuisine_style", "International"),
            language=language,
        )

    @staticmethod
    def _log_debug_report(res: AnalysisResponse) -> None:
        """Output advanced debugging details to console."""
        logger.info("==================================================")
        logger.info("🔍 [GEMINI INFERENCE DEBUG REPORT]")
        logger.info("==================================================")
        logger.info("Dish Name:       %s", res.dish_prediction.name)
        logger.info("Cuisine:         %s (%s)", res.dish_prediction.cuisine, res.cuisine_style)
        logger.info("Cooking Stage:   %s", res.stage.value)
        logger.info("Confidence:      %.1f%%", res.dish_prediction.confidence * 100)
        logger.info("Is Low Conf:     %s", res.dish_prediction.confidence < 0.70)
        if res.dish_prediction.alternatives:
            logger.info("Alternatives:    %s", ", ".join(res.dish_prediction.alternatives))
        logger.info("--------------------------------------------------")
        logger.info("Detected Ingredients:")
        for ing in res.ingredients:
            logger.info(" - %s %s (%s, Conf: %.0f%%)", ing.emoji, ing.name, ing.quantity or "N/A", ing.confidence * 100)
        logger.info("--------------------------------------------------")
        logger.info("Chain-of-Thought Reasoning:")
        logger.info("%s", res.dish_prediction.reasoning)
        logger.info("==================================================")

    @staticmethod
    def _scale_mock_recipe(analysis: AnalysisResponse, servings: int) -> AnalysisResponse:
        """Return a copy of the analysis adjusted for serving count."""
        scaled = analysis.model_copy(deep=True)
        scaled.id = str(uuid.uuid4())
        scaled.tips = [
            f"Recipe scaled for {servings} serving(s) using CookLens AI.",
            *scaled.tips,
        ]
        return scaled


# Module-level singleton
ai_service = AIService()
