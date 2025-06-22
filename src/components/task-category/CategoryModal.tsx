'use client';

import React, { useState, useEffect } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { CategoryWheel } from './CategoryWheel';
import { type Category } from '../../types';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CategoryModal({ isOpen, onClose }: CategoryModalProps) {
  const { categories: initialCategories, setCategories, resetCategories: resetToDefaultInHook } = useCategories();
  const [tempCategories, setTempCategories] = useState<Category[]>(initialCategories);

  useEffect(() => {
    if (isOpen) {
      setTempCategories(initialCategories);
    }
  }, [isOpen, initialCategories]);

  if (!isOpen) {
    return null;
  }

  function handleCategoryChange(id: string, name: string) {
    setTempCategories(prev => prev.map(cat => (cat.id === id ? { ...cat, name } : cat)));
  }

  function handleSave() {
    setCategories(tempCategories);
    onClose();
  }

  function handleReset() {
    resetToDefaultInHook();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Manage Categories</h2>
        
        <CategoryWheel 
            categories={tempCategories}
            onCategoryChange={handleCategoryChange}
            editable={true}
        />

        <div className="flex justify-between mt-8">
            <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
                Reset to Default
            </button>
            <div className='space-x-4'>
                <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="px-6 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                    Save
                </button>
            </div>
        </div>
      </div>
    </div>
  );
} 