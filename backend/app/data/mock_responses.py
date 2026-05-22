"""Comprehensive mock AI responses for CookLens demo experience."""
import random
import uuid

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


def _make_id() -> str:
    return str(uuid.uuid4())


# ---------------------------------------------------------------------------
# 1. Butter Chicken  (Indian · cooking · 65 %)
# ---------------------------------------------------------------------------
BUTTER_CHICKEN = AnalysisResponse(
    id=_make_id(),
    ingredients=[
        Ingredient(name="Chicken thighs", confidence=0.95, emoji="🍗", quantity="500g"),
        Ingredient(name="Butter", confidence=0.92, emoji="🧈", quantity="3 tbsp"),
        Ingredient(name="Tomato purée", confidence=0.90, emoji="🍅", quantity="200ml"),
        Ingredient(name="Heavy cream", confidence=0.88, emoji="🥛", quantity="100ml"),
        Ingredient(name="Garam masala", confidence=0.85, emoji="🌿", quantity="1 tsp"),
        Ingredient(name="Kasuri methi", confidence=0.80, emoji="🍃", quantity="1 tsp"),
        Ingredient(name="Ginger-garlic paste", confidence=0.87, emoji="🧄", quantity="1 tbsp"),
        Ingredient(name="Green chilli", confidence=0.78, emoji="🌶️", quantity="2 pcs"),
    ],
    stage=CookingStageEnum.OIL_SEPARATING,
    dish_prediction=DishPrediction(
        name="Butter Chicken (Murgh Makhani)",
        cuisine="Indian",
        confidence=0.93,
        description="Classic North-Indian creamy tomato curry with tender chicken pieces.",
        reasoning="Step 1: Image is clear. Step 2: Red gravy with chicken chunks. Step 3: Oil is separating at the edges, typical of Indian curries nearing completion. Step 4: Cooking is midway. Step 5: Likely Butter Chicken.",
        alternatives=["Chicken Tikka Masala", "Paneer Butter Masala"]
    ),
    instructions=[
        CookingStep(step_number=1, instruction="Marinate chicken in yogurt, turmeric, chilli powder and salt for at least 30 min.", duration="30 min", tip="Overnight marination gives the best flavour."),
        CookingStep(step_number=2, instruction="Grill or pan-sear marinated chicken until charred. Set aside.", duration="8 min", temperature="220°C"),
        CookingStep(step_number=3, instruction="Melt butter in a heavy pan. Sauté ginger-garlic paste until fragrant.", duration="2 min", temperature="Medium"),
        CookingStep(step_number=4, instruction="Add tomato purée and cook until oil separates.", duration="10 min", tip="Stir frequently to avoid burning."),
        CookingStep(step_number=5, instruction="Add garam masala, chilli powder, and sugar. Stir well.", duration="1 min"),
        CookingStep(step_number=6, instruction="Pour in heavy cream, mix, then add the seared chicken pieces.", duration="5 min"),
        CookingStep(step_number=7, instruction="Simmer on low heat. Crush kasuri methi and sprinkle on top.", duration="10 min", temperature="Low"),
        CookingStep(step_number=8, instruction="Garnish with a swirl of cream and fresh coriander. Serve with naan.", duration="1 min"),
    ],
    remaining_time="15 minutes",
    tips=[
        "Use bone-in chicken for richer flavour.",
        "Add a pinch of sugar to balance the acidity of tomatoes.",
        "Don't boil after adding cream — it may curdle.",
        "Kasuri methi (dried fenugreek leaves) is the signature aroma of this dish.",
        "Rest the curry 5 minutes before serving for deeper flavour melding.",
    ],
    copilot=CopilotSuggestion(
        next_step="Add cream and simmer for 10 more minutes on low flame.",
        mistakes_detected=["Tomato base looks slightly under-cooked — oil hasn't separated yet."],
        fixes=["Cook the tomato purée 3-4 more minutes until you see oil pooling at edges."],
        readiness_percent=65.0,
        readiness_label="Cooking — Simmer Phase",
    ),
    nutrition=NutritionEstimate(
        calories=490, protein_g=32.0, carbs_g=14.0, fat_g=34.0, fiber_g=2.5,
        tags=["High Protein", "Rich", "Gluten-Free"],
    ),
    spice_recommendations=[
        SpiceRecommendation(name="Kashmiri Red Chilli", emoji="🌶️", reason="Gives vibrant colour without excessive heat."),
        SpiceRecommendation(name="Cardamom", emoji="🫛", reason="Adds a warm, aromatic layer to the gravy."),
        SpiceRecommendation(name="Fenugreek Seeds", emoji="🌿", reason="Complements kasuri methi for authentic taste."),
    ],
    cuisine_style="North Indian",
    language="en",
)

