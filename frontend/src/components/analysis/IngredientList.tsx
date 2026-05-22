'use client';

import { motion } from 'framer-motion';
import { formatConfidence } from '@/lib/utils';
import type { Ingredient } from '@/types';

interface ConfidenceBarProps {
  value: number;
  label?: string;
  color?: string;
}

export function ConfidenceBar({ value, label, color = 'from-amber-500 to-orange-500' }: ConfidenceBarProps) {
  return (
    <div className="flex items-center gap-3 w-full">
      {label && (
        <span className="text-xs text-white/50 w-20 shrink-0 truncate">{label}</span>
      )}
      <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.round(value * 100)}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 }}
        />
      </div>
      <span className="text-xs text-white/40 w-10 text-right font-[family-name:var(--font-mono)]">
        {formatConfidence(value)}
      </span>
    </div>
  );
}

interface IngredientListProps {
  ingredients: Ingredient[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0 },
};

export default function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
          Detected Ingredients
        </h3>
        <span className="text-xs rounded-full bg-amber-500/15 text-amber-400 px-2.5 py-0.5 font-[family-name:var(--font-mono)]">
          {ingredients.length} found
        </span>
      </div>

      {/* List */}
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {ingredients.map((ingredient) => (
          <motion.li
            key={ingredient.name}
            variants={item}
            className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.04] px-4 py-3 hover:bg-white/[0.05] transition-colors"
          >
            <span className="text-lg shrink-0">{ingredient.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-white/85 truncate">
                  {ingredient.name}
                </span>
                {ingredient.quantity && (
                  <span className="text-xs text-white/35 shrink-0 ml-2">
                    {ingredient.quantity}
                  </span>
                )}
              </div>
              <ConfidenceBar value={ingredient.confidence} />
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
