'use client';

import { motion } from 'framer-motion';
import type { CookingStage as CookingStageType } from '@/types';
import { stageToLabel, stageToBgColor } from '@/lib/utils';

interface CookingStageProps {
  stage: CookingStageType;
}

const stages: CookingStageType[] = ['raw', 'preparation', 'cooking', 'almost_done', 'done'];

export default function CookingStage({ stage }: CookingStageProps) {
  const currentIndex = stages.indexOf(stage === 'overcooked' ? 'done' : stage);

  return (
    <div>
      <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-5">
        Cooking Progress
      </h3>

      {/* Progress bar */}
      <div className="relative">
        {/* Background line */}
        <div className="absolute top-3 left-4 right-4 h-0.5 bg-white/[0.06] rounded-full" />

        {/* Active line */}
        <motion.div
          className={`absolute top-3 left-4 h-0.5 rounded-full ${stageToBgColor(stage)}`}
          initial={{ width: 0 }}
          animate={{
            width: `${(currentIndex / (stages.length - 1)) * 100}%`,
          }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{ maxWidth: 'calc(100% - 2rem)' }}
        />

        {/* Stage dots */}
        <div className="relative flex justify-between">
          {stages.map((s, i) => {
            const isActive = i <= currentIndex;
            const isCurrent = i === currentIndex;

            return (
              <div key={s} className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 400, damping: 20 }}
                  className="relative"
                >
                  {/* Glow ring for current */}
                  {isCurrent && (
                    <motion.div
                      className={`absolute -inset-2 rounded-full ${stageToBgColor(stage)} opacity-20`}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.05, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  <div
                    className={`
                      relative z-10 h-6 w-6 rounded-full border-2 flex items-center justify-center
                      transition-colors duration-300
                      ${isCurrent
                        ? `${stageToBgColor(stage)} border-transparent shadow-lg`
                        : isActive
                          ? `${stageToBgColor(stage)} border-transparent opacity-60`
                          : 'bg-white/[0.05] border-white/10'
                      }
                    `}
                  >
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-2 w-2 rounded-full bg-white"
                      />
                    )}
                  </div>
                </motion.div>

                <span
                  className={`
                    mt-3 text-xs text-center leading-tight
                    ${isCurrent ? 'text-white/90 font-semibold' : isActive ? 'text-white/50' : 'text-white/25'}
                  `}
                >
                  {stageToLabel(s)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current stage label */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center"
      >
        <span className={`inline-flex items-center gap-2 text-sm font-medium ${stageToBgColor(stage).replace('bg-', 'text-').replace('-500', '-400')}`}>
          <span className="relative flex h-2 w-2">
            <span className={`absolute inline-flex h-full w-full rounded-full ${stageToBgColor(stage)} opacity-75 animate-ping`} />
            <span className={`relative inline-flex h-2 w-2 rounded-full ${stageToBgColor(stage)}`} />
          </span>
          {stageToLabel(stage)}
          {stage === 'overcooked' && ' ⚠️'}
        </span>
      </motion.div>
    </div>
  );
}