# ---------------------------------------------------------------------------
# 2. Pasta Carbonara  (Italian · almost_done · 90 %)
# ---------------------------------------------------------------------------
PASTA_CARBONARA = AnalysisResponse(
    id=_make_id(),
    ingredients=[
        Ingredient(name="Spaghetti", confidence=0.96, emoji="🍝", quantity="400g"),
        Ingredient(name="Guanciale", confidence=0.91, emoji="🥓", quantity="150g"),
        Ingredient(name="Egg yolks", confidence=0.93, emoji="🥚", quantity="4 pcs"),
        Ingredient(name="Pecorino Romano", confidence=0.89, emoji="🧀", quantity="100g"),
        Ingredient(name="Black pepper", confidence=0.94, emoji="🫚", quantity="2 tsp"),
    ],
    stage=CookingStageEnum.ALMOST_DONE,
    dish_prediction=DishPrediction(
        name="Pasta Carbonara",
        cuisine="Italian",
        confidence=0.95,
        description="Roman classic — silky egg-and-cheese sauce clinging to al-dente spaghetti with crispy guanciale.",
    ),
    instructions=[
        CookingStep(step_number=1, instruction="Bring a large pot of salted water to boil. Cook spaghetti until al dente.", duration="10 min", tip="Reserve 1 cup of pasta water before draining."),
        CookingStep(step_number=2, instruction="Slice guanciale into small strips and render in a cold pan over medium heat.", duration="7 min", temperature="Medium"),
        CookingStep(step_number=3, instruction="Whisk egg yolks with grated Pecorino and generous black pepper.", duration="2 min"),
        CookingStep(step_number=4, instruction="Remove pan from heat. Add drained pasta to the guanciale.", duration="1 min", tip="OFF the heat is critical to avoid scrambled eggs."),
        CookingStep(step_number=5, instruction="Pour egg mixture over pasta, toss vigorously. Add pasta water to reach creamy consistency.", duration="2 min"),
        CookingStep(step_number=6, instruction="Plate immediately. Top with extra Pecorino and cracked pepper.", duration="1 min"),
    ],
    remaining_time="3 minutes",
    tips=[
        "Never add cream — authentic carbonara uses only eggs and cheese.",
        "Toss off the heat to create a silky sauce, not scrambled eggs.",
        "Use Pecorino Romano, not Parmigiano, for the real deal.",
        "Guanciale (cured pork jowl) is the traditional choice over pancetta.",
    ],
    copilot=CopilotSuggestion(
        next_step="Toss the pasta with the egg-cheese mixture off the heat and plate.",
        mistakes_detected=["Pan might still be too hot for the egg mixture."],
        fixes=["Let the pan cool for 30 seconds before adding the egg mixture."],
        readiness_percent=90.0,
        readiness_label="Almost Done — Final Toss",
    ),
    nutrition=NutritionEstimate(
        calories=620, protein_g=26.0, carbs_g=65.0, fat_g=28.0, fiber_g=3.0,
        tags=["High Carb", "Comfort Food"],
    ),
    spice_recommendations=[
        SpiceRecommendation(name="Black Pepper", emoji="🫚", reason="The defining spice — use freshly cracked and be generous."),
        SpiceRecommendation(name="Nutmeg", emoji="🥜", reason="A tiny grating adds subtle warmth (optional)."),
    ],
    cuisine_style="Italian (Roman)",
    language="en",
)

# ---------------------------------------------------------------------------
# 3. Garden Salad  (raw · 0 %)
# ---------------------------------------------------------------------------
GARDEN_SALAD = AnalysisResponse(
    id=_make_id(),
    ingredients=[
        Ingredient(name="Romaine lettuce", confidence=0.97, emoji="🥬", quantity="1 head"),
        Ingredient(name="Cherry tomatoes", confidence=0.95, emoji="🍅", quantity="200g"),
        Ingredient(name="Cucumber", confidence=0.94, emoji="🥒", quantity="1 pc"),
        Ingredient(name="Red onion", confidence=0.90, emoji="🧅", quantity="½ pc"),
        Ingredient(name="Olive oil", confidence=0.88, emoji="🫒", quantity="3 tbsp"),
        Ingredient(name="Lemon", confidence=0.86, emoji="🍋", quantity="1 pc"),
    ],
    stage=CookingStageEnum.RAW,
    dish_prediction=DishPrediction(
        name="Garden Salad",
        cuisine="International",
        confidence=0.92,
        description="A fresh and crunchy mixed green salad with a simple lemon-olive oil vinaigrette.",
    ),
    instructions=[
        CookingStep(step_number=1, instruction="Wash and dry all vegetables thoroughly.", duration="5 min"),
        CookingStep(step_number=2, instruction="Tear romaine lettuce into bite-sized pieces.", duration="2 min"),
        CookingStep(step_number=3, instruction="Halve cherry tomatoes, slice cucumber into rounds, and thinly slice red onion.", duration="3 min"),
        CookingStep(step_number=4, instruction="Combine vegetables in a large bowl.", duration="1 min"),
        CookingStep(step_number=5, instruction="Whisk olive oil, lemon juice, salt and pepper for the vinaigrette.", duration="1 min", tip="Add a pinch of dried oregano for Mediterranean flair."),
        CookingStep(step_number=6, instruction="Drizzle dressing over salad. Toss gently and serve immediately.", duration="1 min"),
    ],
    remaining_time="13 minutes",
    tips=[
        "Use a salad spinner to remove excess water from greens.",
        "Dress the salad just before serving to keep it crisp.",
        "Add feta cheese or olives for a Greek twist.",
    ],
    copilot=CopilotSuggestion(
        next_step="Wash and chop all vegetables before combining.",
        mistakes_detected=[],
        fixes=[],
        readiness_percent=0.0,
        readiness_label="Raw — Not Started",
    ),
    nutrition=NutritionEstimate(
        calories=120, protein_g=3.0, carbs_g=10.0, fat_g=8.0, fiber_g=4.0,
        tags=["Low Calorie", "Vegan", "Gluten-Free"],
    ),
    spice_recommendations=[
        SpiceRecommendation(name="Dried Oregano", emoji="🌿", reason="Classic Mediterranean herb that complements fresh vegetables."),
        SpiceRecommendation(name="Sumac", emoji="🔴", reason="Tart, lemony spice that elevates simple salads."),
    ],
    cuisine_style="International",
    language="en",
)

