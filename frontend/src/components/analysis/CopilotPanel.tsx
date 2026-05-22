'use client';

import { motion } from 'framer-motion';
import { Bot, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';
import type { CopilotSuggestion } from '@/types';

interface CopilotPanelProps {
  copilot: CopilotSuggestion;
}

export default function CopilotPanel({ copilot }: CopilotPanelProps) {
  const circumference = 2 * Math.PI * 38;
  const dashOffset = circumference - (copilot.readiness_percent / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-500/[0.06] to-indigo-500/[0.03] backdrop-blur-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="rounded-xl bg-violet-500/15 p-2.5">
          <Bot className="h-5 w-5 text-violet-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white/85 font-[family-name:var(--font-playfair)]">
            Cooking Copilot
          </h3>
          <p className="text-xs text-violet-400/60">AI-powered guidance</p>
        </div>

        {/* Readiness circle */}
        <div className="ml-auto relative">
          <svg width="56" height="56" className="-rotate-90">
            <circle
              cx="28" cy="28" r="38"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="3"
              className="scale-[0.71] origin-center"
            />
            <motion.circle
              cx="28" cy="28" r="38"
              fill="none"
              stroke="url(#copilotGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="scale-[0.71] origin-center"
            />
            <defs>
              <linearGradient id="copilotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-violet-400 font-[family-name:var(--font-mono)]">
              {copilot.readiness_percent}%
            </span>
          </div>
        </div>
      </div>

      {/* Readiness label */}
      <div className="mb-4 rounded-lg bg-white/[0.03] border border-white/[0.04] px-3 py-2">
        <p className="text-xs text-white/40 mb-0.5">Readiness</p>
        <p className="text-sm text-white/75 font-medium">{copilot.readiness_label}</p>
      </div>

      {/* Next step */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <ArrowRight className="h-3.5 w-3.5 text-violet-400" />
          <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Next Step</span>
        </div>
        <p className="text-sm text-white/70 leading-relaxed pl-5">
          {copilot.next_step}
        </p>
      </div>

      {/* Mistakes */}
      {copilot.mistakes_detected.length > 0 && (
        <div className="mb-4 space-y-2">
          {copilot.mistakes_detected.map((mistake, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 rounded-lg bg-red-500/[0.06] border border-red-500/10 px-3 py-2.5"
            >
              <AlertTriangle className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-red-300/80 leading-relaxed">{mistake}</p>
            </div>
          ))}
        </div>
      )}

      {/* Fixes */}
      {copilot.fixes.length > 0 && (
        <div className="space-y-2">
          {copilot.fixes.map((fix, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 rounded-lg bg-emerald-500/[0.06] border border-emerald-500/10 px-3 py-2.5"
            >
              <Lightbulb className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-300/80 leading-relaxed">{fix}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
