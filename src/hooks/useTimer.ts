import { useState, useEffect, useRef, useCallback } from 'react';

const TIMER_STORAGE_KEY = 'life-game-timer';

interface TimerState {
  seconds: number;
  isRunning: boolean;
  lastStartTime: number | null;
}

export const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lastStartTime, setLastStartTime] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Function to update timer based on current time
  const updateTimer = useCallback(() => {
    if (isRunning && startTimeRef.current) {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - startTimeRef.current) / 1000);
      setSeconds(elapsedSeconds);
    }
  }, [isRunning]);

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isRunning) {
        // Page became visible, update timer immediately
        updateTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isRunning, updateTimer]);

  // Load timer state from localStorage on mount
  useEffect(() => {
    try {
      const savedTimer = localStorage.getItem(TIMER_STORAGE_KEY);
      if (savedTimer) {
        const timerState: TimerState = JSON.parse(savedTimer);
        
        // If timer was running when page was closed, calculate elapsed time
        if (timerState.isRunning && timerState.lastStartTime) {
          const elapsedSeconds = Math.floor((Date.now() - timerState.lastStartTime) / 1000);
          setSeconds(timerState.seconds + elapsedSeconds);
          setIsRunning(true);
          setLastStartTime(timerState.lastStartTime);
          startTimeRef.current = timerState.lastStartTime;
        } else {
          setSeconds(timerState.seconds);
          setIsRunning(false);
          setLastStartTime(null);
          startTimeRef.current = null;
        }
      }
    } catch (error) {
      console.error('Error loading timer state:', error);
    }
  }, []);

  // Save timer state to localStorage whenever it changes
  useEffect(() => {
    const timerState: TimerState = {
      seconds,
      isRunning,
      lastStartTime
    };
    
    try {
      localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(timerState));
    } catch (error) {
      console.error('Error saving timer state:', error);
    }
  }, [seconds, isRunning, lastStartTime]);

  // Timer logic using timestamp-based approach
  useEffect(() => {
    if (isRunning && startTimeRef.current) {
      // Update immediately
      updateTimer();
      
      // Then set up interval for UI updates
      intervalRef.current = setInterval(updateTimer, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, updateTimer]);

  const start = useCallback(() => {
    const now = Date.now();
    setIsRunning(true);
    setLastStartTime(now);
    startTimeRef.current = now;
    setSeconds(0);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    setLastStartTime(null);
    startTimeRef.current = null;
  }, []);

  const reset = useCallback(() => {
    setSeconds(0);
    setIsRunning(false);
    setLastStartTime(null);
    startTimeRef.current = null;
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
    setLastStartTime(null);
    startTimeRef.current = null;
  }, []);

  const resume = useCallback(() => {
    const now = Date.now();
    setIsRunning(true);
    setLastStartTime(now);
    startTimeRef.current = now;
  }, []);

  const setTime = useCallback((newSeconds: number) => {
    setSeconds(Math.max(0, newSeconds));
  }, []);

  const formatTime = useCallback((totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const clearTimerData = useCallback(() => {
    localStorage.removeItem(TIMER_STORAGE_KEY);
    setSeconds(0);
    setIsRunning(false);
    setLastStartTime(null);
    startTimeRef.current = null;
  }, []);

  return {
    seconds,
    isRunning,
    lastStartTime,
    start,
    stop,
    reset,
    pause,
    resume,
    setTime,
    formatTime: () => formatTime(seconds),
    clearTimerData
  };
};