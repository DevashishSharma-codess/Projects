import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

import type { JournalEntry, MoodLog } from "../types";
import { STORAGE_KEYS } from "../utils/constants";
import { saveToLocalStorage, loadFromLocalStorage } from "../utils/localStorage";
import { getSeedMoodLogs } from "../data/seedMoods";


// Create the Context
export const AppContext = createContext<any>(null);


// This component stores all our shared data
export function AppProvider({ children }: { children: ReactNode }) {

  // ---------------- THEME ----------------

  const [theme, setTheme] = useState(() => {
    return loadFromLocalStorage(STORAGE_KEYS.THEME_MODE, "light");
  });


  // ---------------- JOURNAL ENTRIES ----------------

  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    return loadFromLocalStorage(STORAGE_KEYS.JOURNAL_ENTRIES, []);
  });


  // ---------------- MOOD LOGS ----------------

  const [moodLogs, setMoodLogs] = useState<MoodLog[]>(() => {

    const savedMoods = loadFromLocalStorage(
      STORAGE_KEYS.MOOD_LOGS,
      []
    );

    // If we already have saved moods, use them
    if (savedMoods.length > 0) {
      return savedMoods;
    }

    // Otherwise use the example/starting moods
    return getSeedMoodLogs();
  });


  // Save theme whenever it changes
  useEffect(() => {

    document.documentElement.setAttribute("data-theme", theme);

    saveToLocalStorage(
      STORAGE_KEYS.THEME_MODE,
      theme
    );

  }, [theme]);


  // Save journal entries whenever they change
  useEffect(() => {

    saveToLocalStorage(
      STORAGE_KEYS.JOURNAL_ENTRIES,
      entries
    );

  }, [entries]);


  // Save mood logs whenever they change
  useEffect(() => {

    saveToLocalStorage(
      STORAGE_KEYS.MOOD_LOGS,
      moodLogs
    );

  }, [moodLogs]);


  // Change light ↔ dark
  function toggleTheme() {

    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }

  }


  // Add a new journal entry
  function addEntry(newEntry: JournalEntry) {

    setEntries((oldEntries) => {
      return [newEntry, ...oldEntries];
    });

  }


  // Delete a journal entry by id
  function deleteEntry(id: string) {

    setEntries((oldEntries) => {
      return oldEntries.filter((entry) => entry.id !== id);
    });

  }


  // Add a mood for a day
  // If that day already has a mood, replace the old one
  function addMoodLog(newMood: MoodLog) {

    setMoodLogs((oldMoods) => {

      const moodsWithoutSameDate = oldMoods.filter(
        (mood) => mood.date !== newMood.date
      );

      return [newMood, ...moodsWithoutSameDate];

    });

  }


  // Give all this data to any component that uses AppContext
  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,

        entries,
        addEntry,
        deleteEntry,

        moodLogs,
        addMoodLog
      }}
    >
      {children}
    </AppContext.Provider>
  );
}