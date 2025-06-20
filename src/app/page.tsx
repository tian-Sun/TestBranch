'use client'

import React, { useState } from 'react';
import { Timer } from '../components/Timer';
import { TaskModal } from '../components/TaskModal';
import { TreasureGrid } from '../components/TreasureGrid';
import { TaskDetailModal } from '../components/TaskDetailModal';
import { Stats } from '../components/Stats';
import { useTasks } from '../hooks/useTasks';
import { Task } from '../types';
import { Mountain } from 'lucide-react';

export default function HomePage() {
  const { tasks, addTask, getStats } = useTasks();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [completedDuration, setCompletedDuration] = useState(0);

  const stats = getStats();

  const handleTimerComplete = (duration: number) => {
    setCompletedDuration(duration);
    setShowTaskModal(true);
  };

  const handleTaskSubmit = (description: string, score: number) => {
    addTask(description, completedDuration, score);
    setCompletedDuration(0);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mountain className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Life is a Game
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            将生活游戏化，每个任务都是通往宝藏山的一步
          </p>
        </div>

        {/* Timer Section */}
        <div className="mb-12">
          <Timer onComplete={handleTimerComplete} />
        </div>

        {/* Stats Section */}
        {tasks.length > 0 && (
          <Stats
            totalTasks={stats.totalTasks}
            totalTime={stats.totalTime}
            averageScore={stats.averageScore}
            totalTreasureValue={stats.totalTreasureValue}
          />
        )}

        {/* Treasure Mountain Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Mountain className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">我的宝藏山</h2>
            {tasks.length > 0 && (
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {tasks.length} 个宝藏
              </span>
            )}
          </div>
          
          <TreasureGrid tasks={tasks} onTaskClick={handleTaskClick} />
        </div>
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSubmit={handleTaskSubmit}
        duration={completedDuration}
      />

      <TaskDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        task={selectedTask}
      />
    </div>
  );
} 