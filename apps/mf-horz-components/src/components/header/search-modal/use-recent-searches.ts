import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'gfed_recent_searches';
const MAX_ITEMS = 5;

function readFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeToStorage(items: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>([]);

  useEffect(() => {
    setSearches(readFromStorage());
  }, []);

  const save = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setSearches((prev) => {
      const filtered = prev.filter(
        (s) => s.toLowerCase() !== trimmed.toLowerCase()
      );
      const next = [trimmed, ...filtered].slice(0, MAX_ITEMS);
      writeToStorage(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setSearches([]);
  }, []);

  const remove = useCallback((term: string) => {
    setSearches((prev) => {
      const next = prev.filter(
        (s) => s.toLowerCase() !== term.toLowerCase()
      );
      writeToStorage(next);
      return next;
    });
  }, []);

  return { searches, save, clear, remove };
}

export { useRecentSearches };
