import { useEffect, useState } from 'react';

import { type LiteClient } from 'algoliasearch/lite';

import { cn } from '@gfed-medusa/sf-lib-ui/lib/utils';

const SUGGESTIONS_INDEX = process.env
  .NEXT_PUBLIC_ALGOLIA_SUGGESTIONS_INDEX_NAME as string;
const MAX_SUGGESTIONS = 5;

function usePopularSearches(searchClient: LiteClient) {
  const [terms, setTerms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!SUGGESTIONS_INDEX || !searchClient) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function fetch() {
      try {
        const results = await searchClient.search({
          requests: [
            {
              indexName: SUGGESTIONS_INDEX,
              hitsPerPage: MAX_SUGGESTIONS,
              query: '',
            },
          ],
        });
        if (cancelled) return;
        const hits =
          (results?.results?.[0] as { hits?: { query: string }[] })?.hits ?? [];
        const queries = hits
          .map((h) => h.query)
          .filter(Boolean)
          .slice(0, MAX_SUGGESTIONS);
        setTerms(queries);
      } catch {
        // Silent fail — leave terms as empty array
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetch();

    return () => {
      cancelled = true;
    };
  }, [searchClient]);

  return { terms, isLoading };
}

type PopularSearchesProps = {
  searchClient: LiteClient;
  onSelect: (term: string) => void;
};

function PopularSearches({ searchClient, onSelect }: PopularSearchesProps) {
  const { terms, isLoading } = usePopularSearches(searchClient);

  if (isLoading) {
    return (
      <div>
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Popular
        </span>
        <ul className="mt-2">
          <li className="flex min-h-[44px] items-center">
            <div className="h-3 w-20 animate-pulse rounded bg-gray-300" />
          </li>
          <li className="flex min-h-[44px] items-center">
            <div className="h-3 w-24 animate-pulse rounded bg-gray-300" />
          </li>
          <li className="flex min-h-[44px] items-center">
            <div className="h-3 w-16 animate-pulse rounded bg-gray-300" />
          </li>
        </ul>
      </div>
    );
  }

  if (terms.length === 0) {
    return null;
  }

  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        Popular
      </span>

      <ul className="mt-2">
        {terms.map((term) => (
          <li key={term}>
            <button
              type="button"
              onClick={() => onSelect(term)}
              className={cn(
                'flex min-h-[44px] w-full items-center text-left',
                'text-sm text-gray-700',
                'hover:bg-gray-50',
                'cursor-pointer'
              )}
            >
              {term}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { PopularSearches };
