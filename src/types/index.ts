export interface Task {
  id: string;
  description: string;
  duration: number; // in seconds
  score: number; // 0-5 stars
  completedAt: Date;
  treasureValue: number;
}

export interface TreasureLevel {
  name: string;
  minValue: number;
  maxValue: number;
  color: string;
  bgGradient: string;
  shadow: string;
  glow: string;
}