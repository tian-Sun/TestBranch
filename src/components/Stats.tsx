import React from 'react';
import { Trophy, Clock, Star, Target } from 'lucide-react';
import { formatDuration } from '../utils/treasureUtils';

interface StatsProps {
  totalTasks: number;
  totalTime: number;
  averageScore: number;
  totalTreasureValue: number;
}

export const Stats: React.FC<StatsProps> = ({
  totalTasks,
  totalTime,
  averageScore,
  totalTreasureValue
}) => {
  const stats = [
    {
      icon: Target,
      label: 'Tasks Completed',
      value: totalTasks,
      suffix: '',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Clock,
      label: 'Focus Time',
      value: formatDuration(totalTime),
      suffix: '',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Star,
      label: 'Avg Rating',
      value: averageScore.toFixed(1),
      suffix: '',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Trophy,
      label: 'Treasure Value',
      value: totalTreasureValue.toFixed(1),
      suffix: '',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className={`${stat.bgColor} rounded-xl p-4 text-center`}>
          <div className={`inline-flex items-center justify-center w-10 h-10 ${stat.color} bg-white rounded-lg mb-2`}>
            <stat.icon className="w-5 h-5" />
          </div>
          <div className={`text-xl font-bold ${stat.color}`}>
            {stat.value}{stat.suffix}
          </div>
          <div className="text-sm text-gray-600 font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};