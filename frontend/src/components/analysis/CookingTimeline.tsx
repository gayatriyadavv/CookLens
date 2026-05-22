'use client';

import { motion } from 'framer-motion';
import { Timer, Thermometer } from 'lucide-react';
import type { CookingStep } from '@/types';

interface CookingTimelineProps {
  steps: CookingStep[];
  currentStep?: number;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function CookingTimeline({ steps, currentStep = 0 }: CookingTimelineProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
        Cooking Steps
      </h3>

      <div className="overflow-x-auto pb-4 -mx-2 px-2 scrollbar-thin">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex gap-4"
          style={{ minWidth: 'max-content' }}
        >
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isPast = index < currentStep;

            return (
              <motion.div
                key={step.step_number}
                variants={item}
                className={`
                  relative flex-shrink-0 w-56 rounded-xl border p-4
                  transition-all duration-300
                  ${isActive
                    ? 'border-amber-500/30 bg-amber-500/[0.08] shadow-[0_0_20px_rgba(245,158,11,0.08)]'
                    : isPast
                      ? 'border-emerald-500/10 bg-emerald-500/[0.03]'
                      : 'border-white/[0.06] bg-white/[0.02]'
                  }
                `}
              >
                {/* Step number */}
                <div
                  className={`
                    inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold mb-3
                    ${isActive
                      ? 'bg-amber-500 text-black'
                      : isPast
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-white/[0.08] text-white/40'
                    }
                  `}
                >
                  {isPast ? '✓' : step.step_number}
                </div>

                {/* Instruction */}
                <p className={`text-xs leading-relaxed mb-3 ${isActive ? 'text-white/85' : 'text-white/50'}`}>
                  {step.instruction}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 flex-wrap">
                  {step.duration && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-white/35">
                      <Timer className="h-3 w-3" />
                      {step.duration}
                    </span>
                  )}
                  {step.temperature && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-white/35">
                      <Thermometer className="h-3 w-3" />
                      {step.temperature}
                    </span>
                  )}
                </div>

                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div
                    className={`
                      absolute top-1/2 -right-4 w-4 h-px
                      ${isPast ? 'bg-emerald-500/30' : 'bg-white/[0.08]'}
                    `}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
