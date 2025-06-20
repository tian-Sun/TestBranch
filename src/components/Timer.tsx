import React from 'react';
import { Play, Square } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';

interface TimerProps {
  onComplete: (duration: number) => void;
}

export const Timer: React.FC<TimerProps> = ({ onComplete }) => {
  const { seconds, isRunning, start, stop, reset, formatTime } = useTimer();

  const handleStart = () => {
    if (seconds === 0) {
      reset();
    }
    start();
  };

  const handleStop = () => {
    stop();
    if (seconds > 0) {
      onComplete(seconds);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md mx-auto">
      <div className="mb-8">
        <div className="text-6xl font-mono font-bold text-gray-800 mb-2">
          {formatTime()}
        </div>
        <p className="text-gray-600">
          {isRunning ? '正在专注中...' : '准备开始新任务'}
        </p>
      </div>

      <div className="flex gap-4 justify-center">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-green-300/30"
          >
            <Play className="w-5 h-5" fill="currentColor" />
            开始任务
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-red-300/30"
          >
            <Square className="w-5 h-5" fill="currentColor" />
            完成任务
          </button>
        )}
      </div>
      
      {seconds > 0 && !isRunning && (
        <button
          onClick={reset}
          className="mt-4 text-gray-500 hover:text-gray-700 font-medium transition-colors"
        >
          重置计时器
        </button>
      )}
    </div>
  );
};