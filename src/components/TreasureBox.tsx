import React from 'react';
import { Task, Category } from '../types';
import { getTreasureLevel, formatDuration } from '../utils/treasureUtils';
import { Star, Clock } from 'lucide-react';
import { colorSchemeStyles } from '../utils/colorUtils';
import { cn } from '../utils/cn';

interface TreasureBoxProps {
  task: Task;
  category: Category | null;
  onClick: () => void;
}

export const TreasureBox: React.FC<TreasureBoxProps> = ({ task, category, onClick }) => {
  const treasureLevel = getTreasureLevel(task.treasureValue);
  const color = category ? colorSchemeStyles[category.colorScheme] : colorSchemeStyles.gray;

  return (
    <div
      onClick={onClick}
      className={cn(`
        relative rounded-xl p-4 cursor-pointer transition-all duration-300 
        hover:scale-105 hover:shadow-2xl transform hover:-translate-y-1 shadow-lg
        group`,
        color.bg,
        color.shadow
      )}
    >
      {/* Treasure level badge */}
      <div className={cn(`
        absolute -top-2 -right-2 px-2 py-1 bg-white rounded-full 
        text-xs font-bold shadow-md group-hover:scale-110 transition-transform`,
        color.text
      )}>
        {treasureLevel.name}
      </div>

      {/* Treasure value */}
      <div className="text-center mb-3">
        <div className={cn("text-2xl font-bold drop-shadow-lg", color.text)}>
          {task.treasureValue}
        </div>
        <div className={cn("text-sm font-medium", color.text, "opacity-80")}>
          Treasure Value
        </div>
      </div>

      {/* Task info */}
      <div className={cn("bg-white/20 backdrop-blur-sm rounded-lg p-3", color.text)}>
        <p className="text-sm font-medium truncate mb-2">
          {task.categoryName}
        </p>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(task.duration)}
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3" fill="currentColor" />
            {task.score}
          </div>
        </div>
      </div>

      {/* Sparkle effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className={cn("absolute top-2 left-2 w-1 h-1 rounded-full animate-ping", color.bg === 'bg-gray-100' ? 'bg-gray-400' : 'bg-white')}></div>
        <div className={cn("absolute top-4 right-6 w-1 h-1 rounded-full animate-ping animation-delay-100", color.bg === 'bg-gray-100' ? 'bg-gray-400' : 'bg-white')}></div>
        <div className={cn("absolute bottom-6 left-6 w-1 h-1 rounded-full animate-ping animation-delay-200", color.bg === 'bg-gray-100' ? 'bg-gray-400' : 'bg-white')}></div>
      </div>
    </div>
  );
};