# ---------------------------------------------------------------------------
# 4. Sushi Roll  (Japanese · done · 100 %)
# ---------------------------------------------------------------------------
SUSHI_ROLL = AnalysisResponse(
    id=_make_id(),
    ingredients=[
        Ingredient(name="Sushi rice", confidence=0.96, emoji="🍚", quantity="300g"),
        Ingredient(name="Nori seaweed", confidence=0.94, emoji="🟢", quantity="4 sheets"),
        Ingredient(name="Fresh salmon", confidence=0.93, emoji="🐟", quantity="200g"),
        Ingredient(name="Avocado", confidence=0.91, emoji="🥑", quantity="1 pc"),
        Ingredient(name="Rice vinegar", confidence=0.88, emoji="🍶", quantity="3 tbsp"),
        Ingredient(name="Soy sauce", confidence=0.90, emoji="🫘", quantity="For dipping"),
        Ingredient(name="Wasabi", confidence=0.85, emoji="🟩", quantity="1 tsp"),
    ],
    stage=CookingStageEnum.DONE,
    dish_prediction=DishPrediction(
        name="Salmon Avocado Maki Roll",
        cuisine="Japanese",
        confidence=0.94,
        description="Classic maki sushi roll with fresh salmon and creamy avocado wrapped in seasoned rice and nori.",
    ),
    instructions=[
        CookingStep(step_number=1, instruction="Rinse sushi rice until water runs clear, then cook in a rice cooker.", duration="20 min", tip="Use a 1:1.1 rice-to-water ratio."),
        CookingStep(step_number=2, instruction="Season cooked rice with rice vinegar, sugar and salt. Fan while folding.", duration="5 min"),
        CookingStep(step_number=3, instruction="Place nori shiny-side down on a bamboo mat. Spread rice evenly, leaving 1 cm at the top.", duration="2 min"),
        CookingStep(step_number=4, instruction="Lay salmon strips and avocado slices across the centre.", duration="1 min"),
        CookingStep(step_number=5, instruction="Roll tightly using the bamboo mat. Seal the edge with a bit of water.", duration="2 min", tip="Keep even pressure for a uniform roll."),
        CookingStep(step_number=6, instruction="Slice with a wet, sharp knife into 6–8 pieces.", duration="1 min"),
        CookingStep(step_number=7, instruction="Serve with soy sauce, wasabi and pickled ginger.", duration="1 min"),
    ],
    remaining_time="0 minutes",
    tips=[
        "Keep your hands wet with vinegar water to prevent rice from sticking.",
        "Use the freshest sashimi-grade fish available.",
        "A sharp, wet knife is the secret to clean cuts.",
        "Don't overfill the roll — less is more.",
    ],
    copilot=CopilotSuggestion(
        next_step="Plate beautifully and serve immediately — sushi is best fresh!",
        mistakes_detected=[],
        fixes=[],
        readiness_percent=100.0,
        readiness_label="Done — Ready to Serve",
    ),
    nutrition=NutritionEstimate(
        calories=380, protein_g=22.0, carbs_g=48.0, fat_g=10.0, fiber_g=3.5,
        tags=["High Protein", "Omega-3 Rich", "Dairy-Free"],
    ),
    spice_recommendations=[
        SpiceRecommendation(name="Wasabi", emoji="🟩", reason="Provides sinus-clearing heat that pairs perfectly with raw fish."),
        SpiceRecommendation(name="Togarashi", emoji="🌶️", reason="Seven-spice blend adds a gentle kick to rolls."),
        SpiceRecommendation(name="Sesame Seeds", emoji="⚪", reason="Toasted sesame adds nuttiness and visual appeal."),
    ],
    cuisine_style="Japanese",
    language="en",
)

# ---------------------------------------------------------------------------
# 5. Chicken Biryani  (Indian · preparation · 20 %)
# ---------------------------------------------------------------------------
CHICKEN_BIRYANI = AnalysisResponse(
    id=_make_id(),
    ingredients=[
        Ingredient(name="Basmati rice", confidence=0.96, emoji="🍚", quantity="500g"),
        Ingredient(name="Chicken drumsticks", confidence=0.94, emoji="🍗", quantity="8 pcs"),
        Ingredient(name="Yogurt", confidence=0.90, emoji="🥛", quantity="1 cup"),
        Ingredient(name="Biryani masala", confidence=0.88, emoji="🌿", quantity="2 tbsp"),
        Ingredient(name="Saffron", confidence=0.85, emoji="🟡", quantity="A pinch"),
        Ingredient(name="Fried onions", confidence=0.92, emoji="🧅", quantity="2 cups"),
        Ingredient(name="Mint leaves", confidence=0.87, emoji="🍃", quantity="½ cup"),
        Ingredient(name="Ghee", confidence=0.91, emoji="🧈", quantity="3 tbsp"),
    ],
    stage=CookingStageEnum.SIMMERING,
    dish_prediction=DishPrediction(
        name="Hyderabadi Chicken Biryani",
        cuisine="Indian",
        confidence=0.88,
        description="Layered rice-and-chicken dish slow-cooked (dum) to aromatic perfection.",
        reasoning="Step 1: Good lighting, deep pot. Step 2: Long-grain basmati rice mixed with saffron and chicken. Step 3: Sealed pot with dough indicates dum cooking. Step 4: Simmering stage. Step 5: Hyderabadi Biryani.",
        alternatives=["Chicken Pulao", "Mutton Biryani"]
    ),
    instructions=[
        CookingStep(step_number=1, instruction="Wash and soak basmati rice for 30 minutes.", duration="30 min"),
        CookingStep(step_number=2, instruction="Marinate chicken with yogurt, biryani masala, ginger-garlic paste, and salt.", duration="60 min", tip="Minimum 1 hour; overnight is ideal."),
        CookingStep(step_number=3, instruction="Par-boil rice with whole spices until 70 % cooked. Drain.", duration="8 min"),
        CookingStep(step_number=4, instruction="In a heavy pot, layer marinated chicken, then rice. Repeat.", duration="5 min"),
        CookingStep(step_number=5, instruction="Top with fried onions, saffron milk, mint, and ghee.", duration="2 min"),
        CookingStep(step_number=6, instruction="Seal the pot with dough or foil. Cook on very low heat (dum).", duration="25 min", temperature="Low", tip="Don't open the lid during dum — steam is doing the work."),
        CookingStep(step_number=7, instruction="Rest for 5 minutes, then gently mix layers before serving.", duration="5 min"),
    ],
    remaining_time="75 minutes",
    tips=[
        "Soak rice to get long, separate grains after cooking.",
        "Use aged basmati for the best texture.",
        "Seal the pot tightly — steam trapped inside creates the dum effect.",
        "Serve with raita and mirchi ka salan.",
    ],
    copilot=CopilotSuggestion(
        next_step="Complete the chicken marination and begin soaking rice.",
        mistakes_detected=["Rice hasn't been soaked yet."],
        fixes=["Start soaking rice immediately — it needs 30 minutes."],
        readiness_percent=20.0,
        readiness_label="Preparation — Marination Phase",
    ),
    nutrition=NutritionEstimate(
        calories=580, protein_g=35.0, carbs_g=62.0, fat_g=18.0, fiber_g=2.0,
        tags=["High Protein", "Festive Dish"],
    ),
    spice_recommendations=[
        SpiceRecommendation(name="Saffron", emoji="🟡", reason="Adds signature golden hue and floral aroma."),
        SpiceRecommendation(name="Star Anise", emoji="⭐", reason="Infuses the rice water with a sweet anise note."),
        SpiceRecommendation(name="Mace", emoji="🔶", reason="Subtle, warm flavour that pairs beautifully with biryani."),
    ],
    cuisine_style="Hyderabadi Indian",
    language="en",
)

