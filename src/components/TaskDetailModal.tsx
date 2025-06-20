import React from 'react';
import { Task } from '../types';
import { getTreasureLevel, formatDuration } from '../utils/treasureUtils';
import { X, Clock, Star, Calendar, Trophy } from 'lucide-react';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  isOpen,
  onClose,
  task
}) => {
  if (!isOpen || !task) return null;

  const treasureLevel = getTreasureLevel(task.treasureValue);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">任务详情</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
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
              {treasureLevel.name} 宝藏
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
            <h3 className="text-sm font-medium text-gray-500 mb-1">任务描述</h3>
            <p className="text-gray-800 bg-gray-50 rounded-lg p-3">
              {task.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">用时</span>
              </div>
              <div className="text-lg font-semibold text-gray-800">
                {formatDuration(task.duration)}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Star className="w-4 h-4" />
                <span className="text-xs font-medium">评分</span>
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
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-medium">完成时间</span>
            </div>
            <div className="text-sm text-gray-800">
              {task.completedAt.toLocaleString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
        >
          关闭
        </button>
      </div>
    </div>
  );
};