'use client';

import { motion } from 'framer-motion';
import { Clock, ChefHat, Globe } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import DishPrediction from '@/components/analysis/DishPrediction';
import IngredientList from '@/components/analysis/IngredientList';
import CookingStageComponent from '@/components/analysis/CookingStage';
import CookingTimeline from '@/components/analysis/CookingTimeline';
import CopilotPanel from '@/components/analysis/CopilotPanel';
import NutritionCard from '@/components/recipe/NutritionCard';
import SpiceRecommend from '@/components/recipe/SpiceRecommend';
import StepByStep from '@/components/recipe/StepByStep';
import { mockAnalyses } from '@/lib/mockData';
import { stageToLabel, stageToColor } from '@/lib/utils';

// Use the first mock as the demo analysis
const analysis = mockAnalyses[0];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function AnalysisPage() {
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
              AI Analysis
            </h1>
            <p className="text-sm text-white/40">
              Complete breakdown of your food image powered by CookLens AI.
            </p>
          </motion.div>

          {/* Two-column hero */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
            {/* Left — Image / Placeholder */}
            <motion.div
              custom={0}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2"
            >
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
                {/* Image placeholder with gradient */}
                <div className="aspect-square w-full bg-gradient-to-br from-amber-900/40 via-orange-900/30 to-red-900/30 flex items-center justify-center relative">
                  <div className="text-center">
                    <span className="text-6xl mb-4 block">🍽️</span>
                    <p className="text-sm text-white/30">
                      {analysis.dish_prediction.name}
                    </p>
                  </div>

                  {/* Stage badge overlay */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1.5 text-xs font-medium ${stageToColor(analysis.stage)}`}>
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-75 animate-ping" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
                      </span>
                      {stageToLabel(analysis.stage)}
                    </span>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
                  <div className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-white/30 mb-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-[10px] uppercase tracking-wider">Time</span>
                    </div>
                    <p className="text-sm font-semibold text-white/70 font-[family-name:var(--font-mono)]">
                      {analysis.remaining_time}
                    </p>
                  </div>
                  <div className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-white/30 mb-1">
                      <ChefHat className="h-3 w-3" />
                      <span className="text-[10px] uppercase tracking-wider">Steps</span>
                    </div>
                    <p className="text-sm font-semibold text-white/70 font-[family-name:var(--font-mono)]">
                      {analysis.instructions.length}
                    </p>
                  </div>
                  <div className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-white/30 mb-1">
                      <Globe className="h-3 w-3" />
                      <span className="text-[10px] uppercase tracking-wider">Style</span>
                    </div>
                    <p className="text-sm font-semibold text-white/70 truncate px-1">
                      {analysis.cuisine_style}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — Dish Prediction + Stage */}
            <div className="lg:col-span-3 space-y-6">
              <motion.div
                custom={1}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-6"
              >
                <DishPrediction prediction={analysis.dish_prediction} />
              </motion.div>

              <motion.div
                custom={2}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-6"
              >
                <CookingStageComponent stage={analysis.stage} />
              </motion.div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Ingredients */}
            <motion.div
              custom={3}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-6"
            >
              <IngredientList ingredients={analysis.ingredients} />
            </motion.div>

            {/* Nutrition */}
            <motion.div
              custom={4}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-6"
            >
              <NutritionCard nutrition={analysis.nutrition} />
            </motion.div>
          </div>

          {/* Copilot — full width */}
          <motion.div
            custom={5}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <CopilotPanel copilot={analysis.copilot} />
          </motion.div>

          {/* Cooking Timeline — full width */}
          <motion.div
            custom={6}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-6 mb-8"
          >
            <CookingTimeline steps={analysis.instructions} />
          </motion.div>

          {/* Step by Step — full width */}
          <motion.div
            custom={7}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-6 mb-8"
          >
            <StepByStep steps={analysis.instructions} />
          </motion.div>

          {/* Spices + Tips */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              custom={8}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-6"
            >
              <SpiceRecommend spices={analysis.spice_recommendations} />
            </motion.div>

            {/* Tips */}
            <motion.div
              custom={9}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-6"
            >
              <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
                Pro Tips
              </h3>
              <ul className="space-y-3">
                {analysis.tips.map((tip, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-start gap-3 text-sm text-white/55 leading-relaxed"
                  >
                    <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-amber-500/50" />
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