# ---------------------------------------------------------------------------
# 6. Pad Thai  (Thai · cooking · 50 %)
# ---------------------------------------------------------------------------
PAD_THAI = AnalysisResponse(
    id=_make_id(),
    ingredients=[
        Ingredient(name="Rice noodles", confidence=0.95, emoji="🍜", quantity="250g"),
        Ingredient(name="Shrimp", confidence=0.92, emoji="🦐", quantity="200g"),
        Ingredient(name="Tamarind paste", confidence=0.88, emoji="🟤", quantity="2 tbsp"),
        Ingredient(name="Fish sauce", confidence=0.90, emoji="🐟", quantity="2 tbsp"),
        Ingredient(name="Palm sugar", confidence=0.85, emoji="🍬", quantity="1 tbsp"),
        Ingredient(name="Bean sprouts", confidence=0.91, emoji="🌱", quantity="1 cup"),
        Ingredient(name="Roasted peanuts", confidence=0.89, emoji="🥜", quantity="¼ cup"),
        Ingredient(name="Lime", confidence=0.87, emoji="🍋", quantity="1 pc"),
    ],
    stage=CookingStageEnum.COOKING,
    dish_prediction=DishPrediction(
        name="Pad Thai",
        cuisine="Thai",
        confidence=0.94,
        description="Thailand's iconic stir-fried rice noodle dish with a sweet-sour-savoury sauce.",
    ),
    instructions=[
        CookingStep(step_number=1, instruction="Soak rice noodles in warm water until pliable (not fully soft).", duration="15 min", tip="Over-soaking makes noodles mushy."),
        CookingStep(step_number=2, instruction="Mix tamarind paste, fish sauce, and palm sugar into a sauce.", duration="2 min"),
        CookingStep(step_number=3, instruction="Heat oil in a wok over high heat. Cook shrimp until pink, set aside.", duration="3 min", temperature="High"),
        CookingStep(step_number=4, instruction="Scramble eggs in the same wok, then push to one side.", duration="1 min"),
        CookingStep(step_number=5, instruction="Add drained noodles and sauce. Toss until noodles absorb the liquid.", duration="3 min", tip="Keep the heat high and toss quickly."),
        CookingStep(step_number=6, instruction="Return shrimp, add bean sprouts and chives. Toss briefly.", duration="1 min"),
        CookingStep(step_number=7, instruction="Plate with crushed peanuts, lime wedge, and chilli flakes.", duration="1 min"),
    ],
    remaining_time="8 minutes",
    tips=[
        "High heat and quick tossing are essential for wok cooking.",
        "Don't overcook bean sprouts — they should stay crunchy.",
        "Authentic Pad Thai doesn't use ketchup; use real tamarind paste.",
        "Squeeze lime just before eating for the brightest flavour.",
    ],
    copilot=CopilotSuggestion(
        next_step="Add noodles and sauce to the wok and toss on high heat.",
        mistakes_detected=["Wok temperature may have dropped — noodles could steam instead of fry."],
        fixes=["Increase heat to maximum before adding noodles."],
        readiness_percent=50.0,
        readiness_label="Cooking — Stir-Fry Phase",
    ),
    nutrition=NutritionEstimate(
        calories=440, protein_g=24.0, carbs_g=52.0, fat_g=14.0, fiber_g=3.0,
        tags=["Gluten-Free", "High Protein"],
    ),
    spice_recommendations=[
        SpiceRecommendation(name="Dried Chilli Flakes", emoji="🌶️", reason="Adds adjustable heat to the dish."),
        SpiceRecommendation(name="White Pepper", emoji="⚪", reason="Traditional Thai seasoning with earthy warmth."),
    ],
    cuisine_style="Thai Street Food",
    language="en",
)

