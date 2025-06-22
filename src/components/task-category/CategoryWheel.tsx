import React from 'react';
import { type Category } from '../../types';
import { cn } from '../../utils/cn';

interface CategoryWheelProps {
  categories: Category[];
  onCategoryChange?: (id: string, name: string) => void;
  onSelect?: (category: Category) => void;
  selectedId?: string | null;
  editable: boolean;
}

export function CategoryWheel({ 
  categories, 
  onCategoryChange, 
  onSelect,
  selectedId,
  editable 
}: CategoryWheelProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {categories.map(category => {
        const isSelected = !editable && selectedId === category.id;

        if (editable) {
          return (
            <div key={category.id} className="aspect-square flex items-center justify-center p-2 rounded-lg bg-gray-100">
              <textarea
                value={category.name}
                onChange={(e) => onCategoryChange?.(category.id, e.target.value)}
                className="w-full h-full text-center bg-transparent focus:outline-none text-sm font-medium text-gray-700 resize-none flex items-center justify-center"
                placeholder="Unnamed"
                rows={3}
              />
            </div>
          )
        }
        
        return (
            <button
                key={category.id}
                onClick={() => onSelect?.(category)}
                disabled={!category.name}
                className={cn(
                    "aspect-square flex items-center justify-center p-2 rounded-lg transition-all duration-200",
                    "text-sm font-medium text-center break-words",
                    !category.name && "bg-gray-50 cursor-not-allowed",
                    category.name && "bg-gray-100 hover:bg-indigo-100 hover:shadow-md",
                    isSelected && "ring-2 ring-offset-2 ring-indigo-500 bg-indigo-100 text-indigo-800 shadow-lg"
                )}
            >
                {category.name || 'Empty'}
            </button>
        )
    })}
    </div>
  );
} 