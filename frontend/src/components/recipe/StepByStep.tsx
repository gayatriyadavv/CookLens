'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Volume2, VolumeX, Timer, Thermometer, Lightbulb } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';
import type { CookingStep } from '@/types';

interface StepByStepProps {
  steps: CookingStep[];
}

export default function StepByStep({ steps }: StepByStepProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const { speak, stop, isSpeaking, isSupported } = useSpeech();
  const [speakingStep, setSpeakingStep] = useState<number | null>(null);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepNumber)) {
        next.delete(stepNumber);
      } else {
        next.add(stepNumber);
      }
      return next;
    });
  };

  const handleSpeak = (step: CookingStep) => {
    if (isSpeaking && speakingStep === step.step_number) {
      stop();
      setSpeakingStep(null);
    } else {
      const text = `Step ${step.step_number}. ${step.instruction}${step.tip ? `. Tip: ${step.tip}` : ''}`;
      speak(text);
      setSpeakingStep(step.step_number);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
        Step-by-Step Instructions
      </h3>

      <div className="space-y-3">
        {steps.map((step) => {
          const isCompleted = completedSteps.has(step.step_number);
          const isCurrentlySpeaking = isSpeaking && speakingStep === step.step_number;

          return (
            <motion.div
              key={step.step_number}
              layout
              className={`
                rounded-xl border p-4 transition-all duration-300
                ${isCompleted
                  ? 'border-emerald-500/15 bg-emerald-500/[0.04]'
                  : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
                }
              `}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <button
                  onClick={() => toggleStep(step.step_number)}
                  className={`
                    shrink-0 mt-0.5 h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all
                    ${isCompleted
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-white/15 hover:border-amber-500/40'
                    }
                  `}
                >
                  <AnimatePresence>
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {!isCompleted && (
                    <span className="text-xs text-white/30 font-[family-name:var(--font-mono)]">
                      {step.step_number}
                    </span>
                  )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm leading-relaxed transition-colors ${
                      isCompleted ? 'text-white/35 line-through' : 'text-white/75'
                    }`}
                  >
                    {step.instruction}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    {step.duration && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-white/30">
                        <Timer className="h-3 w-3" />
                        {step.duration}
                      </span>
                    )}
                    {step.temperature && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-white/30">
                        <Thermometer className="h-3 w-3" />
                        {step.temperature}
                      </span>
                    )}
                  </div>

                  {/* Tip */}
                  {step.tip && (
                    <div className="mt-2 flex items-start gap-2 rounded-lg bg-amber-500/[0.06] border border-amber-500/10 px-3 py-2">
                      <Lightbulb className="h-3 w-3 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-amber-300/60 leading-relaxed">{step.tip}</p>
                    </div>
                  )}
                </div>

                {/* Voice button */}
                {isSupported && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSpeak(step)}
                    className={`
                      shrink-0 rounded-lg p-2 transition-colors
                      ${isCurrentlySpeaking
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-white/[0.04] text-white/25 hover:text-white/50 hover:bg-white/[0.08]'
                      }
                    `}
                    aria-label={isCurrentlySpeaking ? 'Stop reading' : 'Read aloud'}
                  >
                    {isCurrentlySpeaking ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
