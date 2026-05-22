"""Dataset Service — synthetic and hybrid dataset generation for ML fine-tuning."""
import os
import json
import csv
import shutil
import random
import uuid
import logging
import zipfile
from PIL import Image, ImageDraw

from app.models.schemas import DatasetEntry, AnalysisResponse, CookingStageEnum, Ingredient, DishPrediction, CookingStep, NutritionEstimate
from app.config import settings

logger = logging.getLogger(__name__)

# Persistent JSON storage for the dataset pool
DATASET_DIR = "datasets"
DATASET_POOL_PATH = os.path.join(DATASET_DIR, "dataset_pool.json")
IMAGES_DIR = os.path.join(DATASET_DIR, "images")

# A rich collection of realistic Indian and global dishes to avoid generic repetitiveness
_DISH_TEMPLATES = [
    {
        "name": "Hyderabadi Chicken Biryani",
        "cuisine": "Indian",
        "ingredients": [
            {"name": "Basmati rice", "emoji": "🍚", "quantity": "500g"},
            {"name": "Chicken thighs", "emoji": "🍗", "quantity": "600g"},
            {"name": "Saffron", "emoji": "🟡", "quantity": "A pinch"},
            {"name": "Ghee", "emoji": "🧈", "quantity": "3 tbsp"},
            {"name": "Fried onions", "emoji": "🧅", "quantity": "1 cup"},
            {"name": "Cardamom", "emoji": "🫛", "quantity": "4 pcs"}
        ],
        "instructions": [
            "Wash and soak basmati rice for 30 minutes.",
            "Marinate chicken in spiced yogurt, ginger-garlic paste and mint.",
            "Par-boil rice with whole spices until 70% cooked.",
            "Layer marinated chicken and par-boiled rice in a heavy-bottomed pot.",
            "Pour saffron milk and ghee over the top layer.",
            "Seal pot with dough and slow-cook (dum) on low flame until aromatic."
        ],
        "nutrition": {"calories": 620, "protein_g": 38.0, "carbs_g": 68.0, "fat_g": 20.0, "fiber_g": 3.0},
        "color": (245, 158, 11)  # Warm saffron saffron-gold
    },
    {
        "name": "Paneer Butter Masala",
        "cuisine": "Indian",
        "ingredients": [
            {"name": "Paneer cubes", "emoji": "🧀", "quantity": "250g"},
            {"name": "Butter", "emoji": "🧈", "quantity": "2 tbsp"},
            {"name": "Heavy cream", "emoji": "🥛", "quantity": "3 tbsp"},
            {"name": "Tomato paste", "emoji": "🍅", "quantity": "200ml"},
            {"name": "Kashmiri red chilli", "emoji": "🌶️", "quantity": "1.5 tsp"},
            {"name": "Kasuri methi", "emoji": "🍃", "quantity": "1 tsp"}
        ],
        "instructions": [
            "Sauté ginger-garlic paste and onions in butter.",
            "Add tomato purée and Kashmiri red chilli powder, cook until oil separates.",
            "Pour in water, simmer, and blend into a silky smooth gravy.",
            "Add paneer cubes and simmer on low heat.",
            "Stir in heavy cream and crushed kasuri methi."
        ],
        "nutrition": {"calories": 480, "protein_g": 18.0, "carbs_g": 12.0, "fat_g": 38.0, "fiber_g": 2.0},
        "color": (239, 68, 68)  # Rich red-orange curry
    },
    {
        "name": "Masala Dosa",
        "cuisine": "Indian",
        "ingredients": [
            {"name": "Fermented rice batter", "emoji": "🥣", "quantity": "2 cups"},
            {"name": "Potatoes", "emoji": "🥔", "quantity": "300g"},
            {"name": "Mustard seeds", "emoji": "🟤", "quantity": "1 tsp"},
            {"name": "Curry leaves", "emoji": "🍃", "quantity": "10 pcs"},
            {"name": "Turmeric powder", "emoji": "🟡", "quantity": "0.5 tsp"},
            {"name": "Green chillies", "emoji": "🌶️", "quantity": "2 pcs"}
        ],
        "instructions": [
            "Boil potatoes, peel and mash them roughly.",
            "Sauté mustard seeds, curry leaves, green chillies and onions in oil.",
            "Add mashed potatoes, turmeric and salt. Mix thoroughly.",
            "Spread dosa batter thinly onto a hot greased griddle in circles.",
            "Drizzle ghee around the edges until crisp and golden brown.",
            "Place potato stuffing in the center, fold and serve hot."
        ],
        "nutrition": {"calories": 340, "protein_g": 6.5, "carbs_g": 52.0, "fat_g": 12.0, "fiber_g": 4.0},
        "color": (202, 138, 4)  # Crispy golden yellow
    },
    {
        "name": "Dal Makhani",
        "cuisine": "Indian",
        "ingredients": [
            {"name": "Black urad dal", "emoji": "🫘", "quantity": "1 cup"},
            {"name": "Kidney beans (rajma)", "emoji": "🫘", "quantity": "0.25 cup"},
            {"name": "Butter", "emoji": "🧈", "quantity": "4 tbsp"},
            {"name": "Heavy cream", "emoji": "🥛", "quantity": "0.5 cup"},
            {"name": "Ginger-garlic paste", "emoji": "🧄", "quantity": "1 tbsp"}
        ],
        "instructions": [
            "Soak black lentils and kidney beans overnight.",
            "Pressure cook until lentils are completely soft and mushy.",
            "Simmer dal with tomato purée, butter and ginger on extremely low heat.",
            "Mash lentils slowly with the back of a spoon to create creaminess.",
            "Stir in heavy cream and finish with a huge knob of fresh butter."
        ],
        "nutrition": {"calories": 420, "protein_g": 16.0, "carbs_g": 38.0, "fat_g": 24.0, "fiber_g": 8.0},
        "color": (78, 51, 38)  # Deep dark brown
    },
    {
        "name": "Pasta Carbonara",
        "cuisine": "Italian",
        "ingredients": [
            {"name": "Spaghetti", "emoji": "🍝", "quantity": "400g"},
            {"name": "Guanciale", "emoji": "🥓", "quantity": "150g"},
            {"name": "Egg yolks", "emoji": "🥚", "quantity": "4 pcs"},
            {"name": "Pecorino Romano", "emoji": "🧀", "quantity": "100g"},
            {"name": "Black pepper", "emoji": "🫚", "quantity": "2 tsp"}
        ],
        "instructions": [
            "Boil spaghetti in salted water until al dente.",
            "Crisp sliced guanciale in a cold pan until fat renders.",
            "Whisk egg yolks, Pecorino cheese and plenty of cracked pepper.",
            "Remove pan from heat, add pasta to rendered guanciale.",
            "Pour in the egg yolk-cheese mixture and toss vigorously off-heat."
        ],
        "nutrition": {"calories": 640, "protein_g": 28.0, "carbs_g": 62.0, "fat_g": 30.0, "fiber_g": 2.5},
        "color": (254, 240, 138)  # Creamy yellow
    },
    {
        "name": "Salmon Avocado Sushi",
        "cuisine": "Japanese",
        "ingredients": [
            {"name": "Sushi rice", "emoji": "🍚", "quantity": "300g"},
            {"name": "Nori seaweed", "emoji": "🥬", "quantity": "4 sheets"},
            {"name": "Fresh salmon", "emoji": "🐟", "quantity": "200g"},
            {"name": "Avocado", "emoji": "🥑", "quantity": "1 pc"}
        ],
        "instructions": [
            "Cook sushi rice and season with sweet rice vinegar.",
            "Place nori sheet onto a rolling bamboo mat.",
            "Spread seasoned rice evenly over nori, leaving borders.",
            "Place fresh salmon strips and avocado slices in the middle.",
            "Roll tightly, slice into rounds with a wet knife and plate."
        ],
        "nutrition": {"calories": 380, "protein_g": 24.0, "carbs_g": 46.0, "fat_g": 10.0, "fiber_g": 3.0},
        "color": (244, 63, 94)  # Coral pink / salmon
    },
    {
        "name": "Thai Green Curry",
        "cuisine": "Thai",
        "ingredients": [
            {"name": "Green curry paste", "emoji": "🥣", "quantity": "3 tbsp"},
            {"name": "Coconut milk", "emoji": "🥛", "quantity": "400ml"},
            {"name": "Chicken breast", "emoji": "🍗", "quantity": "400g"},
            {"name": "Thai eggplant", "emoji": "🍆", "quantity": "3 pcs"},
            {"name": "Bamboo shoots", "emoji": "🎋", "quantity": "100g"},
            {"name": "Kaffir lime leaves", "emoji": "🍃", "quantity": "4 leaves"}
        ],
        "instructions": [
            "Sauté green curry paste in coconut cream until fragrant.",
            "Add chicken slices and stir-fry until sealed.",
            "Pour in remaining coconut milk and bring to a simmer.",
            "Add eggplants and bamboo shoots, simmer until vegetables are cooked.",
            "Tear kaffir lime leaves, sprinkle Thai basil and serve with jasmine rice."
        ],
        "nutrition": {"calories": 460, "protein_g": 30.0, "carbs_g": 14.0, "fat_g": 32.0, "fiber_g": 4.0},
        "color": (34, 197, 94)  # Herb green
    }
]

