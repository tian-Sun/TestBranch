import React from 'react';
import { Task } from '../types';
import { TreasureBox } from './TreasureBox';

interface TreasureGridProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export const TreasureGrid: React.FC<TreasureGridProps> = ({ tasks, onTaskClick }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏔️</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Your treasure mountain is empty</h3>
        <p className="text-gray-500">Complete your first task to get your first treasure!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {tasks.map((task) => (
        <TreasureBox
          key={task.id}
          task={task}
          onClick={() => onTaskClick(task)}
        />
      ))}
    </div>
  );
};