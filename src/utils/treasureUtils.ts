import { TreasureLevel } from '../types';

export const treasureLevels: TreasureLevel[] = [
  {
    name: 'Bronze',
    minValue: 0,
    maxValue: 5,
    color: 'text-amber-700',
    bgGradient: 'from-amber-300 to-amber-500',
    shadow: 'shadow-amber-200',
    glow: 'shadow-amber-400/50'
  },
  {
    name: 'Silver',
    minValue: 5,
    maxValue: 15,
    color: 'text-gray-700',
    bgGradient: 'from-gray-300 to-gray-500',
    shadow: 'shadow-gray-200',
    glow: 'shadow-gray-400/50'
  },
  {
    name: 'Gold',
    minValue: 15,
    maxValue: 30,
    color: 'text-yellow-800',
    bgGradient: 'from-yellow-300 to-yellow-500',
    shadow: 'shadow-yellow-200',
    glow: 'shadow-yellow-400/50'
  },
  {
    name: 'Diamond',
    minValue: 30,
    maxValue: Infinity,
    color: 'text-blue-800',
    bgGradient: 'from-blue-300 to-purple-500',
    shadow: 'shadow-blue-200',
    glow: 'shadow-blue-400/50'
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