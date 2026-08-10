import type { FolderQuoteItem } from "../types/journal";

// ── API response types from DummyJSON ──
export interface DummyJsonQuote {
    id: number;
    quote: string;
    author: string;
}

export interface DummyJsonQuotesResponse {
    quotes: DummyJsonQuote[];
    total: number;
    skip: number;
    limit: number;
}

// ── Visual config for mapping API quotes into the folder-tab UI ──
const TAB_CONFIG = [
    { tabLabel: "Claude", bgColor: "#F472B6", textColor: "#111827", tabLeftOffset: 0 },
    { tabLabel: "Aiko", bgColor: "#818CF8", textColor: "#FFFFFF", tabLeftOffset: 70 },
    { tabLabel: "Perplexity", bgColor: "#FFFFFF", textColor: "#0F172A", tabLeftOffset: 170 },
    { tabLabel: "Limitless", bgColor: "#3B82F6", textColor: "#FFFFFF", tabLeftOffset: 250 },
    { tabLabel: "ChatGPT", bgColor: "#D4FE00", textColor: "#111827", tabLeftOffset: 0 },
];

/**
 * Helper: maps a raw DummyJSON quote into the FolderQuoteItem shape
 * used by the QuotesHub UI.
 */
function mapToFolderQuote(q: DummyJsonQuote, index: number): FolderQuoteItem {
    const config = TAB_CONFIG[index % TAB_CONFIG.length];
    return {
        id: `api-q${q.id}`,
        tabLabel: config.tabLabel,
        bgColor: config.bgColor,
        textColor: config.textColor,
        quote: q.quote,
        author: q.author,
        handle: `@${q.author.toLowerCase().replace(/\s+/g, "")}`,
        codeRef: `${String(q.id).padStart(2, "0")}A`,
        dateStr: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }),
        tabLeftOffset: config.tabLeftOffset,
    };
}

/**
 * Fetch a paginated batch of 5 quotes from the DummyJSON API.
 * @param page - Zero-based page index (page 0 = first 5 quotes, page 1 = next 5, etc.)
 */
export async function fetchQuotes(page: number = 0): Promise<FolderQuoteItem[]> {
    const limit = 5;
    const skip = page * limit;

    const response = await fetch(
        `https://dummyjson.com/quotes?limit=${limit}&skip=${skip}`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch quotes: ${response.statusText}`);
    }

    const data: DummyJsonQuotesResponse = await response.json();

    return data.quotes.map((q, index) => mapToFolderQuote(q, index));
}

/**
 * Fetch a single random quote from the DummyJSON API.
 */
export async function fetchRandomQuote(): Promise<FolderQuoteItem> {
    const response = await fetch("https://dummyjson.com/quotes/random");

    if (!response.ok) {
        throw new Error(`Failed to fetch random quote: ${response.statusText}`);
    }

    const q: DummyJsonQuote = await response.json();
    const randomIndex = Math.floor(Math.random() * TAB_CONFIG.length);

    return mapToFolderQuote(q, randomIndex);
}
