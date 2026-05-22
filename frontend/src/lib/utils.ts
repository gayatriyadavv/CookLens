import type { CookingStage } from '@/types';

/**
 * Merge class names, filtering out falsy values.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format a 0-1 confidence number as a percentage string.
 */
export function formatConfidence(n: number): string {
  return `${Math.round(n * 100)}%`;
}

/**
 * Map cooking stage to a Tailwind text color class.
 */
export function stageToColor(stage: CookingStage): string {
  const map: Record<CookingStage, string> = {
    raw: 'text-blue-400',
    chopped: 'text-teal-400',
    preparation: 'text-violet-400',
    sautéing: 'text-yellow-400',
    simmering: 'text-amber-500',
    frying: 'text-orange-500',
    boiling: 'text-sky-400',
    gravy_thickening: 'text-amber-600',
    oil_separating: 'text-red-500',
    cooking: 'text-amber-400',
    almost_done: 'text-orange-400',
    done: 'text-emerald-400',
    plated: 'text-fuchsia-400',
    overcooked: 'text-red-600',
  };
  return map[stage] ?? 'text-gray-400';
}

/**
 * Map cooking stage to a Tailwind background color class.
 */
export function stageToBgColor(stage: CookingStage): string {
  const map: Record<CookingStage, string> = {
    raw: 'bg-blue-500',
    chopped: 'bg-teal-500',
    preparation: 'bg-violet-500',
    sautéing: 'bg-yellow-500',
    simmering: 'bg-amber-600',
    frying: 'bg-orange-600',
    boiling: 'bg-sky-500',
    gravy_thickening: 'bg-amber-700',
    oil_separating: 'bg-red-600',
    cooking: 'bg-amber-500',
    almost_done: 'bg-orange-500',
    done: 'bg-emerald-500',
    plated: 'bg-fuchsia-500',
    overcooked: 'bg-red-700',
  };
  return map[stage] ?? 'bg-gray-500';
}

/**
 * Map cooking stage to a human-readable label.
 */
export function stageToLabel(stage: CookingStage): string {
  const map: Record<CookingStage, string> = {
    raw: 'Raw',
    chopped: 'Chopped',
    preparation: 'Preparation',
    sautéing: 'Sautéing',
    simmering: 'Simmering',
    frying: 'Frying',
    boiling: 'Boiling',
    gravy_thickening: 'Gravy Thickening',
    oil_separating: 'Oil Separating',
    cooking: 'Cooking',
    almost_done: 'Almost Done',
    done: 'Done',
    plated: 'Plated',
    overcooked: 'Overcooked',
  };
  return map[stage] ?? 'Unknown';
}

/**
 * Return a human-readable relative time string from an ISO date.
 */
export function getTimeAgo(date: string): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months !== 1 ? 's' : ''} ago`;
}

/**
 * Format file size in human-readable form.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
