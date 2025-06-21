import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { formatDuration } from '../utils/treasureUtils';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (description: string, score: number) => void;
  duration: number;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  duration
}) => {
  const [description, setDescription] = useState('');
  const [score, setScore] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && score > 0) {
      onSubmit(description.trim(), score);
      setDescription('');
      setScore(0);
      onClose();
    }
  };

  const handleStarClick = (rating: number) => {
    setScore(rating);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Task Completed!</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-2">
            Time spent: <span className="font-semibold text-blue-600">{formatDuration(duration)}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the task you just completed..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              maxLength={100}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {description.length}/100 characters
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Task Quality Rating *
            </label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleStarClick(rating)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    rating <= score
                      ? 'text-yellow-400 transform scale-110'
                      : 'text-gray-300 hover:text-yellow-200'
                  }`}
                >
                  <Star className="w-8 h-8" fill={rating <= score ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              {score === 0 && 'Please select a rating'}
              {score === 1 && 'Needs improvement'}
              {score === 2 && 'Fairly completed'}
              {score === 3 && 'Well completed'}
              {score === 4 && 'Excellent work'}
              {score === 5 && 'Perfect completion'}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!description.trim() || score === 0}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Get Treasure
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};