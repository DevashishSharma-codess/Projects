/**
 * Quotes Data Custom Hooks
 * Wraps DummyJSON quote fetch requests using TanStack React Query for caching, automatic garbage collection, and state handling.
 */

import { useQuery } from "@tanstack/react-query";
import type { FolderQuoteItem } from "../types/journal";
import { fetchQuotes, fetchRandomQuote } from "../api/quotesApi";

/**
 * Fetches a paginated batch of 5 quotes with React Query caching.
 * @param page - Page offset index (default: 0)
 */
export function useQuotes(page: number = 0) {
    return useQuery<FolderQuoteItem[], Error>({
        queryKey: ["quotes", page],
        queryFn: () => fetchQuotes(page),
        staleTime: 2 * 60 * 1000,     // Fresh for 2 minutes
        gcTime: 5 * 60 * 1000,        // Retained in cache memory for 5 minutes
        refetchOnWindowFocus: false,
    });
}

/**
 * Fetches a fresh random quote on demand without caching.
 * @param enabled - Controls whether the query executes automatically
 */
export function useRandomQuote(enabled: boolean = true) {
    return useQuery<FolderQuoteItem, Error>({
        queryKey: ["quote", "random", Date.now()],
        queryFn: fetchRandomQuote,
        enabled,
        staleTime: 0,
        refetchOnWindowFocus: false,
    });
}
