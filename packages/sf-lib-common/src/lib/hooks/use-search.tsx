'use client';

import { useCallback, useEffect, useState } from 'react';

import { searchSuggestions } from '@/lib/data/search';
import { ProductHit } from '@/types/graphql';

export type UseSearchOptions = {
  hitsPerPage?: number;
  debounceMs?: number;
};

export type SearchResult = {
  items: ProductHit[];
};

const DEBOUNCE_MS = 500;

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const searchParams = {
        query: searchQuery,
        hitsPerPage: 20,
      };

      const searchResults = await searchSuggestions(searchParams);
      setResults(searchResults);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed';
      setError(errorMessage);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback(
    async (searchQuery: string) => {
      await performSearch(searchQuery);
    },
    [performSearch]
  );

  const handleQueryChange = useCallback(
    (newQuery: string) => {
      setQuery(newQuery);

      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      if (newQuery.trim()) {
        setIsTyping(true);
      } else {
        setIsTyping(false);
        setResults(null);
        return;
      }

      const timer = setTimeout(() => {
        setIsTyping(false);
        performSearch(newQuery);
      }, DEBOUNCE_MS);

      setDebounceTimer(timer);
    },
    [debounceTimer, performSearch]
  );

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return {
    query,
    setQuery: handleQueryChange,
    results,
    loading,
    error,
    search,
    isTyping,
  };
};
