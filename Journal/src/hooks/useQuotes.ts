/**
 * Simple Quotes Data Custom Hooks
 * Uses standard React useState + useEffect to fetch quotes cleanly without complex caching layers.
 */

import { useState, useEffect } from "react";
import type { FolderQuoteItem } from "../types/journal";
import { fetchQuotes, fetchRandomQuote } from "../api/quotesApi";

/**
 * Simple hook to fetch 5 quotes from API
 */
export function useQuotes(page: number = 0) {
    const [data, setData] = useState<FolderQuoteItem[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const refetch = async () => {
        setIsLoading(true);
        try {
            const quotes = await fetchQuotes(page);
            setData(quotes);
            setError(null);
        } catch (err: any) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refetch();
    }, [page]);

    return { data, isLoading, error, refetch };
}

/**
 * Simple hook to fetch a random quote from API
 */
export function useRandomQuote(enabled: boolean = true) {
    const [data, setData] = useState<FolderQuoteItem | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(enabled);
    const [error, setError] = useState<Error | null>(null);

    const refetch = async () => {
        setIsLoading(true);
        try {
            const quote = await fetchRandomQuote();
            setData(quote);
            setError(null);
        } catch (err: any) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (enabled) {
            refetch();
        }
    }, [enabled]);

    return { data, isLoading, error, refetch };
}
