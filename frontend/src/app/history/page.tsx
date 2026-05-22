"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Trash2, ChefHat, Search, Filter } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import GlassCard from "@/components/ui/GlassCard";
import GlowButton from "@/components/ui/GlowButton";
import Badge from "@/components/ui/Badge";
import { mockAnalyses } from "@/lib/mockData";
import type { AnalysisResponse } from "@/types";

function getTimeAgo(index: number): string {
  const times = [
    "2 hours ago",
    "5 hours ago",
    "Yesterday",
    "2 days ago",
    "3 days ago",
  ];
  return times[index % times.length];
}

export default function HistoryPage() {
  const [history, setHistory] = useState<AnalysisResponse[]>(mockAnalyses);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCuisine, setFilterCuisine] = useState("All");
  const [selectedItem, setSelectedItem] = useState<AnalysisResponse | null>(null);

  const cuisines = [
    "All",
    ...new Set(history.map((h) => h.dish_prediction.cuisine)),
  ];

  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.dish_prediction.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCuisine =
      filterCuisine === "All" || item.dish_prediction.cuisine === filterCuisine;
    return matchesSearch && matchesCuisine;
  });

  const handleDelete = (id: string) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
    if (selectedItem?.id === id) setSelectedItem(null);
  };

  const handleClearAll = () => {
    setHistory([]);
    setSelectedItem(null);
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
                <Clock className="inline-block mr-3 text-[var(--accent-amber)]" size={36} />
                Recipe History
              </h1>
              <p className="text-[var(--text-secondary)] mt-2">
                Your past AI analyses and generated recipes
              </p>
            </div>
            {history.length > 0 && (
              <GlowButton variant="secondary" size="sm" onClick={handleClearAll}>
                <Trash2 size={14} className="mr-2" />
                Clear All
              </GlowButton>
            )}
          </motion.div>

          {/* Filters */}
          <GlassCard className="p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-glass)] rounded-lg pl-10 pr-4 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent-amber)] transition-colors"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-[var(--text-secondary)]" />
                {cuisines.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => setFilterCuisine(cuisine)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      filterCuisine === cuisine
                        ? "bg-[var(--accent-amber)] text-black"
                        : "bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* History Grid */}
          {filteredHistory.length === 0 ? (
            <GlassCard className="p-12 text-center">
              <ChefHat className="mx-auto mb-4 text-[var(--text-secondary)]" size={48} />
              <p className="text-[var(--text-secondary)] text-lg">
                {history.length === 0
                  ? "No recipes yet. Upload a food image to get started!"
                  : "No recipes match your search."}
              </p>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredHistory.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                  >
                    <GlassCard
                      hover
                      className="p-5 cursor-pointer group"
                      onClick={() =>
                        setSelectedItem(
                          selectedItem?.id === item.id ? null : item
                        )
                      }
                    >
                      {/* Dish Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-[var(--text-primary)] font-[family-name:var(--font-playfair)]">
                            {item.dish_prediction.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="info" size="sm">
                              {item.dish_prediction.cuisine}
                            </Badge>
                            <Badge
                              variant={
                                item.stage === "done"
                                  ? "success"
                                  : item.stage === "raw"
                                    ? "danger"
                                    : "warning"
                              }
                              size="sm"
                            >
                              {item.stage}
                            </Badge>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                          className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-400/10 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Ingredients Preview */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.ingredients.slice(0, 4).map((ing) => (
                          <span
                            key={ing.name}
                            className="text-xs bg-[var(--bg-primary)] px-2 py-1 rounded-full text-[var(--text-secondary)]"
                          >
                            {ing.emoji} {ing.name}
                          </span>
                        ))}
                        {item.ingredients.length > 4 && (
                          <span className="text-xs bg-[var(--bg-primary)] px-2 py-1 rounded-full text-[var(--text-secondary)]">
                            +{item.ingredients.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {getTimeAgo(index)}
                        </span>
                        <span className="font-mono">
                          {Math.round(item.dish_prediction.confidence * 100)}%
                          confidence
                        </span>
                      </div>

                      {/* Expanded Details */}
                      <AnimatePresence>
                        {selectedItem?.id === item.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-4 pt-4 border-t border-[var(--border-glass)]"
                          >
                            <div className="space-y-3">
                              <div>
                                <h4 className="text-sm font-semibold text-[var(--accent-amber)] mb-1">
                                  Next Step
                                </h4>
                                <p className="text-sm text-[var(--text-secondary)]">
                                  {item.copilot.next_step}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-[var(--accent-amber)] mb-1">
                                  Remaining Time
                                </h4>
                                <p className="text-sm text-[var(--text-primary)]">
                                  {item.remaining_time}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-[var(--accent-amber)] mb-1">
                                  Quick Tips
                                </h4>
                                <ul className="text-sm text-[var(--text-secondary)] list-disc pl-4 space-y-1">
                                  {item.tips.slice(0, 2).map((tip, i) => (
                                    <li key={i}>{tip}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-secondary)]">
                                <span>🔥 {item.nutrition.calories} cal</span>
                                <span>💪 {item.nutrition.protein_g}g protein</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