# ---------------------------------------------------------------------------
# 7. Margherita Pizza  (Italian · almost_done · 85 %)
# ---------------------------------------------------------------------------
MARGHERITA_PIZZA = AnalysisResponse(
    id=_make_id(),
    ingredients=[
        Ingredient(name="Pizza dough", confidence=0.96, emoji="🍕", quantity="1 ball (280g)"),
        Ingredient(name="San Marzano tomatoes", confidence=0.91, emoji="🍅", quantity="200g"),
        Ingredient(name="Fresh mozzarella", confidence=0.94, emoji="🧀", quantity="200g"),
        Ingredient(name="Fresh basil", confidence=0.92, emoji="🌿", quantity="8 leaves"),
        Ingredient(name="Extra-virgin olive oil", confidence=0.89, emoji="🫒", quantity="1 tbsp"),
    ],
    stage=CookingStageEnum.ALMOST_DONE,
    dish_prediction=DishPrediction(
        name="Margherita Pizza",
        cuisine="Italian",
        confidence=0.96,
        description="Neapolitan-style pizza with tomato, mozzarella, and basil — simple and perfect.",
    ),
    instructions=[
        CookingStep(step_number=1, instruction="Preheat oven (or pizza stone) to the highest temperature possible.", duration="30 min", temperature="250–300°C", tip="A pizza steel retains heat better than a stone."),
        CookingStep(step_number=2, instruction="Stretch dough by hand into a 12-inch round. Do not use a rolling pin.", duration="3 min"),
        CookingStep(step_number=3, instruction="Crush San Marzano tomatoes by hand. Spread thinly over dough.", duration="2 min"),
        CookingStep(step_number=4, instruction="Tear mozzarella into pieces and distribute evenly.", duration="1 min"),
        CookingStep(step_number=5, instruction="Bake until crust is puffed and charred in spots.", duration="6 min", temperature="300°C"),
        CookingStep(step_number=6, instruction="Remove from oven. Add fresh basil leaves and drizzle olive oil.", duration="1 min"),
    ],
    remaining_time="2 minutes",
    tips=[
        "Use 00 flour for an authentic Neapolitan crust.",
        "Less is more — don't overload toppings.",
        "Add basil AFTER baking so it stays vibrant green.",
        "Let the dough come to room temperature for easier stretching.",
    ],
    copilot=CopilotSuggestion(
        next_step="Check the crust — look for leopard-spot charring and bubbly cheese.",
        mistakes_detected=["Centre of the pizza may be slightly undercooked."],
        fixes=["Rotate pizza 180° in the oven for even cooking."],
        readiness_percent=85.0,
        readiness_label="Almost Done — In the Oven",
    ),
    nutrition=NutritionEstimate(
        calories=350, protein_g=16.0, carbs_g=40.0, fat_g=14.0, fiber_g=2.5,
        tags=["Vegetarian", "Classic"],
    ),
    spice_recommendations=[
        SpiceRecommendation(name="Red Chilli Flakes", emoji="🌶️", reason="A popular table-side addition for heat."),
        SpiceRecommendation(name="Dried Oregano", emoji="🌿", reason="Sprinkle lightly for a rustic, herby note."),
    ],
    cuisine_style="Italian (Neapolitan)",
    language="en",
)

# ---------------------------------------------------------------------------
# 8. Tacos Al Pastor  (Mexican · cooking · 55 %)
# ---------------------------------------------------------------------------
TACOS_AL_PASTOR = AnalysisResponse(
    id=_make_id(),
    ingredients=[
        Ingredient(name="Pork shoulder", confidence=0.94, emoji="🐖", quantity="500g"),
        Ingredient(name="Pineapple", confidence=0.91, emoji="🍍", quantity="4 slices"),
        Ingredient(name="Dried guajillo chillies", confidence=0.87, emoji="🌶️", quantity="4 pcs"),
        Ingredient(name="Corn tortillas", confidence=0.93, emoji="🌮", quantity="12 pcs"),
        Ingredient(name="White onion", confidence=0.90, emoji="🧅", quantity="1 pc"),
        Ingredient(name="Coriander (cilantro)", confidence=0.88, emoji="🌿", quantity="1 bunch"),
        Ingredient(name="Achiote paste", confidence=0.82, emoji="🟠", quantity="2 tbsp"),
    ],
    stage=CookingStageEnum.COOKING,
    dish_prediction=DishPrediction(
        name="Tacos Al Pastor",
        cuisine="Mexican",
        confidence=0.93,
        description="Marinated pork cooked on a vertical spit (trompo) with pineapple, served on corn tortillas.",
    ),
    instructions=[
        CookingStep(step_number=1, instruction="Toast and rehydrate dried guajillo chillies. Blend into a smooth paste with achiote.", duration="10 min"),
        CookingStep(step_number=2, instruction="Slice pork thinly and marinate in the chilli-achiote paste.", duration="120 min", tip="Marinate overnight for the best result."),
        CookingStep(step_number=3, instruction="Thread marinated pork slices onto a vertical spit (or layer in a pan).", duration="5 min"),
        CookingStep(step_number=4, instruction="Place pineapple slices on top. Cook slowly, basting occasionally.", duration="40 min", temperature="Medium-high"),
        CookingStep(step_number=5, instruction="Shave cooked outer layer of pork into small pieces.", duration="5 min"),
        CookingStep(step_number=6, instruction="Warm corn tortillas and assemble tacos with pork, pineapple, onion, cilantro.", duration="5 min"),
        CookingStep(step_number=7, instruction="Serve with salsa verde and lime wedges.", duration="1 min"),
    ],
    remaining_time="25 minutes",
    tips=[
        "Achiote paste gives the signature red-orange colour.",
        "Pineapple tenderises the pork and adds sweet contrast.",
        "Double-layer small tortillas for structural integrity.",
        "A cast-iron skillet works well for the home version.",
        "Top with a squeeze of lime for brightness.",
    ],
    copilot=CopilotSuggestion(
        next_step="Continue slow-cooking the pork. Start shaving once the outer layer is caramelised.",
        mistakes_detected=["Heat may be too high — pork could dry out before caramelising."],
        fixes=["Reduce to medium heat and baste with reserved marinade."],
        readiness_percent=55.0,
        readiness_label="Cooking — Slow-Roasting Phase",
    ),
    nutrition=NutritionEstimate(
        calories=410, protein_g=28.0, carbs_g=38.0, fat_g=16.0, fiber_g=4.0,
        tags=["High Protein", "Street Food"],
    ),
    spice_recommendations=[
        SpiceRecommendation(name="Cumin", emoji="🟤", reason="Earthy warmth that's essential in Mexican cooking."),
        SpiceRecommendation(name="Chipotle", emoji="🌶️", reason="Smoky dried jalapeño adds depth."),
        SpiceRecommendation(name="Mexican Oregano", emoji="🌿", reason="Different from Mediterranean oregano — more citrusy."),
    ],
    cuisine_style="Mexican Street Food",
    language="en",
)

