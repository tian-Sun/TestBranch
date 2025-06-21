// Storage utility functions for better cache management

export interface StorageItem<T> {
  version: string;
  data: T;
  timestamp: number;
  expiresAt?: number;
}

export class StorageManager {
  private static readonly DEFAULT_VERSION = '1.0';
  private static readonly DEFAULT_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days

  /**
   * Save data to localStorage with versioning and TTL
   */
  static set<T>(key: string, data: T, version?: string, ttl?: number): boolean {
    try {
      const item: StorageItem<T> = {
        version: version || this.DEFAULT_VERSION,
        data,
        timestamp: Date.now(),
        expiresAt: ttl ? Date.now() + ttl : undefined
      };

      localStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error(`Error saving to localStorage (${key}):`, error);
      return false;
    }
  }

  /**
   * Get data from localStorage with version checking and TTL validation
   */
  static get<T>(key: string, expectedVersion?: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const parsedItem: StorageItem<T> = JSON.parse(item);

      // Check if data has expired
      if (parsedItem.expiresAt && Date.now() > parsedItem.expiresAt) {
        localStorage.removeItem(key);
        return null;
      }

      // Check version compatibility
      if (expectedVersion && parsedItem.version !== expectedVersion) {
        console.warn(`Version mismatch for ${key}, clearing old data`);
        localStorage.removeItem(key);
        return null;
      }

      return parsedItem.data;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return null;
    }
  }

  /**
   * Remove item from localStorage
   */
  static remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  }

  /**
   * Check if item exists and is valid
   */
  static has(key: string, expectedVersion?: string): boolean {
    try {
      const item = localStorage.getItem(key);
      if (!item) return false;

      const parsedItem: StorageItem<any> = JSON.parse(item);

      // Check if data has expired
      if (parsedItem.expiresAt && Date.now() > parsedItem.expiresAt) {
        localStorage.removeItem(key);
        return false;
      }

      // Check version compatibility
      if (expectedVersion && parsedItem.version !== expectedVersion) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get storage usage information
   */
  static getUsageInfo(): { used: number; available: number; percentage: number } {
    try {
      let used = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          used += localStorage[key].length + key.length;
        }
      }

      // Estimate available space (most browsers have 5-10MB limit)
      const available = 5 * 1024 * 1024; // 5MB estimate
      const percentage = (used / available) * 100;

      return { used, available, percentage };
    } catch (error) {
      return { used: 0, available: 0, percentage: 0 };
    }
  }

  /**
   * Clear all data for this app
   */
  static clearAll(): boolean {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('life-game-') || key.startsWith('life_game_'))) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  /**
   * Export all app data
   */
  static exportData(): string {
    try {
      const data: Record<string, any> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('life-game-') || key.startsWith('life_game_'))) {
          data[key] = localStorage.getItem(key);
        }
      }

      return JSON.stringify({
        version: this.DEFAULT_VERSION,
        timestamp: Date.now(),
        data
      }, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      return '';
    }
  }

  /**
   * Import app data
   */
  static importData(jsonData: string): boolean {
    try {
      const parsed = JSON.parse(jsonData);
      if (!parsed.data || typeof parsed.data !== 'object') {
        throw new Error('Invalid data format');
      }

      Object.entries(parsed.data).forEach(([key, value]) => {
        if (typeof value === 'string') {
          localStorage.setItem(key, value);
        }
      });

      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}

// Convenience functions for common operations
export const storageUtils = {
  // Task storage
  saveTasks: (tasks: any[]) => StorageManager.set('life-game-tasks', tasks, '1.0'),
  loadTasks: () => StorageManager.get('life-game-tasks', '1.0'),
  
  // Timer storage
  saveTimer: (timerState: any) => StorageManager.set('life-game-timer', timerState, '1.0'),
  loadTimer: () => StorageManager.get('life-game-timer', '1.0'),
  
  // Settings storage
  saveSettings: (settings: any) => StorageManager.set('life-game-settings', settings, '1.0'),
  loadSettings: () => StorageManager.get('life-game-settings', '1.0'),
  
  // Clear all app data
  clearAll: () => StorageManager.clearAll(),
  
  // Export/Import
  exportData: () => StorageManager.exportData(),
  importData: (data: string) => StorageManager.importData(data),
  
  // Usage info
  getUsageInfo: () => StorageManager.getUsageInfo()
}; 