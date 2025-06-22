import { TreasureLevel } from '../types';

export const treasureLevels: TreasureLevel[] = [
  {
    name: 'Bronze',
    minValue: 0,
    maxValue: 5,
    color: 'text-amber-900',
    bgGradient: 'from-yellow-400 via-amber-500 to-yellow-600',
    shadow: 'shadow-amber-400/50',
    glow: 'hover:shadow-amber-300/60'
  },
  {
    name: 'Silver',
    minValue: 5,
    maxValue: 15,
    color: 'text-slate-800',
    bgGradient: 'from-slate-300 via-slate-400 to-slate-500',
    shadow: 'shadow-slate-300/50',
    glow: 'hover:shadow-slate-400/60'
  },
  {
    name: 'Gold',
    minValue: 15,
    maxValue: 30,
    color: 'text-yellow-900',
    bgGradient: 'from-yellow-300 via-amber-400 to-yellow-500',
    shadow: 'shadow-yellow-300/50',
    glow: 'hover:shadow-yellow-400/60'
  },
  {
    name: 'Diamond',
    minValue: 30,
    maxValue: Infinity,
    color: 'text-sky-900',
    bgGradient: 'from-cyan-300 via-sky-400 to-blue-500',
    shadow: 'shadow-cyan-300/50',
    glow: 'hover:shadow-cyan-400/60'
  }
];

export const getTreasureLevel = (value: number): TreasureLevel => {
  return treasureLevels.find(level => 
    value >= level.minValue && value < level.maxValue
  ) || treasureLevels[0];
};

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};