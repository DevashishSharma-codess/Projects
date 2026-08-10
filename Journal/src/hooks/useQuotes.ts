import { useQuery } from "@tanstack/react-query";
import type { FolderQuoteItem } from "../types/journal";
import { fetchQuotes, fetchRandomQuote } from "../api/quotesApi";

/**
 * Fetch a page of 5 quotes using React Query.
 * Quotes are cached for 5 minutes and considered stale after 2 minutes.
 */
export function useQuotes(page: number = 0) {
    return useQuery<FolderQuoteItem[], Error>({
        queryKey: ["quotes", page],
        queryFn: () => fetchQuotes(page),
        staleTime: 2 * 60 * 1000,     // 2 minutes
        gcTime: 5 * 60 * 1000,        // 5 minutes (garbage collection)
        refetchOnWindowFocus: false,
    });
}

/**
 * Fetch a single random quote using React Query.
 * Each call gets a fresh random quote (no caching).
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

