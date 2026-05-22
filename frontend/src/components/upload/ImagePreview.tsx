'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { X, FileImage } from 'lucide-react';
import { formatFileSize } from '@/lib/utils';

interface ImagePreviewProps {
  file: File;
  preview: string;
  onRemove: () => void;
}

export default function ImagePreview({ file, preview, onRemove }: ImagePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={preview}
          alt={file.name}
          fill
          className="object-cover"
          unoptimized
        />

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Info overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 backdrop-blur-md bg-black/30 border-t border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="shrink-0 rounded-lg bg-amber-500/15 p-2">
              <FileImage className="h-4 w-4 text-amber-400" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white/90 truncate">
                {file.name}
              </p>
              <p className="text-xs text-white/40">
                {formatFileSize(file.size)} · {file.type.split('/')[1]?.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Remove button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onRemove}
            className="shrink-0 rounded-full p-2 bg-white/10 hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-colors"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
