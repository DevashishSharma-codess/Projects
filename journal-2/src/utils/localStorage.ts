// Basic localStorage utility functions for persistence.
// Plain functions using JSON.parse and JSON.stringify — easy for beginners!

// Helper to save any data to localStorage with a given key
export function saveToLocalStorage(key: string, data: any): void {
  try {
    const jsonString = JSON.stringify(data);
    localStorage.setItem(key, jsonString);
  } catch (error) {
    console.error("Could not save to localStorage", error);
  }
}

// Helper to load data from localStorage with a given key
export function loadFromLocalStorage(key: string, fallbackValue: any): any {
  try {
    const jsonString = localStorage.getItem(key);
    if (jsonString === null) {
      return fallbackValue;
    }
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Could not load from localStorage", error);
    return fallbackValue;
  }
}
