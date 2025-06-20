import React from 'react';
import { Task } from '../types';
import { getTreasureLevel, formatDuration } from '../utils/treasureUtils';
import { Star, Clock } from 'lucide-react';

interface TreasureBoxProps {
  task: Task;
  onClick: () => void;
}

export const TreasureBox: React.FC<TreasureBoxProps> = ({ task, onClick }) => {
  const treasureLevel = getTreasureLevel(task.treasureValue);

  return (
    <div
      onClick={onClick}
      className={`
        relative bg-gradient-to-br ${treasureLevel.bgGradient} 
        rounded-xl p-4 cursor-pointer transition-all duration-300 
        hover:scale-105 hover:shadow-2xl ${treasureLevel.glow}
        transform hover:-translate-y-1 shadow-lg ${treasureLevel.shadow}
        group
      `}
    >
      {/* Treasure level badge */}
      <div className={`
        absolute -top-2 -right-2 px-2 py-1 bg-white rounded-full 
        text-xs font-bold ${treasureLevel.color} shadow-md
        group-hover:scale-110 transition-transform
      `}>
        {treasureLevel.name}
      </div>

      {/* Treasure value */}
      <div className="text-center mb-3">
        <div className="text-2xl font-bold text-white drop-shadow-lg">
          {task.treasureValue}
        </div>
        <div className="text-sm text-white/80 font-medium">
          宝藏价值
        </div>
      </div>

      {/* Task info */}
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-white">
        <p className="text-sm font-medium truncate mb-2">
          {task.description}
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
        <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-4 right-6 w-1 h-1 bg-white rounded-full animate-ping animation-delay-100"></div>
        <div className="absolute bottom-6 left-6 w-1 h-1 bg-white rounded-full animate-ping animation-delay-200"></div>
      </div>
    </div>
  );
};