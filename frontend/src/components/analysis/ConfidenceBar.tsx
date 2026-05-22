'use client';

import { motion } from 'framer-motion';
import { formatConfidence } from '@/lib/utils';

interface ConfidenceBarProps {
  value: number;
  label?: string;
  color?: string;
}

export default function ConfidenceBar({
  value,
  label,
  color = 'from-amber-500 to-orange-500',
}: ConfidenceBarProps) {
  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-white/50">{label}</span>
          <span className="text-xs text-white/40 font-[family-name:var(--font-mono)]">
            {formatConfidence(value)}
          </span>
        </div>
      )}
      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.round(value * 100)}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 }}
        />
      </div>
    </div>
  );
}
