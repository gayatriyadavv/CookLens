'use client';

import { motion } from 'framer-motion';
import type { SpiceRecommendation } from '@/types';

interface SpiceRecommendProps {
  spices: SpiceRecommendation[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};

export default function SpiceRecommend({ spices }: SpiceRecommendProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
        Spice Recommendations
      </h3>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {spices.map((spice) => (
          <motion.div
            key={spice.name}
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-4 hover:border-amber-500/15 hover:bg-white/[0.05] transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">{spice.emoji}</span>
              <h4 className="text-sm font-semibold text-white/85">{spice.name}</h4>
            </div>
            <p className="text-xs text-white/45 leading-relaxed">{spice.reason}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
