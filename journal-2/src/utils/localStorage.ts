// Save data in localStorage
export function saveToLocalStorage(key: string, data: any) {
  const value = JSON.stringify(data);
  localStorage.setItem(key, value);
}


// Get data from localStorage
export function loadFromLocalStorage(key: string, defaultValue: any) {
  const value = localStorage.getItem(key);

  if (value === null) {
    return defaultValue;
  }

  return JSON.parse(value);
}