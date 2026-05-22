'use client';

import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';
import { formatConfidence } from '@/lib/utils';
import type { DishPrediction as DishPredictionType } from '@/types';

interface DishPredictionProps {
  prediction: DishPredictionType;
}

export default function DishPrediction({ prediction }: DishPredictionProps) {
  const confidencePercent = Math.round(prediction.confidence * 100);
  const isUncertain = prediction.confidence < 0.7;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`rounded-2xl p-5 border transition-colors duration-500 ${
        isUncertain ? 'bg-red-950/10 border-red-900/30' : 'bg-transparent border-transparent'
      }`}
    >
      {/* Dish icon */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`shrink-0 rounded-xl p-3 border ${
          isUncertain 
            ? 'bg-gradient-to-br from-red-500/20 to-orange-600/10 border-red-500/10'
            : 'bg-gradient-to-br from-amber-500/20 to-orange-600/10 border-amber-500/10'
        }`}>
          <Utensils className={`h-6 w-6 ${isUncertain ? 'text-red-400' : 'text-amber-400'}`} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold text-white/95 font-[family-name:var(--font-playfair)] mb-1">
            {prediction.name}
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs rounded-full px-3 py-1 font-medium ${
              isUncertain ? 'bg-red-500/15 text-red-400' : 'bg-amber-500/15 text-amber-400'
            }`}>
              {prediction.cuisine}
            </span>
            <span className="text-xs text-white/40 font-[family-name:var(--font-mono)]">
              {formatConfidence(prediction.confidence)} confidence
            </span>
            {isUncertain && (
              <span className="text-xs rounded-full bg-red-900/30 text-red-300 px-3 py-1 font-medium border border-red-500/20">
                Uncertain Prediction
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Confidence visual */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-white/40">AI Confidence</span>
          <motion.span
            className={`text-sm font-bold font-[family-name:var(--font-mono)] ${
              isUncertain ? 'text-red-400' : 'text-amber-400'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {confidencePercent}%
          </motion.span>
        </div>
        <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${
              isUncertain ? 'from-red-500 to-red-400' : 'from-amber-500 to-orange-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${confidencePercent}%` }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.3 }}
          />
        </div>
      </div>

      {/* Description */}
      {prediction.description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-white/60 leading-relaxed mb-4"
        >
          {prediction.description}
        </motion.p>
      )}

      {/* Reasoning (Chain of Thought) */}
      {prediction.reasoning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-4 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]"
        >
          <p className="text-xs text-white/40 font-semibold mb-1 uppercase tracking-wider">AI Reasoning</p>
          <p className="text-sm text-white/50 italic">{prediction.reasoning}</p>
        </motion.div>
      )}

      {/* Alternatives */}
      {prediction.alternatives && prediction.alternatives.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-xs text-white/40 font-semibold mb-2 uppercase tracking-wider">Might Also Be</p>
          <div className="flex flex-wrap gap-2">
            {prediction.alternatives.map((alt, idx) => (
              <span key={idx} className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/60 hover:bg-white/[0.05] transition-colors cursor-default">
                {alt}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
