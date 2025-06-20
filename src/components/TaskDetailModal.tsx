import React from 'react';
import { Task } from '../types';
import { getTreasureLevel, formatDuration } from '../utils/treasureUtils';
import { X, Clock, Star, Calendar, Trash2 } from 'lucide-react';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onDelete?: (taskId: string) => void;
  onContinue: (task: Task) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  isOpen,
  onClose,
  task,
  onDelete,
  onContinue
}) => {
  if (!isOpen || !task) return null;

  const treasureLevel = getTreasureLevel(task.treasureValue);

  const handleDelete = () => {
    if (onDelete && window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      onDelete(task.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Task Details</h2>
          <div className="flex items-center gap-2">
            {onDelete && (
              <button
                onClick={handleDelete}
                className="text-red-400 hover:text-red-600 transition-colors"
                title="Delete Task"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Treasure showcase */}
        <div className={`
          bg-gradient-to-br ${treasureLevel.bgGradient} 
          rounded-xl p-6 mb-6 text-center relative overflow-hidden
        `}>
          <div className="relative z-10">
            <div className="text-3xl font-bold text-white drop-shadow-lg mb-2">
              {task.treasureValue}
            </div>
            <div className={`
              inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full 
              text-white font-medium text-sm
            `}>
              {treasureLevel.name} Treasure
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 left-4 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute top-8 right-6 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute bottom-4 left-8 w-1.5 h-1.5 bg-white rounded-full"></div>
            <div className="absolute bottom-8 right-4 w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Task details */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Task Description</h3>
            <p className="text-gray-800 bg-gray-50 rounded-lg p-3">
              {task.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">Total Time Spent</span>
              </div>
              <div className="text-lg font-semibold text-gray-800">
                {formatDuration(task.duration)}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Star className="w-4 h-4" />
                <span className="text-xs font-medium">Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-semibold text-gray-800">{task.score}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < task.score ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill={i < task.score ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <h3 className="flex items-center gap-2 text-gray-600 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-medium">Time Entries ({task.timeEntries.length})</span>
            </h3>
            <div className="space-y-2 max-h-24 overflow-y-auto pr-2">
              {task.timeEntries.map((entry, index) => (
                <div key={index} className="flex justify-between items-center text-xs text-gray-700">
                  <span>
                    {entry.startTime.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <span className="font-semibold">{formatDuration(entry.duration)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200"
          >
            Close
          </button>
          <button
            onClick={() => onContinue(task)}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
          >
            Continue Task
          </button>
        </div>
      </div>
    </div>
  );
};