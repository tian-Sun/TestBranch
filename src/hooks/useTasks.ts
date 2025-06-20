import { useState, useEffect } from 'react';
import { Task } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('life-game-tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          completedAt: new Date(task.completedAt)
        }));
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('life-game-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (description: string, duration: number, score: number) => {
    const treasureValue = Math.round((duration / 60 * score) / 10 * 10) / 10;
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      description,
      duration,
      score,
      completedAt: new Date(),
      treasureValue
    };

    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const getStats = () => {
    const totalTasks = tasks.length;
    const totalTime = tasks.reduce((sum, task) => sum + task.duration, 0);
    const averageScore = totalTasks > 0 
      ? tasks.reduce((sum, task) => sum + task.score, 0) / totalTasks 
      : 0;
    const totalTreasureValue = tasks.reduce((sum, task) => sum + task.treasureValue, 0);

    return {
      totalTasks,
      totalTime,
      averageScore: Math.round(averageScore * 10) / 10,
      totalTreasureValue: Math.round(totalTreasureValue * 10) / 10
    };
  };

  return {
    tasks,
    addTask,
    getStats
  };
};