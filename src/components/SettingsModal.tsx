import React, { useState } from 'react';
import { X, Download, Upload, Trash2, Database, AlertTriangle } from 'lucide-react';
import { storageUtils } from '../utils/storageUtils';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChange: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onDataChange
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [usageInfo, setUsageInfo] = useState(() => storageUtils.getUsageInfo());

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);
    try {
      const data = storageUtils.exportData();
      if (data) {
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `life-game-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result as string;
        const success = storageUtils.importData(data);
        
        if (success) {
          onDataChange();
          setUsageInfo(storageUtils.getUsageInfo());
          alert('Data imported successfully!');
        } else {
          setImportError('Failed to import data. Please check the file format.');
        }
      } catch (error) {
        setImportError('Invalid file format. Please select a valid backup file.');
      } finally {
        setIsImporting(false);
      }
    };

    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all data? This action cannot be undone.')) {
      storageUtils.clearAll();
      onDataChange();
      setUsageInfo(storageUtils.getUsageInfo());
      alert('All data has been cleared.');
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Storage Usage */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Database className="w-5 h-5" />
            Storage Usage
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Used Space</span>
              <span className="text-sm font-medium">{formatBytes(usageInfo.used)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  usageInfo.percentage > 80 ? 'bg-red-500' : 
                  usageInfo.percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(usageInfo.percentage, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Available: {formatBytes(usageInfo.available)}</span>
              <span>{usageInfo.percentage.toFixed(1)}% used</span>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Data Management</h3>
          
          {/* Export Data */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Exporting...' : 'Export Data'}
          </button>

          {/* Import Data */}
          <div>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              id="import-file"
              disabled={isImporting}
            />
            <label
              htmlFor="import-file"
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer ${
                isImporting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Upload className="w-4 h-4" />
              {isImporting ? 'Importing...' : 'Import Data'}
            </label>
          </div>

          {/* Import Error */}
          {importError && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertTriangle className="w-4 h-4" />
              {importError}
            </div>
          )}

          {/* Clear All Data */}
          <button
            onClick={handleClearAll}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All Data
          </button>
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> All data is stored locally in your browser. 
            Export your data regularly to prevent loss.
          </p>
        </div>
      </div>
    </div>
  );
}; 