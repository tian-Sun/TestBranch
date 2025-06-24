import React, { useState, useEffect } from 'react';
import { Play, Square } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';
import { Category } from '../types';
import { Task } from '../types';

interface TimerProps {
  onComplete: (duration: number, categoryId?: string) => void;
  taskToContinue: Task | null;
  categories: Category[];
  refetchCategories?: () => void;
}

export const Timer: React.FC<TimerProps> = ({ onComplete, taskToContinue, categories, refetchCategories }) => {
  const { seconds, isRunning, start, stop, reset, formatTime } = useTimer();
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const isNewTask = !taskToContinue;
  const canStart = isNewTask ? !!selectedCategoryId : !!taskToContinue;

  useEffect(() => {
    // When a task is continued, its timer state is not managed here,
    // but we can reset internal state if the continued task changes.
    if (taskToContinue) {
      setSelectedCategoryId('');
      if (!isRunning) {
        start();
      }
    }
  }, [taskToContinue]);

  const handleStart = () => {
    start();
  };

  const handleStop = () => {
    stop();
    if (seconds > 0) {
      onComplete(seconds, isNewTask ? selectedCategoryId : undefined);
    }
    reset();
    setSelectedCategoryId('');
  };
  
  const renderContent = () => {
    if (isRunning) {
        return <p className="text-gray-600 h-10 flex items-center justify-center">{taskToContinue?.categoryName || 'Focusing...'}</p>;
    }

    if (taskToContinue) {
        return <p className="text-gray-600 h-10 flex items-center justify-center">Ready to continue: &ldquo;{taskToContinue.categoryName}&rdquo;</p>
    }

    return (
        <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            onFocus={refetchCategories}
            className="block w-full text-center p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10 bg-gray-50"
        >
            <option value="" disabled>-- Select a category --</option>
            {categories.filter(c => c.name).map(category => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
      </select>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md mx-auto">
      <div className="mb-8">
        <div className="text-6xl font-mono font-bold text-gray-800 mb-2">
          {formatTime()}
        </div>
        {renderContent()}
      </div>

      <div className="flex gap-4 justify-center">
        {!isRunning ? (
          <button
            onClick={handleStart}
            disabled={!canStart}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            <Play className="w-5 h-5" fill="currentColor" />
            {isNewTask ? 'Start Task' : 'Continue Task'}
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Square className="w-5 h-5" fill="currentColor" />
            Complete Task
          </button>
        )}
      </div>
    </div>
  );
};