'use client'

import React, { useState } from 'react';
import { Timer } from '../components/Timer';
import { TreasureGrid } from '../components/TreasureGrid';
import { TaskDetailModal } from '../components/TaskDetailModal';
import { Stats } from '../components/Stats';
import { SettingsModal } from '../components/SettingsModal';
import { useTasks } from '../hooks/useTasks';
import { Task } from '../types';
import { Mountain, Settings, AlertCircle, LifeBuoy } from 'lucide-react';
import { CategoryModal } from '../components/task-category/CategoryModal';
import { useCategories, Category } from '../hooks/useCategories';

export default function HomePage() {
  const { tasks, addTask, deleteTask, logTimeToTask, getStats, isLoading, error, updateTaskDescription, updateTaskScore } = useTasks();
  const { categories, refetchCategories } = useCategories();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeTaskForTimer, setActiveTaskForTimer] = useState<Task | null>(null);
  const [newTaskModal, setNewTaskModal] = useState(false);

  const stats = getStats();

  const handleTimerComplete = (duration: number, categoryId?: string) => {
    if (activeTaskForTimer) {
      logTimeToTask(activeTaskForTimer.id, duration);
      setActiveTaskForTimer(null);
    } else if (categoryId) {
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        // Create task without score, let user set it in modal
        const newTask = addTask(category, duration, 0); // Set score to 0 initially
        setSelectedTask(newTask);
        setNewTaskModal(true);
      }
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowDetailModal(true);
  };

  const handleContinueTask = (task: Task) => {
    setActiveTaskForTimer(task);
    setShowDetailModal(false);
  };
  
  const handleTaskDelete = (taskId: string) => {
    deleteTask(taskId);
    setShowDetailModal(false);
  };
  
  const handleDescriptionUpdate = (taskId: string, description: string) => {
    updateTaskDescription(taskId, description);
    if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask({...selectedTask, description});
    }
  }

  const handleScoreUpdate = (taskId: string, score: number) => {
    updateTaskScore(taskId, score);
    if (selectedTask && selectedTask.id === taskId) {
        const treasureValue = Math.round((selectedTask.duration / 60 * score) / 10 * 10) / 10;
        setSelectedTask({...selectedTask, score, treasureValue});
    }
  }

  const handleDataChange = () => {
    window.location.reload();
  };

  const handleNewTaskFinish = () => {
    setNewTaskModal(false);
    setSelectedTask(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your treasure mountain...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mountain className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Life is a Game
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Gamify your life, every task is a step towards the treasure mountain
          </p>
          
          <div className="absolute top-0 right-0 flex items-center gap-2">
            <button
              onClick={() => setShowCategoryModal(true)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Manage Categories"
            >
              <LifeBuoy className="w-6 h-6" />
            </button>

            <button
              onClick={() => setShowSettingsModal(true)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Settings"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Timer Section */}
        <div className="mb-12">
          <Timer
            key={activeTaskForTimer?.id || 'new-task'}
            onComplete={handleTimerComplete}
            taskToContinue={activeTaskForTimer}
            categories={categories}
            refetchCategories={refetchCategories}
          />
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
            <h2 className="text-2xl font-bold text-gray-800">My Treasure Mountain</h2>
            {tasks.length > 0 && (
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {tasks.length} treasures
              </span>
            )}
          </div>
          
          <TreasureGrid 
            tasks={tasks}
            categories={categories}
            onTaskClick={handleTaskClick} 
          />
        </div>
      </div>

      {/* Modals */}
      <TaskDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        task={selectedTask}
        onDelete={handleTaskDelete}
        onContinue={handleContinueTask}
        onDescriptionUpdate={handleDescriptionUpdate}
        onScoreUpdate={handleScoreUpdate}
        mode="view"
      />

      {/* 新建任务弹窗 */}
      <TaskDetailModal
        isOpen={newTaskModal}
        onClose={handleNewTaskFinish}
        task={selectedTask}
        onDelete={undefined}
        onContinue={handleNewTaskFinish}
        onDescriptionUpdate={handleDescriptionUpdate}
        onScoreUpdate={handleScoreUpdate}
        mode="new"
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        onDataChange={handleDataChange}
      />

      <CategoryModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
      />
    </div>
  );
} 