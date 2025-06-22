'use client'

import React, { useState } from 'react';
import { Category } from '../../hooks/useCategories';
import { CategoryWheel } from './CategoryWheel';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface CategorySelectorProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
  selectedCategoryId: string | null;
}

export function CategorySelector({ categories, onSelectCategory, selectedCategoryId }: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
      <button 
        className="flex items-center justify-between w-full mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-bold text-gray-800">选择任务分类</h2>
        <ChevronDown 
            className={cn("w-6 h-6 text-gray-500 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <CategoryWheel
          categories={categories}
          onSelect={onSelectCategory}
          selectedId={selectedCategoryId}
          editable={false}
        />
      )}
    </div>
  );
} 