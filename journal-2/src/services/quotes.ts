// DummyJSON Quotes API fetcher with simple fallback array.

import type { Quote } from '../types/quote.types';

const FALLBACK_QUOTES: Quote[] = [
  { quote: "Peace comes from within. Do not seek it without.", author: "Buddha" },
  { quote: "The only journey is the one within.", author: "Rainer Maria Rilke" },
  { quote: "Quiet the mind, and the soul will speak.", author: "Ma Jaya Sati Bhagavati" },
  { quote: "Every day is a fresh start. Take a deep breath and begin again.", author: "Anonymous" },
  { quote: "Nurturing yourself is not selfish, it's essential to your survival.", author: "Rene Peterson" }
];

export async function fetchDailyQuote(): Promise<Quote> {
  try {
    const response = await fetch('https://dummyjson.com/quotes/random');

    if (response.ok) {
      const data = await response.json();
      if (data && data.quote && data.author) {
        return {
          quote: data.quote,
          author: data.author
        };
      }
    }
  } catch (error) {
    console.log("Using fallback quote array due to network issue", error);
  }

  const randomIndex = Math.floor(Math.random() * FALLBACK_QUOTES.length);
  return FALLBACK_QUOTES[randomIndex];
}
