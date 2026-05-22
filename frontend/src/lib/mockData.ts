import type { AnalysisResponse } from '@/types';

export const mockAnalyses: AnalysisResponse[] = [
  // 1. Butter Chicken — Indian, cooking stage
  {
    id: 'mock-butter-chicken-001',
    ingredients: [
      { name: 'Chicken Thighs', confidence: 0.97, emoji: '🍗', quantity: '500g' },
      { name: 'Tomato Puree', confidence: 0.95, emoji: '🍅', quantity: '200ml' },
      { name: 'Butter', confidence: 0.93, emoji: '🧈', quantity: '50g' },
      { name: 'Heavy Cream', confidence: 0.91, emoji: '🥛', quantity: '100ml' },
      { name: 'Onion', confidence: 0.89, emoji: '🧅', quantity: '2 medium' },
      { name: 'Garlic', confidence: 0.88, emoji: '🧄', quantity: '6 cloves' },
      { name: 'Ginger', confidence: 0.85, emoji: '🫚', quantity: '1 inch' },
      { name: 'Kasuri Methi', confidence: 0.78, emoji: '🌿', quantity: '1 tbsp' },
    ],
    stage: 'cooking',
    dish_prediction: {
      name: 'Butter Chicken',
      cuisine: 'Indian',
      confidence: 0.96,
      description: 'A rich, creamy tomato-based curry with tender chicken pieces, finished with butter and cream. One of India\'s most beloved dishes.',
    },
    instructions: [
      { step_number: 1, instruction: 'Marinate chicken in yogurt, turmeric, chili powder, and salt for 30 minutes.', duration: '30 min', tip: 'Overnight marination gives the best flavor.' },
      { step_number: 2, instruction: 'Sear marinated chicken pieces in a hot pan until golden on all sides.', duration: '8 min', temperature: '200°C', tip: 'Don\'t overcrowd the pan — work in batches.' },
      { step_number: 3, instruction: 'Sauté onions, garlic, and ginger in butter until golden brown.', duration: '10 min' },
      { step_number: 4, instruction: 'Add tomato puree, garam masala, cumin, and chili powder. Cook until oil separates.', duration: '15 min', tip: 'This is the key step — let the masala cook properly.' },
      { step_number: 5, instruction: 'Add seared chicken pieces to the gravy and simmer on low heat.', duration: '20 min', temperature: '160°C' },
      { step_number: 6, instruction: 'Stir in heavy cream and a knob of butter. Simmer for 5 more minutes.', duration: '5 min' },
      { step_number: 7, instruction: 'Finish with crushed kasuri methi and adjust salt.', duration: '2 min', tip: 'Crush the methi between your palms to release aroma.' },
      { step_number: 8, instruction: 'Garnish with cream swirl and fresh coriander. Serve with naan or rice.', duration: '1 min' },
    ],
    remaining_time: '25 minutes',
    tips: [
      'Use bone-in chicken for richer flavor.',
      'Let the tomato base cook until oil separates for authentic taste.',
      'Add a pinch of sugar to balance the acidity of tomatoes.',
      'Kasuri methi is essential — don\'t skip it.',
    ],
    copilot: {
      next_step: 'Add heavy cream and reduce heat to low. Simmer for 5 minutes to let the flavors meld together.',
      mistakes_detected: ['Gravy appears slightly too thick — may need a splash of water.'],
      fixes: ['Add 2-3 tablespoons of warm water and stir gently to reach desired consistency.'],
      readiness_percent: 65,
      readiness_label: 'Cooking — needs more time',
    },
    nutrition: {
      calories: 520,
      protein_g: 38,
      carbs_g: 12,
      fat_g: 35,
      fiber_g: 3,
      tags: ['High Protein', 'Gluten-Free'],
    },
    spice_recommendations: [
      { name: 'Garam Masala', emoji: '✨', reason: 'Essential warm spice blend for depth of flavor.' },
      { name: 'Kashmiri Red Chili', emoji: '🌶️', reason: 'Adds vibrant color without excessive heat.' },
      { name: 'Fenugreek Leaves', emoji: '🌿', reason: 'Signature earthy, slightly bitter finish.' },
    ],
    cuisine_style: 'North Indian',
    language: 'en',
  },

  // 2. Pasta Carbonara — Italian, almost_done stage
  {
    id: 'mock-carbonara-002',
    ingredients: [
      { name: 'Spaghetti', confidence: 0.98, emoji: '🍝', quantity: '400g' },
      { name: 'Guanciale', confidence: 0.92, emoji: '🥓', quantity: '150g' },
      { name: 'Pecorino Romano', confidence: 0.90, emoji: '🧀', quantity: '100g' },
      { name: 'Egg Yolks', confidence: 0.95, emoji: '🥚', quantity: '4 large' },
      { name: 'Black Pepper', confidence: 0.88, emoji: '🫚', quantity: '2 tsp' },
    ],
    stage: 'almost_done',
    dish_prediction: {
      name: 'Pasta Carbonara',
      cuisine: 'Italian',
      confidence: 0.94,
      description: 'A classic Roman pasta made with egg yolks, cured pork, hard cheese, and black pepper. Simple yet luxurious.',
    },
    instructions: [
      { step_number: 1, instruction: 'Bring a large pot of well-salted water to a rolling boil.', duration: '10 min', tip: 'The water should taste like the sea.' },
      { step_number: 2, instruction: 'Cook spaghetti until al dente, 1 minute less than package directions.', duration: '9 min' },
      { step_number: 3, instruction: 'Cut guanciale into small strips and render in a cold pan on medium heat.', duration: '8 min', tip: 'Start in a cold pan for even rendering.' },
      { step_number: 4, instruction: 'Whisk egg yolks with grated Pecorino Romano and generous black pepper.', duration: '3 min' },
      { step_number: 5, instruction: 'Reserve 1 cup pasta water, then drain spaghetti.', duration: '1 min', tip: 'Pasta water is liquid gold — don\'t throw it away!' },
      { step_number: 6, instruction: 'Toss hot pasta with guanciale off heat. Let cool 30 seconds.', duration: '1 min', temperature: 'Off heat' },
      { step_number: 7, instruction: 'Pour egg mixture over pasta, tossing vigorously. Add pasta water to reach silky consistency.', duration: '2 min', tip: 'Keep it off direct heat or you\'ll get scrambled eggs.' },
    ],
    remaining_time: '3 minutes',
    tips: [
      'Never use cream — authentic carbonara gets its creaminess from eggs and cheese.',
      'Guanciale is traditional; pancetta is an acceptable substitute.',
      'Toss the egg mixture off heat to avoid scrambling.',
      'Use Pecorino Romano, not Parmesan, for authenticity.',
    ],
    copilot: {
      next_step: 'Toss vigorously and plate immediately. Finish with extra Pecorino and cracked pepper.',
      mistakes_detected: [],
      fixes: [],
      readiness_percent: 90,
      readiness_label: 'Almost ready to plate',
    },
    nutrition: {
      calories: 680,
      protein_g: 28,
      carbs_g: 65,
      fat_g: 32,
      fiber_g: 2,
      tags: ['High Carb', 'Comfort Food'],
    },
    spice_recommendations: [
      { name: 'Black Pepper', emoji: '🫚', reason: 'The only spice you need — use it generously and freshly cracked.' },
      { name: 'Nutmeg', emoji: '🥜', reason: 'A tiny pinch adds subtle warmth (optional, not traditional).' },
    ],
    cuisine_style: 'Roman Italian',
    language: 'en',
  },

  // 3. Raw vegetables / salad — raw stage
  {
    id: 'mock-raw-salad-003',
    ingredients: [
      { name: 'Romaine Lettuce', confidence: 0.96, emoji: '🥬', quantity: '1 head' },
      { name: 'Cherry Tomatoes', confidence: 0.94, emoji: '🍅', quantity: '200g' },
      { name: 'Cucumber', confidence: 0.93, emoji: '🥒', quantity: '1 large' },
      { name: 'Red Onion', confidence: 0.89, emoji: '🧅', quantity: '1 small' },
      { name: 'Avocado', confidence: 0.91, emoji: '🥑', quantity: '1 ripe' },
      { name: 'Bell Pepper', confidence: 0.87, emoji: '🫑', quantity: '1 medium' },
      { name: 'Feta Cheese', confidence: 0.82, emoji: '🧀', quantity: '100g' },
    ],
    stage: 'raw',
    dish_prediction: {
      name: 'Mediterranean Salad',
      cuisine: 'Mediterranean',
      confidence: 0.88,
      description: 'A fresh, vibrant salad with crisp vegetables, creamy avocado, and tangy feta cheese. Perfect as a light meal or side dish.',
    },
    instructions: [
      { step_number: 1, instruction: 'Wash all vegetables thoroughly under cold running water.', duration: '3 min' },
      { step_number: 2, instruction: 'Tear romaine lettuce into bite-sized pieces and spin dry.', duration: '2 min', tip: 'Dry lettuce ensures dressing clings better.' },
      { step_number: 3, instruction: 'Halve cherry tomatoes and dice cucumber into half-moons.', duration: '4 min' },
      { step_number: 4, instruction: 'Thinly slice red onion into rings and dice bell pepper.', duration: '3 min', tip: 'Soak onion rings in cold water for 5 min to mellow the bite.' },
      { step_number: 5, instruction: 'Slice avocado and squeeze lemon juice over it to prevent browning.', duration: '2 min' },
      { step_number: 6, instruction: 'Arrange vegetables on a platter and crumble feta on top.', duration: '2 min' },
      { step_number: 7, instruction: 'Drizzle with olive oil, lemon juice, salt, and oregano.', duration: '1 min' },
    ],
    remaining_time: '15 minutes',
    tips: [
      'Use the freshest vegetables you can find.',
      'Add olives and sun-dried tomatoes for extra Mediterranean flair.',
      'Make dressing separately and toss just before serving.',
      'Season with flaky sea salt for texture.',
    ],
    copilot: {
      next_step: 'Start by washing all vegetables. Prep your cutting board and sharp knife.',
      mistakes_detected: ['Avocado may not be ripe enough — check firmness.'],
      fixes: ['If avocado is firm, let it ripen 1-2 days at room temperature, or use immediately with extra lemon.'],
      readiness_percent: 5,
      readiness_label: 'Ingredients ready — time to prep',
    },
    nutrition: {
      calories: 280,
      protein_g: 10,
      carbs_g: 18,
      fat_g: 20,
      fiber_g: 8,
      tags: ['Vegetarian', 'Low Carb', 'Heart Healthy'],
    },
    spice_recommendations: [
      { name: 'Dried Oregano', emoji: '🌿', reason: 'Classic Mediterranean herb that pairs perfectly with feta.' },
      { name: 'Sumac', emoji: '✨', reason: 'Adds a tangy, lemony complexity.' },
      { name: 'Za\'atar', emoji: '🌱', reason: 'Herby Middle Eastern blend that elevates any salad.' },
    ],
    cuisine_style: 'Mediterranean',
    language: 'en',
  },

  // 4. Sushi Roll — Japanese, done stage
  {
    id: 'mock-sushi-004',
    ingredients: [
      { name: 'Sushi Rice', confidence: 0.97, emoji: '🍚', quantity: '300g' },
      { name: 'Nori Seaweed', confidence: 0.95, emoji: '🟢', quantity: '4 sheets' },
      { name: 'Salmon', confidence: 0.96, emoji: '🍣', quantity: '200g' },
      { name: 'Avocado', confidence: 0.93, emoji: '🥑', quantity: '1 ripe' },
      { name: 'Cucumber', confidence: 0.91, emoji: '🥒', quantity: '1 small' },
      { name: 'Rice Vinegar', confidence: 0.85, emoji: '🫗', quantity: '3 tbsp' },
    ],
    stage: 'done',
    dish_prediction: {
      name: 'Salmon Avocado Roll',
      cuisine: 'Japanese',
      confidence: 0.93,
      description: 'A classic maki roll with fresh salmon, creamy avocado, and crisp cucumber wrapped in seasoned sushi rice and nori.',
    },
    instructions: [
      { step_number: 1, instruction: 'Rinse sushi rice until water runs clear, then cook in rice cooker.', duration: '25 min', tip: 'Rinsing removes excess starch for perfect texture.' },
      { step_number: 2, instruction: 'Season hot rice with rice vinegar, sugar, and salt. Fan to cool.', duration: '5 min', temperature: 'Room temp' },
      { step_number: 3, instruction: 'Slice salmon into long, thin strips against the grain.', duration: '5 min', tip: 'Use sashimi-grade fish from a trusted source.' },
      { step_number: 4, instruction: 'Slice avocado and cucumber into thin matchsticks.', duration: '3 min' },
      { step_number: 5, instruction: 'Place nori on bamboo mat, spread rice evenly leaving 1cm border at top.', duration: '3 min', tip: 'Wet your hands to prevent rice from sticking.' },
      { step_number: 6, instruction: 'Arrange salmon, avocado, and cucumber in a line across the center.', duration: '2 min' },
      { step_number: 7, instruction: 'Roll tightly using the bamboo mat, seal with a dab of water.', duration: '2 min', tip: 'Apply even pressure — not too tight or the roll will burst.' },
      { step_number: 8, instruction: 'Slice each roll into 6-8 pieces with a wet, sharp knife.', duration: '2 min' },
    ],
    remaining_time: '0 minutes',
    tips: [
      'Always use sashimi-grade fish for raw preparations.',
      'Keep a bowl of water with rice vinegar nearby to wet your hands.',
      'A sharp knife dipped in water makes clean cuts.',
      'Serve with soy sauce, pickled ginger, and wasabi.',
    ],
    copilot: {
      next_step: 'Plate the sushi rolls beautifully. Serve with soy sauce, wasabi, and pickled ginger.',
      mistakes_detected: [],
      fixes: [],
      readiness_percent: 100,
      readiness_label: 'Ready to serve!',
    },
    nutrition: {
      calories: 380,
      protein_g: 22,
      carbs_g: 48,
      fat_g: 12,
      fiber_g: 4,
      tags: ['High Protein', 'Omega-3 Rich', 'Dairy-Free'],
    },
    spice_recommendations: [
      { name: 'Wasabi', emoji: '🟢', reason: 'Classic accompaniment that clears the palate.' },
      { name: 'Toasted Sesame', emoji: '🫘', reason: 'Adds nuttiness and beautiful presentation.' },
      { name: 'Shichimi Togarashi', emoji: '🌶️', reason: 'Japanese seven-spice blend for a subtle kick.' },
    ],
    cuisine_style: 'Japanese',
    language: 'en',
  },

  // 5. Biryani — Indian, preparation stage
  {
    id: 'mock-biryani-005',
    ingredients: [
      { name: 'Basmati Rice', confidence: 0.97, emoji: '🍚', quantity: '500g' },
      { name: 'Lamb', confidence: 0.94, emoji: '🥩', quantity: '600g' },
      { name: 'Onions', confidence: 0.96, emoji: '🧅', quantity: '4 large' },
      { name: 'Yogurt', confidence: 0.91, emoji: '🥛', quantity: '200g' },
      { name: 'Saffron', confidence: 0.85, emoji: '🌸', quantity: '1 pinch' },
      { name: 'Whole Spices', confidence: 0.88, emoji: '✨', quantity: 'assorted' },
      { name: 'Mint Leaves', confidence: 0.82, emoji: '🌿', quantity: '1 bunch' },
      { name: 'Ghee', confidence: 0.90, emoji: '🧈', quantity: '4 tbsp' },
    ],
    stage: 'preparation',
    dish_prediction: {
      name: 'Hyderabadi Biryani',
      cuisine: 'Indian',
      confidence: 0.92,
      description: 'A majestic layered rice dish with spiced lamb, caramelized onions, saffron milk, and aromatic herbs. The crown jewel of Indian cuisine.',
    },
    instructions: [
      { step_number: 1, instruction: 'Soak basmati rice in cold water for 30 minutes, then drain.', duration: '30 min', tip: 'Soaking ensures long, separate grains.' },
      { step_number: 2, instruction: 'Marinate lamb in yogurt, ginger-garlic paste, chili, and biryani masala.', duration: '60 min', tip: 'Marinate for at least 2 hours for best results.' },
      { step_number: 3, instruction: 'Slice onions thinly and deep-fry until golden brown (birista).', duration: '15 min', temperature: '180°C', tip: 'Remove early — they darken as they cool.' },
      { step_number: 4, instruction: 'Par-boil rice with whole spices until 70% cooked. Drain.', duration: '8 min', tip: 'Rice should still have a bite — it finishes in the dum.' },
      { step_number: 5, instruction: 'Layer marinated lamb at the bottom of a heavy pot. Top with half the fried onions.', duration: '5 min' },
      { step_number: 6, instruction: 'Add par-boiled rice on top. Drizzle saffron milk, ghee, and remaining onions.', duration: '5 min' },
      { step_number: 7, instruction: 'Seal pot with dough or foil and cook on dum (very low heat).', duration: '45 min', temperature: '120°C', tip: 'True dum cooking requires patience — don\'t lift the lid!' },
      { step_number: 8, instruction: 'Rest for 5 minutes, then gently mix layers and serve with raita.', duration: '5 min' },
    ],
    remaining_time: '2 hours 15 minutes',
    tips: [
      'Use aged basmati rice for the best texture.',
      'Saffron soaked in warm milk creates that signature golden color.',
      'Seal the pot tightly — steam is the secret to perfect biryani.',
      'Serve with mirchi ka salan and raita.',
    ],
    copilot: {
      next_step: 'Start soaking the rice and marinating the lamb simultaneously to save time.',
      mistakes_detected: ['Onions need to be sliced thinner for proper caramelization.', 'Rice has not been soaked yet.'],
      fixes: ['Use a mandoline for even, thin onion slices.', 'Begin soaking the rice immediately — it needs at least 30 minutes.'],
      readiness_percent: 15,
      readiness_label: 'Prep phase — long cook ahead',
    },
    nutrition: {
      calories: 720,
      protein_g: 42,
      carbs_g: 68,
      fat_g: 28,
      fiber_g: 4,
      tags: ['High Protein', 'Festive', 'Contains Dairy'],
    },
    spice_recommendations: [
      { name: 'Saffron', emoji: '🌸', reason: 'The soul of biryani — adds aroma, color, and luxury.' },
      { name: 'Mace & Nutmeg', emoji: '🥜', reason: 'Warm, sweet aromatics traditional in Hyderabadi biryani.' },
      { name: 'Star Anise', emoji: '⭐', reason: 'Adds subtle licorice depth to the rice.' },
      { name: 'Green Cardamom', emoji: '💚', reason: 'Essential aromatic — use whole pods for best flavor.' },
    ],
    cuisine_style: 'Hyderabadi Indian',
    language: 'en',
  },
];

/**
 * Return a random mock analysis for demo / fallback use.
 */
export function getRandomMockAnalysis(): AnalysisResponse {
  const index = Math.floor(Math.random() * mockAnalyses.length);
  return mockAnalyses[index];
}
