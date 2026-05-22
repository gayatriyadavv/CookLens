'use client';

import { motion } from 'framer-motion';
import { Clock, RotateCcw } from 'lucide-react';

interface UploadCardProps {
  dishName: string;
  cuisine: string;
  timestamp: string;
  onClick?: () => void;
}

export default function UploadCard({ dishName, cuisine, timestamp, onClick }: UploadCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group relative w-full rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-4 text-left transition-colors hover:border-amber-500/20 hover:bg-white/[0.06]"
    >
      {/* Thumbnail placeholder — CSS gradient */}
      <div className="mb-3 aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-red-900/30 flex items-center justify-center">
        <span className="text-3xl opacity-60">🍽️</span>
      </div>

      <h4 className="text-sm font-semibold text-white/85 truncate mb-1 font-[family-name:var(--font-playfair)]">
        {dishName}
      </h4>

      <div className="flex items-center justify-between">
        <span className="text-xs text-amber-400/60">{cuisine}</span>
        <div className="flex items-center gap-1 text-xs text-white/30">
          <Clock className="h-3 w-3" />
          {timestamp}
        </div>
      </div>

      {/* Re-analyze hover icon */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="rounded-full bg-amber-500/20 p-1.5">
          <RotateCcw className="h-3 w-3 text-amber-400" />
        </div>
      </div>
    </motion.button>
  );
}
