'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, ArrowRight, History } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import DropZone from '@/components/upload/DropZone';
import ImagePreview from '@/components/upload/ImagePreview';
import UploadCard from '@/components/upload/UploadCard';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useAnalysis } from '@/hooks/useAnalysis';
import { mockAnalyses } from '@/lib/mockData';

// Analysis result components
import DishPrediction from '@/components/analysis/DishPrediction';
import IngredientList from '@/components/analysis/IngredientList';
import CookingStageComponent from '@/components/analysis/CookingStage';
import CookingTimeline from '@/components/analysis/CookingTimeline';
import CopilotPanel from '@/components/analysis/CopilotPanel';
import NutritionCard from '@/components/recipe/NutritionCard';
import SpiceRecommend from '@/components/recipe/SpiceRecommend';
import StepByStep from '@/components/recipe/StepByStep';

const recentUploads = mockAnalyses.slice(0, 4);

export default function UploadPage() {
  const { file, preview, error: uploadError, clearFile, getRootProps, getInputProps, isDragActive } = useImageUpload();
  const { analysis, isAnalyzing, error: analysisError, analyze } = useAnalysis();
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = async () => {
    if (!file) return;
    await analyze(file);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <div className="flex">
        <Sidebar />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 ml-0 lg:ml-64">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white/95 font-[family-name:var(--font-playfair)] mb-2">
              Upload & Analyze
            </h1>
            <p className="text-sm text-white/40">
              Drop a food image and let AI identify ingredients, predict the dish, and guide your cooking.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column — Upload Area */}
            <div className="xl:col-span-2 space-y-6">
              <AnimatePresence mode="wait">
                {!file ? (
                  <DropZone
                    key="dropzone"
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                    isDragActive={isDragActive}
                  />
                ) : (
                  <motion.div key="preview" className="space-y-4">
                    <ImagePreview file={file} preview={preview!} onRemove={clearFile} />

                    {/* Action buttons */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="
                          relative flex items-center gap-2.5 rounded-xl px-6 py-3
                          bg-gradient-to-r from-amber-500 to-orange-500
                          text-black font-semibold text-sm
                          shadow-[0_0_20px_rgba(245,158,11,0.25)]
                          hover:shadow-[0_0_30px_rgba(245,158,11,0.35)]
                          disabled:opacity-50 disabled:cursor-not-allowed
                          transition-shadow
                        "
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Analyzing…
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4" />
                            Analyze with AI
                          </>
                        )}
                      </motion.button>

                      <button
                        onClick={clearFile}
                        className="rounded-xl px-4 py-3 text-sm text-white/40 hover:text-white/60 hover:bg-white/[0.04] border border-white/[0.06] transition-colors"
                      >
                        Choose Different
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Upload Error */}
              {(uploadError || analysisError) && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-red-500/15 bg-red-500/[0.06] px-4 py-3"
                >
                  <p className="text-sm text-red-400">{uploadError || analysisError}</p>
                </motion.div>
              )}

              {/* Loading skeleton */}
              <AnimatePresence>
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse"
                      >
                        <div className="h-4 w-1/3 rounded bg-white/[0.06] mb-4" />
                        <div className="h-3 w-full rounded bg-white/[0.04] mb-2" />
                        <div className="h-3 w-2/3 rounded bg-white/[0.04]" />
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Analysis Results */}
              <AnimatePresence>
                {showResults && analysis && !isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    {/* Dish Prediction */}
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-6">
                      <DishPrediction prediction={analysis.dish_prediction} />
                    </div>

                    {/* Cooking Stage */}
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-6">
                      <CookingStageComponent stage={analysis.stage} />
                    </div>

                    {/* Two-column: Ingredients + Nutrition */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-6">
                        <IngredientList ingredients={analysis.ingredients} />
                      </div>
                      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-6">
                        <NutritionCard nutrition={analysis.nutrition} />
                      </div>
                    </div>

                    {/* Copilot */}
                    <CopilotPanel copilot={analysis.copilot} />

                    {/* Cooking Timeline */}
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-6">
                      <CookingTimeline steps={analysis.instructions} />
                    </div>

                    {/* Step by Step */}
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-6">
                      <StepByStep steps={analysis.instructions} />
                    </div>

                    {/* Spice Recommendations */}
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-6">
                      <SpiceRecommend spices={analysis.spice_recommendations} />
                    </div>

                    {/* View full analysis button */}
                    <motion.a
                      href="/analysis"
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center justify-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] px-6 py-3.5 text-sm font-medium text-amber-400 hover:bg-amber-500/[0.1] transition-colors"
                    >
                      View Full Analysis Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column — Recent Uploads */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white/50 mb-2">
                <History className="h-4 w-4" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Recent Uploads</h3>
              </div>

              {recentUploads.map((mock, i) => (
                <motion.div
                  key={mock.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <UploadCard
                    dishName={mock.dish_prediction.name}
                    cuisine={mock.dish_prediction.cuisine}
                    timestamp={`${2 + i}h ago`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
