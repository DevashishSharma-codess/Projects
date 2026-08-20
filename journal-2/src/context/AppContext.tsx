// Global Context Provider for Theme Mode and Entries/Moods State.

import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { JournalEntry, MoodLog } from '../types';
import { STORAGE_KEYS } from '../utils/constants';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';
import { getSeedMoodLogs } from '../data/seedMoods';

interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  entries: JournalEntry[];
  addEntry: (newEntry: JournalEntry) => void;
  moodLogs: MoodLog[];
  addMoodLog: (newMood: MoodLog) => void;
}

export const AppContext = createContext<AppContextType>({
  theme: 'light',
  toggleTheme: () => {},
  entries: [],
  addEntry: () => {},
  moodLogs: [],
  addMoodLog: () => {}
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>(() => {
    return loadFromLocalStorage(STORAGE_KEYS.THEME_MODE, 'light');
  });

  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    return loadFromLocalStorage(STORAGE_KEYS.JOURNAL_ENTRIES, []);
  });

  const [moodLogs, setMoodLogs] = useState<MoodLog[]>(() => {
    const saved = loadFromLocalStorage(STORAGE_KEYS.MOOD_LOGS, []);
    if (saved && Array.isArray(saved) && saved.length > 0) {
      return saved;
    }
    return getSeedMoodLogs();
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveToLocalStorage(STORAGE_KEYS.THEME_MODE, theme);
  }, [theme]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.JOURNAL_ENTRIES, entries);
  }, [entries]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.MOOD_LOGS, moodLogs);
  }, [moodLogs]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const addEntry = (newEntry: JournalEntry) => {
    setEntries((prevEntries) => [newEntry, ...prevEntries]);
  };

  const addMoodLog = (newMood: MoodLog) => {
    setMoodLogs((prevLogs) => {
      const filtered = prevLogs.filter((log) => log.date !== newMood.date);
      return [newMood, ...filtered];
    });
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        entries,
        addEntry,
        moodLogs,
        addMoodLog
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
