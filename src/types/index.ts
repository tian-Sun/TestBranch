import { ColorScheme } from "../utils/colorUtils";

export interface TimeEntry {
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
}

export interface Category {
  id: string;
  name: string;
  colorScheme: ColorScheme;
}

export interface Task {
  id: string;
  description?: string;
  duration: number; // total duration in seconds
  score: number;
  completedAt: Date; // Last time this task was worked on
  treasureValue: number;
  timeEntries: TimeEntry[];
  categoryId: string;
  categoryName: string;
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