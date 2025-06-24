import { useState, useEffect, useCallback } from 'react';
import { Task, TimeEntry, Category } from '../types';

const STORAGE_KEY = 'life-game-tasks';
const STORAGE_VERSION = '1.1';

interface StorageData {
  version: string;
  tasks: Task[];
  lastUpdated: string;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const loadTasks = () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (!savedData) {
          setTasks([]);
          return;
        }

        const parsedData: StorageData = JSON.parse(savedData);
        
        // Check if data version is compatible
        if (parsedData.version !== STORAGE_VERSION) {
          console.warn('Storage version mismatch, clearing old data');
          localStorage.removeItem(STORAGE_KEY);
          setTasks([]);
          return;
        }

        // Parse tasks and convert dates
        const parsedTasks = parsedData.tasks.map((task: any) => ({
          ...task,
          completedAt: new Date(task.completedAt),
          timeEntries: task.timeEntries?.map((entry: any) => ({
            ...entry,
            startTime: new Date(entry.startTime),
            endTime: new Date(entry.endTime),
          })) || [],
        }));

        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
        setError('Failed to load saved tasks');
        setTasks([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!isLoading) {
      try {
        const storageData: StorageData = {
          version: STORAGE_VERSION,
          tasks,
          lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
      } catch (error) {
        console.error('Error saving tasks:', error);
        setError('Failed to save tasks');
      }
    }
  }, [tasks, isLoading]);

  const addTask = useCallback((category: Category, duration: number, score: number) => {
    const treasureValue = Math.round((duration / 60 * score) / 10 * 10) / 10;
    const now = new Date();
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      categoryId: category.id,
      categoryName: category.name,
      description: '',
      duration,
      score,
      completedAt: now,
      treasureValue,
      timeEntries: [{
        startTime: new Date(now.getTime() - duration * 1000),
        endTime: now,
        duration,
      }],
    };

    setTasks(prev => [newTask, ...prev]);
    return newTask;
  }, []);

  const updateTaskDescription = useCallback((taskId: string, description: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, description } : task
      )
    );
  }, []);

  const updateTaskScore = useCallback((taskId: string, score: number) => {
    setTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          const treasureValue = Math.round((task.duration / 60 * score) / 10 * 10) / 10;
          return { ...task, score, treasureValue };
        }
        return task;
      })
    );
  }, []);

  const logTimeToTask = useCallback((taskId: string, sessionDuration: number) => {
    setTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          const now = new Date();
          const newEntry: TimeEntry = {
            startTime: new Date(now.getTime() - sessionDuration * 1000),
            endTime: now,
            duration: sessionDuration,
          };
          return {
            ...task,
            duration: task.duration + sessionDuration,
            completedAt: now,
            timeEntries: [...task.timeEntries, newEntry],
          };
        }
        return task;
      })
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);

  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  }, []);

  const clearAllTasks = useCallback(() => {
    if (window.confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
      setTasks([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const exportTasks = useCallback(() => {
    try {
      const dataStr = JSON.stringify(tasks, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `life-game-tasks-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting tasks:', error);
      setError('Failed to export tasks');
    }
  }, [tasks]);

  const importTasks = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTasks = JSON.parse(e.target?.result as string);
        if (Array.isArray(importedTasks)) {
          const validTasks = importedTasks
            .filter((task: any) => task.id && task.description && task.duration)
            .map((task: any) => ({
              ...task,
              completedAt: new Date(task.completedAt)
            }));
          
          setTasks(validTasks);
          setError(null);
        } else {
          throw new Error('Invalid file format');
        }
      } catch (error) {
        console.error('Error importing tasks:', error);
        setError('Failed to import tasks. Please check the file format.');
      }
    };
    reader.readAsText(file);
  }, []);

  const getStats = useCallback(() => {
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
  }, [tasks]);

  return {
    tasks,
    addTask,
    updateTaskDescription,
    updateTaskScore,
    logTimeToTask,
    deleteTask,
    updateTask,
    clearAllTasks,
    exportTasks,
    importTasks,
    getStats,
    isLoading,
    error
  };
};