'use client';

import { motion } from 'framer-motion';
import { Upload, ImagePlus } from 'lucide-react';

interface DropZoneProps {
  getRootProps: () => Record<string, unknown>;
  getInputProps: () => Record<string, unknown>;
  isDragActive: boolean;
}

export default function DropZone({ getRootProps, getInputProps, isDragActive }: DropZoneProps) {
  return (
    <div {...(getRootProps() as React.HTMLAttributes<HTMLDivElement>)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          relative cursor-pointer rounded-2xl border-2 border-dashed p-12
          transition-all duration-300 ease-out
          flex flex-col items-center justify-center min-h-[320px]
          backdrop-blur-xl bg-white/[0.03]
          ${isDragActive
            ? 'border-amber-400 bg-amber-500/[0.08] shadow-[0_0_40px_rgba(245,158,11,0.15)]'
            : 'border-white/10 hover:border-amber-500/40 hover:bg-white/[0.05]'
          }
        `}
      >
        <input {...(getInputProps() as React.InputHTMLAttributes<HTMLInputElement>)} />

        {/* Glow ring on drag */}
        {isDragActive && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.08) 0%, transparent 70%)',
            }}
          />
        )}

        {/* Icon */}
        <motion.div
          animate={isDragActive ? { scale: 1.15, y: -8 } : { scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`
            mb-6 rounded-2xl p-5
            ${isDragActive
              ? 'bg-amber-500/20 text-amber-400'
              : 'bg-white/[0.06] text-white/40'
            }
          `}
        >
          {isDragActive ? (
            <ImagePlus className="h-10 w-10" />
          ) : (
            <Upload className="h-10 w-10" />
          )}
        </motion.div>

        {/* Text */}
        <motion.p
          className="text-lg font-medium text-white/80 mb-2 text-center font-[family-name:var(--font-playfair)]"
          animate={isDragActive ? { scale: 1.02 } : { scale: 1 }}
        >
          {isDragActive ? 'Drop your image here…' : 'Drag & drop your food image here'}
        </motion.p>

        <p className="text-sm text-white/40">
          or <span className="text-amber-400/80 underline underline-offset-2">click to browse</span>
        </p>

        <p className="mt-4 text-xs text-white/25">
          JPG, PNG, WebP · Max 10 MB
        </p>

        {/* Decorative corner accents */}
        <div className="absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-amber-500/20 rounded-tl-md" />
        <div className="absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-amber-500/20 rounded-tr-md" />
        <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-amber-500/20 rounded-bl-md" />
        <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-amber-500/20 rounded-br-md" />
      </motion.div>
    </div>
  );
}

