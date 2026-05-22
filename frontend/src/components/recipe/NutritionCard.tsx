'use client';

import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import type { NutritionEstimate } from '@/types';

interface NutritionCardProps {
  nutrition: NutritionEstimate;
}

interface NutrientBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
  unit: string;
}

function NutrientBar({ label, value, max, color, unit }: NutrientBarProps) {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-white/50">{label}</span>
        <span className="text-xs text-white/60 font-[family-name:var(--font-mono)]">
          {value}{unit}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 }}
        />
      </div>
    </div>
  );
}

export default function NutritionCard({ nutrition }: NutritionCardProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
        Nutrition Estimate
      </h3>

      {/* Calorie highlight */}
      <div className="flex items-center gap-4 mb-5 rounded-xl border border-amber-500/10 bg-amber-500/[0.05] p-4">
        <div className="rounded-xl bg-amber-500/15 p-2.5">
          <Flame className="h-5 w-5 text-amber-400" />
        </div>
        <div>
          <p className="text-xs text-white/40 mb-0.5">Calories</p>
          <div className="flex items-baseline gap-1">
            <motion.span
              className="text-2xl font-bold text-amber-400 font-[family-name:var(--font-mono)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {nutrition.calories}
            </motion.span>
            <span className="text-xs text-white/30">kcal</span>
          </div>
        </div>
      </div>

      {/* Nutrient bars */}
      <div className="space-y-3 mb-5">
        <NutrientBar label="Protein" value={nutrition.protein_g} max={60} color="bg-gradient-to-r from-emerald-500 to-emerald-400" unit="g" />
        <NutrientBar label="Carbs" value={nutrition.carbs_g} max={100} color="bg-gradient-to-r from-blue-500 to-blue-400" unit="g" />
        <NutrientBar label="Fat" value={nutrition.fat_g} max={70} color="bg-gradient-to-r from-amber-500 to-orange-400" unit="g" />
        <NutrientBar label="Fiber" value={nutrition.fiber_g} max={30} color="bg-gradient-to-r from-violet-500 to-purple-400" unit="g" />
      </div>

      {/* Tags */}
      {nutrition.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {nutrition.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] rounded-full bg-white/[0.06] border border-white/[0.06] text-white/45 px-2.5 py-1 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