# ---------------------------------------------------------------------------
# 9. Ramen  (Japanese · cooking · 60 %)
# ---------------------------------------------------------------------------
RAMEN = AnalysisResponse(
    id=_make_id(),
    ingredients=[
        Ingredient(name="Ramen noodles", confidence=0.96, emoji="🍜", quantity="200g"),
        Ingredient(name="Pork belly (chashu)", confidence=0.93, emoji="🐖", quantity="200g"),
        Ingredient(name="Tonkotsu broth", confidence=0.90, emoji="🍲", quantity="800ml"),
        Ingredient(name="Soft-boiled egg", confidence=0.92, emoji="🥚", quantity="2 pcs"),
        Ingredient(name="Nori", confidence=0.88, emoji="🟢", quantity="2 sheets"),
        Ingredient(name="Green onion", confidence=0.91, emoji="🧅", quantity="2 stalks"),
    ],
    stage=CookingStageEnum.COOKING,
    dish_prediction=DishPrediction(
        name="Tonkotsu Ramen",
        cuisine="Japanese",
        confidence=0.94,
        description="Rich, creamy pork-bone broth ramen topped with chashu, ajitama, and nori.",
    ),
    instructions=[
        CookingStep(step_number=1, instruction="Simmer pork bones for 8–12 hours for milky tonkotsu broth. Skim impurities.", duration="8-12 hrs", temperature="Rolling boil", tip="The broth MUST boil — a gentle simmer won't emulsify the fat."),
        CookingStep(step_number=2, instruction="Braise pork belly in soy sauce, mirin, sake, and sugar until tender.", duration="90 min", temperature="160°C"),
        CookingStep(step_number=3, instruction="Marinate soft-boiled eggs in the chashu braising liquid.", duration="4 hrs", tip="6.5-minute eggs give a perfectly jammy yolk."),
        CookingStep(step_number=4, instruction="Cook ramen noodles according to package — aim for firm (kata-men).", duration="2 min"),
        CookingStep(step_number=5, instruction="Ladle hot broth into bowls. Add drained noodles.", duration="1 min"),
        CookingStep(step_number=6, instruction="Top with sliced chashu, halved egg, nori, green onion, and sesame.", duration="2 min"),
    ],
    remaining_time="15 minutes",
    tips=[
        "The broth is the soul — don't rush it. 12 hours minimum is ideal.",
        "Use tare (seasoning base) to adjust saltiness per bowl.",
        "Keep noodles separate until serving to prevent over-cooking.",
        "Slice chashu while cold for clean cuts, then torch lightly before serving.",
    ],
    copilot=CopilotSuggestion(
        next_step="Check broth consistency — it should coat the back of a spoon. Start cooking noodles.",
        mistakes_detected=["Broth looks slightly thin — may need more boiling time."],
        fixes=["Continue boiling uncovered for 30 more minutes to concentrate the broth."],
        readiness_percent=60.0,
        readiness_label="Cooking — Assembly Phase",
    ),
    nutrition=NutritionEstimate(
        calories=680, protein_g=38.0, carbs_g=55.0, fat_g=32.0, fiber_g=2.0,
        tags=["High Protein", "Comfort Food", "Rich"],
    ),
    spice_recommendations=[
        SpiceRecommendation(name="Rayu (Chilli Oil)", emoji="🌶️", reason="Japanese chilli sesame oil for a spicy kick."),
        SpiceRecommendation(name="White Pepper", emoji="⚪", reason="Traditional ramen seasoning with clean heat."),
        SpiceRecommendation(name="Garlic Chips", emoji="🧄", reason="Crispy fried garlic adds texture and umami."),
    ],
    cuisine_style="Japanese",
    language="en",
)

# ---------------------------------------------------------------------------
# 10. Dal Makhani  (Indian · cooking · 70 %)
# ---------------------------------------------------------------------------
DAL_MAKHANI = AnalysisResponse(
    id=_make_id(),
    ingredients=[
        Ingredient(name="Black urad dal", confidence=0.95, emoji="🫘", quantity="1 cup"),
        Ingredient(name="Rajma (kidney beans)", confidence=0.90, emoji="🫘", quantity="¼ cup"),
        Ingredient(name="Butter", confidence=0.93, emoji="🧈", quantity="3 tbsp"),
        Ingredient(name="Cream", confidence=0.88, emoji="🥛", quantity="½ cup"),
        Ingredient(name="Tomato purée", confidence=0.91, emoji="🍅", quantity="1 cup"),
        Ingredient(name="Ginger-garlic paste", confidence=0.89, emoji="🧄", quantity="1 tbsp"),
        Ingredient(name="Kasuri methi", confidence=0.84, emoji="🍃", quantity="1 tsp"),
    ],
    stage=CookingStageEnum.COOKING,
    dish_prediction=DishPrediction(
        name="Dal Makhani",
        cuisine="Indian",
        confidence=0.94,
        description="Slow-cooked black lentils simmered with butter and cream — a Punjabi comfort classic.",
    ),
    instructions=[
        CookingStep(step_number=1, instruction="Soak black urad dal and rajma overnight or for at least 8 hours.", duration="8 hrs"),
        CookingStep(step_number=2, instruction="Pressure-cook soaked dal with water and salt until very soft (4-5 whistles).", duration="30 min"),
        CookingStep(step_number=3, instruction="In another pan, heat butter. Sauté ginger-garlic paste until golden.", duration="3 min"),
        CookingStep(step_number=4, instruction="Add tomato purée and cook until thick and oil separates.", duration="8 min", tip="Slow cooking the tomato base builds depth."),
        CookingStep(step_number=5, instruction="Add cooked dal to the tomato base. Mix well and simmer.", duration="30 min", temperature="Low"),
        CookingStep(step_number=6, instruction="Stir in cream and kasuri methi. Simmer for 10 more minutes.", duration="10 min"),
        CookingStep(step_number=7, instruction="Finish with a generous knob of butter on top. Serve with naan or rice.", duration="1 min"),
    ],
    remaining_time="20 minutes",
    tips=[
        "Low and slow is the mantra — traditional dal makhani simmers overnight on coal.",
        "Mash some of the dal for a creamier texture while keeping some whole.",
        "The final butter on top (tadka) is non-negotiable for authentic taste.",
        "Pair with jeera rice or laccha paratha.",
        "Leftovers taste even better the next day.",
    ],
    copilot=CopilotSuggestion(
        next_step="Add cream and kasuri methi, then simmer on lowest heat for 10 minutes.",
        mistakes_detected=["Dal consistency looks a bit thick."],
        fixes=["Add ¼ cup of water to reach desired pouring consistency."],
        readiness_percent=70.0,
        readiness_label="Cooking — Simmering Phase",
    ),
    nutrition=NutritionEstimate(
        calories=420, protein_g=18.0, carbs_g=42.0, fat_g=22.0, fiber_g=8.0,
        tags=["High Fiber", "Vegetarian", "Comfort Food"],
    ),
    spice_recommendations=[
        SpiceRecommendation(name="Kasuri Methi", emoji="🍃", reason="Dried fenugreek leaves are the signature finishing herb."),
        SpiceRecommendation(name="Deggi Mirch", emoji="🌶️", reason="Gives colour and mild heat without overwhelming the dish."),
        SpiceRecommendation(name="Garam Masala", emoji="🌿", reason="A small pinch at the end rounds out the flavour."),
    ],
    cuisine_style="Punjabi Indian",
    language="en",
)

