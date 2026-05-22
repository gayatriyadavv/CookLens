'use client';

import { motion } from 'framer-motion';
import { Utensils, Clock, ChefHat } from 'lucide-react';
import type { AnalysisResponse } from '@/types';
import { stageToLabel } from '@/lib/utils';

interface RecipeCardProps {
  analysis: AnalysisResponse;
  onClick?: () => void;
}

export default function RecipeCard({ analysis, onClick }: RecipeCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative w-full rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-5 text-left overflow-hidden transition-all hover:border-amber-500/20 hover:bg-white/[0.05]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        {/* Top row */}
        <div className="flex items-start justify-between mb-3">
          <div className="rounded-xl bg-gradient-to-br from-amber-500/15 to-orange-600/10 p-2.5">
            <ChefHat className="h-5 w-5 text-amber-400" />
          </div>
          <span className="text-xs rounded-full bg-amber-500/15 text-amber-400 px-2.5 py-1 font-medium">
            {analysis.dish_prediction.cuisine}
          </span>
        </div>

        {/* Dish name */}
        <h3 className="text-lg font-bold text-white/90 mb-2 font-[family-name:var(--font-playfair)]">
          {analysis.dish_prediction.name}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-white/40">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {analysis.remaining_time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Utensils className="h-3.5 w-3.5" />
            {analysis.ingredients.length} ingredients
          </span>
        </div>

        {/* Stage badge */}
        <div className="mt-3 pt-3 border-t border-white/[0.04]">
          <span className="text-[10px] uppercase tracking-wider text-white/30">
            Stage: {stageToLabel(analysis.stage)}
          </span>
        </div>
      </div>
    </motion.button>
  );
}