_PROMPT_TEMPLATES = [
    "Analyze this image of {dish} being cooked. Note the ingredients and cooking stage.",
    "What stage is this {dish} at? Is it ready to serve?",
    "Detect visible ingredients in this {cuisine} cooking photo of {dish}.",
    "Identify progress for cooking {dish}. How long is remaining?",
    "Provide culinary copilot analysis for this {dish} image."
]


class DatasetService:
    """Generates, stores and exports synthetic and real hybrid datasets."""

    def __init__(self):
        # Create storage directories
        os.makedirs(DATASET_DIR, exist_ok=True)
        os.makedirs(IMAGES_DIR, exist_ok=True)
        self._entries: list[DatasetEntry] = []
        self._load_pool()

    def _load_pool(self):
        """Load dataset entries from persistent JSON file."""
        if os.path.exists(DATASET_POOL_PATH):
            try:
                with open(DATASET_POOL_PATH, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    self._entries = [DatasetEntry(**entry) for entry in data]
                logger.info(f"Loaded {len(self._entries)} dataset entries from {DATASET_POOL_PATH}")
            except Exception as e:
                logger.error(f"Failed to load dataset pool: {e}", exc_info=True)
                self._entries = []

    def _save_pool(self):
        """Save dataset entries to persistent JSON file."""
        try:
            with open(DATASET_POOL_PATH, "w", encoding="utf-8") as f:
                json.dump([e.model_dump() for e in self._entries], f, indent=2, ensure_ascii=False)
            logger.info(f"Saved {len(self._entries)} dataset entries to {DATASET_POOL_PATH}")
        except Exception as e:
            logger.error(f"Failed to save dataset pool: {e}", exc_info=True)

    def register_real_upload(self, analysis: AnalysisResponse, local_image_path: str):
        """Add a real user upload and its AI analysis to the dataset pool."""
        # Copy image file to datasets folder to preserve reference
        file_id = os.path.basename(local_image_path)
        dest_path = os.path.join(IMAGES_DIR, file_id)
        
        try:
            if os.path.exists(local_image_path):
                shutil.copy2(local_image_path, dest_path)
                logger.info(f"Copied real upload image to dataset pool: {dest_path}")
            
            # Create a dataset entry mapping
            entry = DatasetEntry(
                image_path=f"datasets/images/{file_id}",
                prompt=f"Identify the ingredients and stage in this cooking image of {analysis.dish_prediction.name}.",
                response=analysis,
                metadata={
                    "source": "real_upload",
                    "cuisine": analysis.dish_prediction.cuisine,
                    "difficulty": "hard",
                    "stage": analysis.stage.value,
                    "created_at": str(uuid.uuid4())[:8]
                }
            )
            self._entries.append(entry)
            self._save_pool()
        except Exception as e:
            logger.error(f"Failed to register real upload in dataset: {e}", exc_info=True)

    def generate_synthetic_prompts(
        self,
        count: int = 10,
        cuisine: str | None = None,
    ) -> list[DatasetEntry]:
        """Create *count* synthetic dataset entries and programmatically draw JPEG food images."""
        entries: list[DatasetEntry] = []
        
        # Filter templates based on requested cuisine
        templates = _DISH_TEMPLATES
        if cuisine and cuisine != "All Cuisines":
            templates = [t for t in _DISH_TEMPLATES if t["cuisine"].lower() == cuisine.lower()]
            if not templates:  # Fallback if no matching cuisine found
                templates = _DISH_TEMPLATES

        stages = [s for s in CookingStageEnum]

        for i in range(count):
            dish = random.choice(templates)
            stage = random.choice(stages)
            
            # Create unique file name
            img_id = str(uuid.uuid4())[:12]
            filename = f"img_syn_{img_id}.jpg"
            image_relative_path = f"datasets/images/{filename}"
            image_absolute_path = os.path.join(IMAGES_DIR, filename)
            
            # STEP 1: Programmatically draw custom JPEG representations of food
            self._draw_culinary_image(dish["name"], dish["color"], stage.value, image_absolute_path)
            
            # STEP 2: Generate varied prompt
            prompt_template = random.choice(_PROMPT_TEMPLATES)
            prompt = prompt_template.format(
                dish=dish["name"],
                cuisine=dish["cuisine"]
            )
            
            # Create a detailed AnalysisResponse Pydantic object
            analysis_id = str(uuid.uuid4())
            
            ingredients_list = [
                Ingredient(
                    name=ing["name"],
                    confidence=round(random.uniform(0.85, 0.99), 2),
                    emoji=ing["emoji"],
                    quantity=ing["quantity"]
                )
                for ing in dish["ingredients"]
            ]
            
            instructions_list = [
                CookingStep(step_number=idx + 1, instruction=inst)
                for idx, inst in enumerate(dish["instructions"])
            ]

            response_obj = AnalysisResponse(
                id=analysis_id,
                image_url=f"/uploads/{filename}",  # Serveable URL in frontend
                ingredients=ingredients_list,
                stage=stage,
                dish_prediction=DishPrediction(
                    name=dish["name"],
                    cuisine=dish["cuisine"],
                    confidence=round(random.uniform(0.75, 0.98), 2),
                    description=f"A delicious looking {dish['name']} in a {stage.value} cooking stage.",
                    reasoning=f"Visual Cues -> Yellow saffron grains. Ingredients -> {', '.join([ing['name'] for ing in dish['ingredients'][:3]])}. Stage -> {stage.value}. Result -> {dish['name']}.",
                    alternatives=[t["name"] for t in templates if t["name"] != dish["name"]][:2]
                ),
                instructions=instructions_list,
                remaining_time=f"{random.choice([10, 15, 20, 30])} minutes" if stage.value != "done" else "0 minutes",
                tips=[
                    "Keep spices fresh for best results.",
                    "Sauté onions slowly to build deep, sweet base notes."
                ],
                copilot={
                    "next_step": f"Continue standard {stage.value} processing.",
                    "mistakes_detected": ["Heat slightly uneven"],
                    "fixes": ["Stir gently from the bottom of the pan"],
                    "readiness_percent": 100 if stage.value in ["done", "plated"] else random.randint(15, 85),
                    "readiness_label": f"Progress: {stage.value.capitalize()}"
                },
                nutrition=NutritionEstimate(**dish["nutrition"]),
                spice_recommendations=[],
                cuisine_style=dish["cuisine"],
                language="en"
            )

            entry = DatasetEntry(
                image_path=image_relative_path,
                prompt=prompt,
                response=response_obj,
                metadata={
                    "source": "synthetic",
                    "cuisine": dish["cuisine"],
                    "difficulty": random.choice(["easy", "medium", "hard"]),
                    "stage": stage.value,
                    "created_at": str(uuid.uuid4())[:8]
                }
            )
            entries.append(entry)

        self._entries.extend(entries)
        self._save_pool()
        return entries

    def export_dataset(self) -> dict:
        """Export entries as a JSON-serializable dict."""
        return {
            "count": len(self._entries),
            "entries": [e.model_dump() for e in self._entries],
        }

    def get_stats(self) -> dict:
        """Return aggregate statistics over all stored entries."""
        if not self._entries:
            return {"total": 0, "by_cuisine": {}, "by_stage": {}, "by_difficulty": {}}

        cuisines = {}
        stages = {}
        difficulties = {}

        for e in self._entries:
            c = e.metadata.get("cuisine", "Unknown")
            cuisines[c] = cuisines.get(c, 0) + 1
            
            s = e.metadata.get("stage", "unknown")
            stages[s] = stages.get(s, 0) + 1
            
            d = e.metadata.get("difficulty", "unknown")
            difficulties[d] = difficulties.get(d, 0) + 1

        return {
            "total": len(self._entries),
            "by_cuisine": cuisines,
            "by_stage": stages,
            "by_difficulty": difficulties,
        }

    def generate_zip_package(self, package_dir: str) -> str:
        """Build the complete ML-ready directory split (70% train, 15% val, 15% test) and zip it."""
        # 1. Setup clean export path structure
        export_root = os.path.join(package_dir, "dataset")
        images_export_dir = os.path.join(export_root, "images")
        metadata_export_dir = os.path.join(export_root, "metadata")
        
        train_dir = os.path.join(export_root, "train")
        val_dir = os.path.join(export_root, "validation")
        test_dir = os.path.join(export_root, "test")

        # Clear existing structure if present
        if os.path.exists(export_root):
            shutil.rmtree(export_root)

        os.makedirs(images_export_dir, exist_ok=True)
        os.makedirs(metadata_export_dir, exist_ok=True)
        os.makedirs(os.path.join(train_dir, "images"), exist_ok=True)
        os.makedirs(os.path.join(val_dir, "images"), exist_ok=True)
        os.makedirs(os.path.join(test_dir, "images"), exist_ok=True)

        # 2. Shuffle and divide entries into 70 / 15 / 15 splits
        entries_copy = list(self._entries)
        random.shuffle(entries_copy)
        n = len(entries_copy)
        
        train_end = int(n * 0.70)
        val_end = train_end + int(n * 0.15)

        splits = {
            "train": (entries_copy[:train_end], train_dir),
            "validation": (entries_copy[train_end:val_end], val_dir),
            "test": (entries_copy[val_end:], test_dir)
        }

        # Global and split specific labels datasets
        global_items = []

        # Copy images and populate metadata
        for split_name, (split_entries, split_path) in splits.items():
            split_items = []
            for entry in split_entries:
                orig_path = entry.image_path
                # Check absolute paths
                if not os.path.isabs(orig_path):
                    # Relative to project workspace root
                    orig_absolute_path = os.path.abspath(orig_path)
                else:
                    orig_absolute_path = orig_path

                filename = os.path.basename(orig_path)
                
                # Check if physical file exists
                if os.path.exists(orig_absolute_path):
                    # Copy to global images directory
                    shutil.copy2(orig_absolute_path, os.path.join(images_export_dir, filename))
                    # Copy to split images directory
                    shutil.copy2(orig_absolute_path, os.path.join(split_path, "images", filename))
                else:
                    # Create a quick placeholder in case of missing reference
                    logger.warning(f"File {orig_absolute_path} missing during export, generating quick recovery image.")
                    self._draw_culinary_image(
                        entry.response.dish_prediction.name, 
                        (200, 100, 50), 
                        entry.metadata.get("stage", "cooking"),
                        os.path.join(images_export_dir, filename)
                    )
                    shutil.copy2(os.path.join(images_export_dir, filename), os.path.join(split_path, "images", filename))

                item_meta = {
                    "image": filename,
                    "ingredients": [i.name for i in entry.response.ingredients],
                    "cuisine": entry.response.dish_prediction.cuisine,
                    "stage": entry.metadata.get("stage", "cooking"),
                    "dish_prediction": entry.response.dish_prediction.name,
                    "instruction": entry.response.instructions[0].instruction if entry.response.instructions else "Cook slowly",
                    "confidence": entry.response.dish_prediction.confidence
                }
                split_items.append(item_meta)
                global_items.append(item_meta)

            # Save split specific labels.csv
            csv_path = os.path.join(split_path, "labels.csv")
            self._write_csv_labels(csv_path, split_items)

        # 3. Save global metadata files
        # dataset.json
        with open(os.path.join(metadata_export_dir, "dataset.json"), "w", encoding="utf-8") as f:
            json.dump([e.model_dump() for e in entries_copy], f, indent=2, ensure_ascii=False)

        # labels.csv
        self._write_csv_labels(os.path.join(metadata_export_dir, "labels.csv"), global_items)

        # annotations.json (COCO or simple structured classification format)
        with open(os.path.join(metadata_export_dir, "annotations.json"), "w", encoding="utf-8") as f:
            json.dump(global_items, f, indent=2, ensure_ascii=False)

        # 4. Generate README.md
        self._create_readme(os.path.join(export_root, "README.md"), n, splits)

        # 5. Package into ZIP
        zip_path = os.path.join(package_dir, "cooklens_dataset_package.zip")
        if os.path.exists(zip_path):
            os.remove(zip_path)

        with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zip_file:
            for root, _, files in os.walk(export_root):
                for file in files:
                    file_absolute_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_absolute_path, export_root)
                    zip_file.write(file_absolute_path, arcname)

        logger.info(f"Successfully compiled ZIP package containing {n} items at {zip_path}")
        return zip_path

    @staticmethod
    def _write_csv_labels(path: str, items: list[dict]):
        """Write flat items to CSV format."""
        try:
            with open(path, "w", newline="", encoding="utf-8") as f:
                writer = csv.DictWriter(f, fieldnames=["image", "ingredients", "cuisine", "stage", "dish_prediction", "instruction", "confidence"])
                writer.writeheader()
                for i in items:
                    writer.writerow({
                        "image": i["image"],
                        "ingredients": ", ".join(i["ingredients"]),
                        "cuisine": i["cuisine"],
                        "stage": i["stage"],
                        "dish_prediction": i["dish_prediction"],
                        "instruction": i["instruction"],
                        "confidence": i["confidence"]
                    })
        except Exception as e:
            logger.error(f"Failed to write CSV labels to {path}: {e}")

    @staticmethod
    def _create_readme(path: str, count: int, splits: dict):
        """Create README.md describing the dataset structure and classes."""
        readme_content = f"""# CookLens AI Fine-Tuning Culinary Dataset

This is an ML-ready, production-grade cooking and ingredients dataset generated by the CookLens AI platform.
It includes both synthetic culinary images and real kitchen cooking photos annotated across multiple cuisines and stages.

## Dataset Statistics
- **Total Entries**: {count} items
- **Split Distribution**:
  - **Train**: {len(splits['train'][0])} entries (70%)
  - **Validation**: {len(splits['validation'][0])} entries (15%)
  - **Test**: {len(splits['test'][0])} entries (15%)

## Directory Structure
```
dataset/
├── images/             # All raw training/testing JPEG images
├── metadata/
│   ├── dataset.json    # Complete JSON annotations database
│   ├── labels.csv      # Flat tabular mapping for classifiers
│   └── annotations.json
├── train/
│   ├── images/         # Training image split
│   └── labels.csv      # Split labels
├── validation/
│   ├── images/         # Validation image split
│   └── labels.csv      # Split labels
└── test/
    ├── images/         # Test image split
    └── labels.csv      # Split labels
```

## Annotation Columns
- **image**: The target JPEG filename.
- **ingredients**: Comma-separated list of visible ingredients.
- **cuisine**: The culture of the dish (e.g. Indian, Italian, Japanese).
- **stage**: The current cooking state (e.g., sautéing, simmering, boiling, oil_separating).
- **dish_prediction**: The finalized name of the cooking dish.
- **instruction**: Next step of culinary action.
- **confidence**: Score from 0.0 to 1.0.

## Fine-Tuning Instructions
Use this dataset to fine-tune visual classification networks (e.g., ResNet, EfficientNet) or vision-language models (e.g., LLaVA, PaliGemma).
"""
        with open(path, "w", encoding="utf-8") as f:
            f.write(readme_content)

    @staticmethod
    def _draw_culinary_image(dish_name: str, base_color: tuple, stage: str, output_path: str):
        """Draw a beautiful Pillow-based abstract graphic matching food colors and stages."""
        img = Image.new("RGB", (512, 512), color=(20, 20, 25))
        draw = ImageDraw.Draw(img)

        # 1. Draw a skillet/pan or plate container
        draw.ellipse([40, 40, 472, 472], fill=(45, 45, 50), outline=(245, 158, 11, 40), width=4)
        
        # Draw a pot handle for sautéing/simmering stages
        if stage in ["sautéing", "simmering", "frying", "boiling"]:
            draw.rectangle([236, 450, 276, 512], fill=(25, 25, 25))

        # 2. Draw base food sauce/texture
        # For done/plated, draw clean white plate background
        if stage in ["done", "plated"]:
            draw.ellipse([70, 70, 442, 442], fill=(230, 230, 235))
            # Draw food color center
            draw.ellipse([100, 100, 412, 412], fill=base_color)
        else:
            # Draw raw pan contents
            draw.ellipse([80, 80, 432, 432], fill=base_color)

        # 3. Add stage-specific cooking details
        if stage in ["sautéing", "frying", "boiling", "oil_separating"]:
            # Draw boiling bubbles (small yellow/gold circles)
            for _ in range(30):
                bx = random.randint(110, 400)
                by = random.randint(110, 400)
                br = random.randint(4, 12)
                draw.ellipse([bx - br, by - br, bx + br, by + br], fill=(251, 191, 36, 180))

        if stage == "oil_separating":
            # Draw red-orange oil droplets around the margin circle
            for angle in range(0, 360, 15):
                import math
                rad = math.radians(angle)
                dist = random.randint(160, 175)
                ox = int(256 + dist * math.cos(rad))
                oy = int(256 + dist * math.sin(rad))
                draw.ellipse([ox - 6, oy - 6, ox + 6, oy + 6], fill=(220, 38, 38))

        if stage in ["simmering", "gravy_thickening"]:
            # Draw thick gravy waves (concentric oval arcs)
            draw.ellipse([140, 140, 372, 372], fill=None, outline=(252, 211, 77, 80), width=3)
            draw.ellipse([180, 180, 332, 332], fill=None, outline=(252, 211, 77, 60), width=2)

        # 4. Draw ingredient particles
        random.seed(len(dish_name)) # Deterministic per dish name
        for _ in range(15):
            ix = random.randint(130, 380)
            iy = random.randint(130, 380)
            
            # White rice specs or green garnish herb shapes
            ing_type = random.choice(["rice", "herb", "chunk"])
            if ing_type == "rice":
                draw.ellipse([ix - 3, iy - 6, ix + 3, iy + 6], fill=(255, 255, 255))
            elif ing_type == "herb":
                draw.polygon([(ix, iy - 6), (ix + 6, iy + 2), (ix - 6, iy + 2)], fill=(34, 197, 94))
            else:
                draw.rectangle([ix - 8, iy - 8, ix + 8, iy + 8], fill=(217, 119, 6))

        # Save to path
        img.save(output_path, "JPEG")
        logger.info(f"Programmatically generated abstract JPEG representation for {dish_name} at stage {stage} to {output_path}")


# Module-level singleton
dataset_service = DatasetService()
