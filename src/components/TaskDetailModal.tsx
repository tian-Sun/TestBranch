import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { getTreasureLevel, formatDuration } from '../utils/treasureUtils';
import { X, Clock, Star, Calendar, Trash2 } from 'lucide-react';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onDelete?: (taskId: string) => void;
  onContinue: (task: Task) => void;
  onDescriptionUpdate: (taskId: string, description: string) => void;
  onScoreUpdate?: (taskId: string, score: number) => void;
  mode?: 'new' | 'view';
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  isOpen,
  onClose,
  task,
  onDelete,
  onContinue,
  onDescriptionUpdate,
  onScoreUpdate,
  mode = 'view',
}) => {
  const [description, setDescription] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (task) {
      setDescription(task.description || '');
      setScore(task.score || 0);
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const treasureLevel = getTreasureLevel(task.treasureValue);
  const canContinue = description.trim() && score > 0;

  const handleDelete = () => {
    if (onDelete && window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      onDelete(task.id);
      onClose();
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleDescriptionBlur = () => {
    if (task && description !== task.description) {
      onDescriptionUpdate(task.id, description);
    }
  };

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
    if (onScoreUpdate) {
      onScoreUpdate(task.id, newScore);
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
            <h3 className="text-sm font-medium text-gray-500 mb-1">Task Category</h3>
            <div className="text-gray-800 bg-gray-50 rounded-lg p-3 font-medium">
              {task.categoryName}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Task Description</h3>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              onBlur={handleDescriptionBlur}
              className="w-full text-gray-800 bg-gray-50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Add a description for your completed task..."
              rows={3}
            />
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
                <span className="text-lg font-semibold text-gray-800">{score}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleScoreChange(i + 1)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-3 h-3 ${
                          i < score ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill={i < score ? 'currentColor' : 'none'}
                      />
                    </button>
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
          {mode === 'view' && (
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200"
            >
              Close
            </button>
          )}
          {mode === 'view' && canContinue && (
            <button
              onClick={() => onContinue(task)}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
            >
              Continue Task
            </button>
          )}
          {mode === 'new' && (
            <button
              onClick={() => onContinue(task)}
              disabled={!canContinue}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              完成任务
            </button>
          )}
        </div>
      </div>
    </div>
  );
};