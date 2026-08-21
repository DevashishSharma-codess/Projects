// Get today's date as YYYY-MM-DD
export function getTodayDateString(): string {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


// Convert YYYY-MM-DD into something like "Aug 21, 2026"
export function formatReadableDate(dateString: string): string {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-");

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}


// Get the last N days, including today
export function getLastNDaysDates(numDays: number = 14): string[] {
  const dates: string[] = [];
  const today = new Date();

  for (let i = numDays - 1; i >= 0; i--) {
    const date = new Date(today);

    date.setDate(today.getDate() - i);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    dates.push(`${year}-${month}-${day}`);
  }

  return dates;
}