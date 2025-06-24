import { useState, useEffect } from 'react';
import { Category } from '../types';
import { ColorScheme, COLOR_SCHEMES } from '../utils/colorUtils';

export { type Category };

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: '身体-头脑健康', colorScheme: 'sky' },
  { id: '2', name: 'NextJs(被动收入)', colorScheme: 'lime' },
  { id: '3', name: 'AI PM (主动收入)', colorScheme: 'rose' },
  { id: '4', name: '当前工作（主动收入）', colorScheme: 'green' },
  { id: '5', name: '个人成长（主动收入）', colorScheme: 'indigo' },
  { id: '6', name: '亲密关系', colorScheme: 'pink' },
  { id: '7', name: '娱乐与休闲', colorScheme: 'fuchsia' },
  { id: '8', name: '', colorScheme: 'gray' },
  { id: '9', name: '', colorScheme: 'gray' },
];

const STORAGE_KEY = 'task-categories';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  function refetchCategories() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const storedCategories = JSON.parse(stored);
      const updatedCategories = DEFAULT_CATEGORIES.map(defCat => {
        const found = storedCategories.find((sc: Category) => sc.id === defCat.id);
        return found ? { ...defCat, ...found } : defCat;
      });
      setCategories(updatedCategories);
    } else {
      setCategories(DEFAULT_CATEGORIES);
    }
  }

  useEffect(() => {
    refetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    }
  }, [categories]);

  function updateCategory(id: string, name: string) {
    setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, name } : cat));
  }
  
  function updateCategoryColor(id: string, colorScheme: ColorScheme) {
    setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, colorScheme } : cat));
  }

  function resetCategories() {
    setCategories(DEFAULT_CATEGORIES);
  }

  return {
    categories,
    setCategories,
    updateCategory,
    resetCategories,
    updateCategoryColor,
    refetchCategories,
  };
} 