"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Plus,
  Trash2,
  ChefHat,
  Search,
  Apple,
  Beef,
  Milk,
  Wheat,
  Carrot,
  Egg,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import GlassCard from "@/components/ui/GlassCard";
import GlowButton from "@/components/ui/GlowButton";
import Badge from "@/components/ui/Badge";

interface PantryItem {
  id: string;
  name: string;
  emoji: string;
  quantity: string;
  category: string;
}

const categories = [
  { name: "All", icon: ShoppingCart },
  { name: "Vegetables", icon: Carrot },
  { name: "Proteins", icon: Beef },
  { name: "Dairy", icon: Milk },
  { name: "Grains", icon: Wheat },
  { name: "Fruits", icon: Apple },
  { name: "Spices", icon: Egg },
];

const initialPantry: PantryItem[] = [
  { id: "p1", name: "Chicken Breast", emoji: "🍗", quantity: "500g", category: "Proteins" },
  { id: "p2", name: "Onions", emoji: "🧅", quantity: "4 pcs", category: "Vegetables" },
  { id: "p3", name: "Tomatoes", emoji: "🍅", quantity: "6 pcs", category: "Vegetables" },
  { id: "p4", name: "Basmati Rice", emoji: "🍚", quantity: "1 kg", category: "Grains" },
  { id: "p5", name: "Butter", emoji: "🧈", quantity: "200g", category: "Dairy" },
  { id: "p6", name: "Heavy Cream", emoji: "🥛", quantity: "500ml", category: "Dairy" },
  { id: "p7", name: "Garam Masala", emoji: "🌶️", quantity: "50g", category: "Spices" },
  { id: "p8", name: "Turmeric", emoji: "🟡", quantity: "30g", category: "Spices" },
  { id: "p9", name: "Garlic", emoji: "🧄", quantity: "1 head", category: "Vegetables" },
  { id: "p10", name: "Ginger", emoji: "🫚", quantity: "100g", category: "Vegetables" },
  { id: "p11", name: "Eggs", emoji: "🥚", quantity: "12 pcs", category: "Proteins" },
  { id: "p12", name: "Pasta", emoji: "🍝", quantity: "500g", category: "Grains" },
  { id: "p13", name: "Lemons", emoji: "🍋", quantity: "4 pcs", category: "Fruits" },
  { id: "p14", name: "Bell Peppers", emoji: "🫑", quantity: "3 pcs", category: "Vegetables" },
  { id: "p15", name: "Paneer", emoji: "🧀", quantity: "250g", category: "Dairy" },
];

const dishSuggestions = [
  {
    name: "Butter Chicken",
    cuisine: "Indian",
    matchedIngredients: ["Chicken Breast", "Butter", "Heavy Cream", "Tomatoes", "Garam Masala"],
    missingIngredients: ["Kasuri Methi"],
    match: 92,
  },
  {
    name: "Chicken Biryani",
    cuisine: "Indian",
    matchedIngredients: ["Chicken Breast", "Basmati Rice", "Onions", "Garam Masala", "Turmeric"],
    missingIngredients: ["Saffron", "Yogurt"],
    match: 85,
  },
  {
    name: "Pasta Carbonara",
    cuisine: "Italian",
    matchedIngredients: ["Pasta", "Eggs", "Garlic"],
    missingIngredients: ["Pancetta", "Parmesan"],
    match: 70,
  },
  {
    name: "Paneer Tikka",
    cuisine: "Indian",
    matchedIngredients: ["Paneer", "Bell Peppers", "Onions", "Garam Masala", "Lemons"],
    missingIngredients: ["Yogurt"],
    match: 88,
  },
];

