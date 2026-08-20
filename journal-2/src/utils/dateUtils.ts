

// Returns today's date formatted as YYYY-MM-DD
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Formats a date string (YYYY-MM-DD) into a nice readable string like "Oct 24, 2026"
export function formatReadableDate(dateString: string): string {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;

  const dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Generates an array of date strings for the last N days (default 14 days)
export function getLastNDaysDates(numDays: number = 14): string[] {
  const result: string[] = [];
  const today = new Date();

  for (let i = numDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    result.push(`${year}-${month}-${day}`);
  }

  return result;
}
