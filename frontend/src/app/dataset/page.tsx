"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Database,
  Download,
  RefreshCw,
  BarChart3,
  FileJson,
  Sparkles,
  Globe,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import GlassCard from "@/components/ui/GlassCard";
import GlowButton from "@/components/ui/GlowButton";
import Badge from "@/components/ui/Badge";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import {
  getDatasetStats,
  getDatasetEntries,
  generateDataset,
  downloadDatasetFile,
} from "@/lib/api";

const cuisineOptions = [
  "All Cuisines",
  "Indian",
  "Italian",
  "Japanese",
  "Mexican",
  "Thai",
  "French",
  "Chinese",
];

const stageOptions = [
  "All Stages",
  "raw",
  "preparation",
  "cooking",
  "almost_done",
  "done",
];

interface DatasetEntry {
  id: string;
  prompt: string;
  cuisine: string;
  stage: string;
  dish: string;
  created: string;
}

export default function DatasetPage() {
  const [selectedCuisine, setSelectedCuisine] = useState("All Cuisines");
  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [generateCount, setGenerateCount] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState<DatasetEntry[]>([]);
  const [stats, setStats] = useState({
    totalEntries: 0,
    cuisines: 0,
    avgConfidence: 0,
    stages: {} as Record<string, number>,
    topCuisines: [] as Array<{ name: string; count: number }>,
  });

  const loadData = async () => {
    try {
      const [entriesData, statsData] = await Promise.all([
        getDatasetEntries(),
        getDatasetStats()
      ]);
      setEntries(entriesData);
      setStats(statsData);
    } catch (err) {
      console.error("Failed to load dataset data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await generateDataset(generateCount, selectedCuisine, selectedStage);
      await loadData();
    } catch (err) {
      console.error("Failed to generate dataset:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredEntries = entries.filter((e) => {
    if (selectedCuisine !== "All Cuisines" && e.cuisine !== selectedCuisine)
      return false;
    if (selectedStage !== "All Stages" && e.stage !== selectedStage)
      return false;
    return true;
  });

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
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-playfair)]">
              <Database className="inline-block mr-3 text-[var(--accent-amber)]" size={36} />
              Dataset Builder
            </h1>
            <p className="text-[var(--text-secondary)] mt-2">
              Generate synthetic cooking data for model fine-tuning
            </p>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Entries", value: stats.totalEntries, icon: FileJson },
              { label: "Cuisines", value: stats.cuisines, icon: Globe },
              { label: "Avg Confidence", value: stats.avgConfidence, suffix: "%" , icon: BarChart3},
              { label: "Generated Today", value: 24, icon: Sparkles },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="p-4 text-center">
                  <stat.icon className="mx-auto mb-2 text-[var(--accent-amber)]" size={24} />
                  <div className="text-2xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-mono)]">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix || ""} />
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mt-1">
                    {stat.label}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Generator Controls */}
          <GlassCard className="p-6 mb-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 font-[family-name:var(--font-playfair)]">
              <Sparkles className="inline-block mr-2 text-[var(--accent-amber)]" size={20} />
              Generate Synthetic Data
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-2">
                  Cuisine Filter
                </label>
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-glass)] rounded-lg px-4 py-2.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-amber)] transition-colors"
                >
                  {cuisineOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-2">
                  Stage Filter
                </label>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-glass)] rounded-lg px-4 py-2.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-amber)] transition-colors"
                >
                  {stageOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-2">
                  Count
                </label>
                <input
                  type="number"
                  value={generateCount}
                  onChange={(e) =>
                    setGenerateCount(Math.max(1, Math.min(100, +e.target.value)))
                  }
                  min={1}
                  max={100}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-glass)] rounded-lg px-4 py-2.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-amber)] transition-colors"
                />
              </div>
              <GlowButton onClick={handleGenerate} loading={isGenerating}>
                <RefreshCw size={16} className="mr-2" />
                Generate
              </GlowButton>
            </div>
          </GlassCard>

          {/* Cuisine Distribution */}
          <GlassCard className="p-6 mb-8">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">
              Cuisine Distribution
            </h2>
            <div className="space-y-3">
              {stats.topCuisines.map((cuisine) => (
                <div key={cuisine.name} className="flex items-center gap-3">
                  <span className="text-sm text-[var(--text-secondary)] w-20">
                    {cuisine.name}
                  </span>
                  <div className="flex-1 h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--accent-amber)] to-[var(--accent-saffron)]"
                      initial={{ width: 0 }}
                      animate={{
                        width: stats.totalEntries > 0 ? `${(cuisine.count / stats.totalEntries) * 100}%` : "0%",
                      }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                  <span className="text-sm font-mono text-[var(--text-primary)] w-8">
                    {cuisine.count}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Dataset Entries Table */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                Dataset Entries ({filteredEntries.length})
              </h2>
              <div className="flex items-center gap-2">
                <GlowButton variant="secondary" size="sm" onClick={() => downloadDatasetFile("json")}>
                  <Download size={14} className="mr-2" />
                  Export JSON
                </GlowButton>
                <GlowButton variant="secondary" size="sm" onClick={() => downloadDatasetFile("csv")}>
                  <Download size={14} className="mr-2" />
                  Export CSV
                </GlowButton>
                <GlowButton variant="secondary" size="sm" onClick={() => downloadDatasetFile("zip")}>
                  <Download size={14} className="mr-2" />
                  Download ZIP
                </GlowButton>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-glass)]">
                    <th className="text-left py-3 px-4 text-[var(--text-secondary)] font-medium">
                      ID
                    </th>
                    <th className="text-left py-3 px-4 text-[var(--text-secondary)] font-medium">
                      Prompt
                    </th>
                    <th className="text-left py-3 px-4 text-[var(--text-secondary)] font-medium">
                      Cuisine
                    </th>
                    <th className="text-left py-3 px-4 text-[var(--text-secondary)] font-medium">
                      Stage
                    </th>
                    <th className="text-left py-3 px-4 text-[var(--text-secondary)] font-medium">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((entry, i) => (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-[var(--border-glass)]/30 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3 px-4 font-mono text-[var(--accent-amber)] text-xs">
                        {entry.id}
                      </td>
                      <td className="py-3 px-4 text-[var(--text-primary)] max-w-xs truncate">
                        {entry.prompt}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="info" size="sm">
                          {entry.cuisine}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            entry.stage === "done"
                              ? "success"
                              : entry.stage === "raw"
                                ? "danger"
                                : "warning"
                          }
                          size="sm"
                        >
                          {entry.stage}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-[var(--text-secondary)] text-xs">
                        {entry.created}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </main>
      </div>
    </div>
  );
}