export default function PantryPage() {
  const [items, setItems] = useState<PantryItem[]>(initialPantry);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", emoji: "🥫", quantity: "", category: "Vegetables" });
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAdd = () => {
    if (!newItem.name.trim()) return;
    const item: PantryItem = {
      id: `p_${Date.now()}`,
      ...newItem,
    };
    setItems((prev) => [...prev, item]);
    setNewItem({ name: "", emoji: "🥫", quantity: "", category: "Vegetables" });
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 ml-16 md:ml-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-playfair)]">
                <ShoppingCart className="inline-block mr-3 text-[var(--accent-amber)]" size={36} />
                Pantry Tracker
              </h1>
              <p className="text-[var(--text-secondary)] mt-2">
                Track your ingredients and discover what you can cook
              </p>
            </div>
            <div className="flex gap-3">
              <GlowButton
                variant="secondary"
                size="sm"
                onClick={() => setShowSuggestions(!showSuggestions)}
              >
                <ChefHat size={16} className="mr-2" />
                {showSuggestions ? "Hide" : "Show"} Suggestions
              </GlowButton>
              <GlowButton size="sm" onClick={() => setShowAddForm(!showAddForm)}>
                <Plus size={16} className="mr-2" />
                Add Item
              </GlowButton>
            </div>
          </motion.div>

          {/* Add Form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-6"
              >
                <GlassCard className="p-5">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                    Add New Ingredient
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div>
                      <label className="block text-sm text-[var(--text-secondary)] mb-2">Emoji</label>
                      <input
                        value={newItem.emoji}
                        onChange={(e) => setNewItem({ ...newItem, emoji: e.target.value })}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-glass)] rounded-lg px-4 py-2.5 text-center text-2xl focus:outline-none focus:border-[var(--accent-amber)] transition-colors"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-[var(--text-secondary)] mb-2">Name</label>
                      <input
                        placeholder="e.g. Chicken Breast"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-glass)] rounded-lg px-4 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent-amber)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[var(--text-secondary)] mb-2">Quantity</label>
                      <input
                        placeholder="e.g. 500g"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-glass)] rounded-lg px-4 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent-amber)] transition-colors"
                      />
                    </div>
                    <GlowButton onClick={handleAdd}>Add</GlowButton>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dish Suggestions */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-6"
              >
                <GlassCard className="p-5 border-[var(--accent-amber)]/30">
                  <h3 className="text-lg font-bold text-[var(--accent-amber)] mb-4 font-[family-name:var(--font-playfair)]">
                    <ChefHat className="inline-block mr-2" size={20} />
                    What You Can Cook
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dishSuggestions.map((dish, i) => (
                      <motion.div
                        key={dish.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[var(--bg-primary)] rounded-xl p-4 border border-[var(--border-glass)]"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-[var(--text-primary)]">{dish.name}</h4>
                          <span className="text-sm font-mono text-[var(--accent-amber)]">
                            {dish.match}% match
                          </span>
                        </div>
                        <Badge variant="info" size="sm">{dish.cuisine}</Badge>
                        <div className="mt-3">
                          <div className="text-xs text-[var(--text-secondary)] mb-1">
                            ✅ Have: {dish.matchedIngredients.join(", ")}
                          </div>
                          {dish.missingIngredients.length > 0 && (
                            <div className="text-xs text-red-400/80">
                              ❌ Missing: {dish.missingIngredients.join(", ")}
                            </div>
                          )}
                        </div>
                        {/* Match bar */}
                        <div className="mt-3 h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-[var(--accent-amber)] to-[var(--accent-saffron)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${dish.match}%` }}
                            transition={{ duration: 0.8, delay: i * 0.15 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Tabs + Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.name
                      ? "bg-[var(--accent-amber)] text-black"
                      : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-glass)]"
                  }`}
                >
                  <cat.icon size={14} />
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="relative flex-shrink-0 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={16} />
              <input
                type="text"
                placeholder="Search pantry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-glass)] rounded-xl pl-9 pr-4 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent-amber)] transition-colors"
              />
            </div>
          </div>

          {/* Pantry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <AnimatePresence>
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: i * 0.03 }}
                  layout
                >
                  <GlassCard
                    hover
                    className="p-4 text-center group relative"
                  >
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="absolute top-2 right-2 p-1 rounded-md text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                    <span className="text-3xl block mb-2">{item.emoji}</span>
                    <h4 className="text-sm font-medium text-[var(--text-primary)] truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      {item.quantity}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredItems.length === 0 && (
            <GlassCard className="p-12 text-center mt-4">
              <ShoppingCart className="mx-auto mb-4 text-[var(--text-secondary)]" size={48} />
              <p className="text-[var(--text-secondary)]">
                No items found. Add some ingredients to your pantry!
              </p>
            </GlassCard>
          )}
        </main>
      </div>
    </div>
  );
}
