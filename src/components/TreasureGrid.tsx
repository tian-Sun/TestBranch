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
        <h3 className="text-xl font-semibold text-gray-700 mb-2">你的宝藏山还是空的</h3>
        <p className="text-gray-500">完成第一个任务来获得你的第一个宝藏吧！</p>
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