# ---------------------------------------------------------------------------
# 11. Tom Yum Soup  (Thai · cooking · 45 %)  — bonus entry
# ---------------------------------------------------------------------------
TOM_YUM_SOUP = AnalysisResponse(
    id=_make_id(),
    ingredients=[
        Ingredient(name="Shrimp", confidence=0.94, emoji="🦐", quantity="300g"),
        Ingredient(name="Lemongrass", confidence=0.90, emoji="🌿", quantity="3 stalks"),
        Ingredient(name="Galangal", confidence=0.87, emoji="🫚", quantity="5 slices"),
        Ingredient(name="Kaffir lime leaves", confidence=0.88, emoji="🍃", quantity="4 leaves"),
        Ingredient(name="Thai chillies", confidence=0.91, emoji="🌶️", quantity="5 pcs"),
        Ingredient(name="Mushrooms", confidence=0.89, emoji="🍄", quantity="150g"),
        Ingredient(name="Fish sauce", confidence=0.92, emoji="🐟", quantity="2 tbsp"),
        Ingredient(name="Lime juice", confidence=0.90, emoji="🍋", quantity="3 tbsp"),
    ],
    stage=CookingStageEnum.COOKING,
    dish_prediction=DishPrediction(
        name="Tom Yum Goong",
        cuisine="Thai",
        confidence=0.93,
        description="Thailand's famous hot-and-sour shrimp soup with aromatic herbs.",
    ),
    instructions=[
        CookingStep(step_number=1, instruction="Bring 4 cups of water or stock to a boil.", duration="5 min"),
        CookingStep(step_number=2, instruction="Add lemongrass (bruised), galangal slices, and kaffir lime leaves.", duration="5 min", tip="Bruise lemongrass with the back of a knife to release oils."),
        CookingStep(step_number=3, instruction="Add mushrooms and Thai chillies. Simmer for 3 minutes.", duration="3 min"),
        CookingStep(step_number=4, instruction="Add shrimp and cook until just pink and curled.", duration="3 min", tip="Don't overcook shrimp — they become rubbery in seconds."),
        CookingStep(step_number=5, instruction="Remove from heat. Stir in fish sauce and lime juice.", duration="1 min"),
        CookingStep(step_number=6, instruction="Taste and adjust — it should be equally sour, salty, and spicy.", duration="1 min"),
        CookingStep(step_number=7, instruction="Serve in a hot bowl, garnished with cilantro and a drizzle of chilli oil.", duration="1 min"),
    ],
    remaining_time="10 minutes",
    tips=[
        "Add nam prik pao (roasted chilli jam) for the creamy 'Tom Yum Naam Khon' version.",
        "Don't eat the lemongrass and galangal — they're for flavour only.",
        "Fresh, not bottled, lime juice makes all the difference.",
    ],
    copilot=CopilotSuggestion(
        next_step="Add shrimp to the simmering broth and cook for 2-3 minutes.",
        mistakes_detected=[],
        fixes=[],
        readiness_percent=45.0,
        readiness_label="Cooking — Aromatics Infusing",
    ),
    nutrition=NutritionEstimate(
        calories=180, protein_g=22.0, carbs_g=8.0, fat_g=6.0, fiber_g=1.5,
        tags=["Low Calorie", "High Protein", "Gluten-Free"],
    ),
    spice_recommendations=[
        SpiceRecommendation(name="Bird's Eye Chilli", emoji="🌶️", reason="The authentic Thai heat source — small but fiery."),
        SpiceRecommendation(name="Galangal", emoji="🫚", reason="Not a substitute for ginger — it has a unique piney, citrusy flavour."),
    ],
    cuisine_style="Thai",
    language="en",
)

# ---------------------------------------------------------------------------
# 12. Churros  (Mexican/Spanish · done · 100 %)  — bonus entry
# ---------------------------------------------------------------------------
CHURROS = AnalysisResponse(
    id=_make_id(),
    ingredients=[
        Ingredient(name="All-purpose flour", confidence=0.95, emoji="🌾", quantity="1 cup"),
        Ingredient(name="Water", confidence=0.93, emoji="💧", quantity="1 cup"),
        Ingredient(name="Butter", confidence=0.91, emoji="🧈", quantity="2 tbsp"),
        Ingredient(name="Sugar", confidence=0.94, emoji="🍬", quantity="¼ cup"),
        Ingredient(name="Cinnamon", confidence=0.92, emoji="🟤", quantity="1 tsp"),
        Ingredient(name="Vegetable oil", confidence=0.90, emoji="🫗", quantity="For frying"),
    ],
    stage=CookingStageEnum.DONE,
    dish_prediction=DishPrediction(
        name="Churros",
        cuisine="Mexican/Spanish",
        confidence=0.95,
        description="Crispy fried dough sticks coated in cinnamon sugar, often served with chocolate dipping sauce.",
    ),
    instructions=[
        CookingStep(step_number=1, instruction="Bring water, butter, sugar and salt to a boil.", duration="3 min"),
        CookingStep(step_number=2, instruction="Remove from heat and stir in flour vigorously until a ball forms.", duration="2 min"),
        CookingStep(step_number=3, instruction="Transfer dough into a piping bag with a star tip.", duration="1 min"),
        CookingStep(step_number=4, instruction="Heat oil to 190°C. Pipe 4-inch strips directly into the oil.", duration="1 min", temperature="190°C", tip="Use scissors to cut dough at the desired length."),
        CookingStep(step_number=5, instruction="Fry until deep golden brown, turning once.", duration="4 min"),
        CookingStep(step_number=6, instruction="Drain on paper towels. Roll immediately in cinnamon sugar.", duration="2 min"),
    ],
    remaining_time="0 minutes",
    tips=[
        "Oil temperature is critical — too low and churros absorb oil, too high and they burn outside while raw inside.",
        "Roll in cinnamon sugar while still hot for best coating.",
        "Serve with warm chocolate sauce or dulce de leche.",
    ],
    copilot=CopilotSuggestion(
        next_step="Serve immediately while hot and crispy!",
        mistakes_detected=[],
        fixes=[],
        readiness_percent=100.0,
        readiness_label="Done — Ready to Serve",
    ),
    nutrition=NutritionEstimate(
        calories=280, protein_g=4.0, carbs_g=36.0, fat_g=14.0, fiber_g=1.0,
        tags=["Dessert", "Fried", "Indulgent"],
    ),
    spice_recommendations=[
        SpiceRecommendation(name="Cinnamon", emoji="🟤", reason="The classic churro coating — warm and sweet."),
        SpiceRecommendation(name="Cayenne", emoji="🌶️", reason="A pinch in the chocolate sauce for a Mexican hot chocolate vibe."),
    ],
    cuisine_style="Mexican / Spanish",
    language="en",
)


# ---------------------------------------------------------------------------
# 13. Low Confidence Curry (Indian · cooking · 45%) - DEMONSTRATION OF UNCERTAINTY
# ---------------------------------------------------------------------------
UNCERTAIN_CURRY = AnalysisResponse(
    id=_make_id(),
    ingredients=[
        Ingredient(name="Onions", confidence=0.85, emoji="🧅"),
        Ingredient(name="Tomatoes", confidence=0.75, emoji="🍅"),
        Ingredient(name="Unknown Protein", confidence=0.40, emoji="🥩"),
        Ingredient(name="Oil", confidence=0.90, emoji="🫗"),
    ],
    stage=CookingStageEnum.SAUTEING,
    dish_prediction=DishPrediction(
        name="Unknown Indian Curry",
        cuisine="Indian",
        confidence=0.45,
        description="A generic curry base being sautéed. The exact dish cannot be identified confidently due to blur and early cooking stage.",
        reasoning="Step 1: Image is extremely blurry and poorly lit. Step 2: Brown mushy texture detected (likely sautéed onions/tomatoes). Protein is unidentifiable. Step 3: Plenty of oil, typical of Indian bhuna (sautéing) stage. Step 4: Early sautéing stage. Step 5: Cannot determine final dish.",
        alternatives=["Chicken Curry", "Mutton Rogan Josh", "Rajma Masala"]
    ),
    instructions=[
        CookingStep(step_number=1, instruction="Continue sautéing the onion-tomato base until oil separates fully.", duration="10 min"),
        CookingStep(step_number=2, instruction="Add your primary protein or vegetable once the base is deeply caramelised.", duration="1 min"),
    ],
    remaining_time="Unknown",
    tips=[
        "Take a clearer photo once the main ingredients are added for a better prediction."
    ],
    copilot=CopilotSuggestion(
        next_step="Keep stirring the base to prevent burning.",
        mistakes_detected=["Image is too blurry to detect specific mistakes."],
        fixes=["Ensure proper lighting for the next photo."],
        readiness_percent=15.0,
        readiness_label="Sautéing Base",
    ),
    nutrition=NutritionEstimate(
        calories=200, protein_g=5.0, carbs_g=15.0, fat_g=12.0, fiber_g=3.0,
        tags=["Base"],
    ),
    spice_recommendations=[],
    cuisine_style="Indian",
    language="en",
)


# ---------------------------------------------------------------------------
# Collected list & random getter
# ---------------------------------------------------------------------------
MOCK_RESPONSES: list[AnalysisResponse] = [
    UNCERTAIN_CURRY,
    BUTTER_CHICKEN,
    PASTA_CARBONARA,
    GARDEN_SALAD,
    SUSHI_ROLL,
    CHICKEN_BIRYANI,
    PAD_THAI,
    MARGHERITA_PIZZA,
    TACOS_AL_PASTOR,
    RAMEN,
    DAL_MAKHANI,
    TOM_YUM_SOUP,
    CHURROS,
]


def get_random_mock() -> AnalysisResponse:
    """Return a random mock analysis response with a fresh ID."""
    mock = random.choice(MOCK_RESPONSES).model_copy(deep=True)
    mock.id = str(uuid.uuid4())
    return mock


def get_mock_by_cuisine(cuisine: str) -> AnalysisResponse:
    """Return a mock response matching the given cuisine (case-insensitive), or random if none match."""
    matches = [
        m for m in MOCK_RESPONSES
        if cuisine.lower() in m.dish_prediction.cuisine.lower()
    ]
    if matches:
        mock = random.choice(matches).model_copy(deep=True)
        mock.id = str(uuid.uuid4())
        return mock
    return get_random_mock()
