'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { liteClient } from 'algoliasearch/lite';
import DOMPurify from 'isomorphic-dompurify';
import {
  Configure,
  InstantSearch,
  PoweredBy,
  useHits,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch';

import { Modal } from '@gfed-medusa/sf-lib-common/components/modal';
import { PlaceholderImage } from '@gfed-medusa/sf-lib-ui/icons/placeholder-image';
import { X } from '@gfed-medusa/sf-lib-ui/icons/x';
import { cn } from '@gfed-medusa/sf-lib-ui/lib/utils';

import { PopularSearches } from './popular-searches';
import { RecentSearches } from './recent-searches';
import { useRecentSearches } from './use-recent-searches';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 1024px)').matches
      : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isDesktop;
}

const searchClient = liteClient(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY as string
);

const INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;

const DEBOUNCE_MS = 200; // Reduce from 300

type AlgoliaProductHit = {
  objectID: string;
  id?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  handle: string;
};

type SearchModalProps = {
  buttonClassName?: string;
};

function SearchModal({ buttonClassName }: SearchModalProps) {
  const isDesktop = useIsDesktop();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { searches, save, clear, remove } = useRecentSearches();

  useEffect(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setInputValue('');
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={cn(
          'small:flex hidden h-full items-center gap-x-6',
          buttonClassName
        )}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="text-ui-fg-subtle hover:text-ui-fg-base flex min-h-[32px] min-w-[32px] cursor-pointer items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Open search"
          data-testid="search-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="small:hidden text-ui-fg-subtle hover:text-ui-fg-base flex min-h-[32px] min-w-[32px] cursor-pointer items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-label="Open search"
        data-testid="mobile-search-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
      <Modal
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        search={true}
        aria-label="Search modal"
      >
        <InstantSearch
          searchClient={searchClient}
          indexName={INDEX_NAME}
          stalledSearchDelay={200}
          future={{ preserveSharedStateOnUnmount: true }}
        >
          <Configure
            hitsPerPage={5}
            attributesToRetrieve={[
              'objectID',
              'id',
              'title',
              'description',
              'thumbnail',
              'handle',
            ]}
            attributesToHighlight={[] as string[]}
          />
          <div
            className="flex min-h-0 flex-col"
            style={{
              height: isDesktop ? '100%' : '100dvh',
              maxHeight: isDesktop ? '75vh' : undefined,
            }}
          >
            <div
              className="flex justify-end px-4 pt-4"
              style={{ display: isDesktop ? 'none' : 'flex' }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="flex min-h-[32px] min-w-[32px] items-center justify-center text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Close search"
                data-testid="close-search-button"
              >
                <X size={20} />
              </button>
            </div>
            <div className="shrink-0">
              <SearchBox
                isOpen={isOpen}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onSave={save}
              />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto border-t border-gray-200 pt-4">
              <SearchResults
                recentSearches={searches}
                onSave={save}
                onClearHistory={clear}
                onRemoveHistory={remove}
                setInputValue={setInputValue}
              />
            </div>
            <div className="mt-4 flex shrink-0 justify-end border-t border-gray-100 px-4 pb-2 pt-3 opacity-60 [&_.ais-PoweredBy-link]:flex [&_.ais-PoweredBy-link]:items-center [&_.ais-PoweredBy-logo]:h-4 [&_.ais-PoweredBy-logo]:w-auto">
              <PoweredBy theme="light" />
            </div>
          </div>
        </InstantSearch>
      </Modal>
    </>
  );
}

type SearchBoxProps = {
  isOpen: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  onSave: (term: string) => void;
};

const SearchBox = ({
  isOpen,
  inputValue,
  setInputValue,
  onSave,
}: SearchBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const queryHook = useCallback(
    (q: string, search: (value: string) => void) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => search(q), DEBOUNCE_MS);
    },
    []
  );

  const { refine } = useSearchBox({ queryHook });

  useEffect(() => {
    if (!isOpen) {
      refine('');
    }
  }, [isOpen, refine]);

  useEffect(() => {
    if (inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    refine(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onSave(inputValue.trim());
    }
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 text-gray-400"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
        className="w-full px-2 py-2 text-base focus:outline-none focus-visible:outline-2 focus-visible:outline-blue-500"
        autoFocus
        aria-label="Search products"
        data-testid="search-input"
      />
    </div>
  );
};

type SearchResultsProps = {
  recentSearches: string[];
  onSave: (term: string) => void;
  onClearHistory: () => void;
  onRemoveHistory: (term: string) => void;
  setInputValue: (value: string) => void;
};

const SearchResults = ({
  recentSearches,
  onSave,
  onClearHistory,
  onRemoveHistory,
  setInputValue,
}: SearchResultsProps) => {
  const { items, results } = useHits<AlgoliaProductHit>();
  const { status, error, indexUiState } = useInstantSearch();
  const { refine } = useSearchBox();
  const query: string = (indexUiState as { query?: string }).query ?? '';

  // Stale when user has typed a new query but debounce hasn't fired yet —
  // indexUiState.query updates on every keystroke but results.query only
  // updates after Algolia responds, so they diverge during the debounce window.
  const searchedQuery = results?.query ?? '';
  const isStale =
    query.trim().length > 0 &&
    searchedQuery.length > 0 &&
    query.trim() !== searchedQuery.trim();

  const isLoading = status === 'stalled' && query.trim().length > 0;
  const isPending =
    (status === 'loading' || isStale) && query.trim().length > 0;
  const isError = status === 'error';

  const handleTermSelect = useCallback(
    (term: string) => {
      setInputValue(term);
      refine(term);
    },
    [setInputValue, refine]
  );

  if (isPending) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="mt-2 text-sm text-gray-500">Searching...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-full items-center justify-center text-rose-600">
        <p>Error: {error?.message ?? 'Search failed'}</p>
      </div>
    );
  }

  if (query.trim() && status === 'idle' && items.length === 0) {
    return (
      <div className="flex min-h-full items-center justify-center text-gray-500">
        <p>No products found</p>
      </div>
    );
  }

  if (!query.trim()) {
    const hasRecent = recentSearches.length > 0;

    const popularColumn = (
      <PopularSearches
        searchClient={searchClient}
        onSelect={(term) => {
          handleTermSelect(term);
          onSave(term);
        }}
      />
    );

    if (!hasRecent) {
      return <div>{popularColumn}</div>;
    }

    return (
      <div className="grid grid-cols-2 gap-4">
        <div>{popularColumn}</div>
        <div>
          <RecentSearches
            searches={recentSearches}
            onSelect={handleTermSelect}
            onClear={onClearHistory}
            onRemove={onRemoveHistory}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      {items.map((hit) => (
        <Hit key={hit.objectID} hit={hit} onSave={onSave} query={query} />
      ))}
    </div>
  );
};

type HitProps = {
  hit: AlgoliaProductHit;
  onSave: (term: string) => void;
  query: string;
};

const Hit = ({ hit, onSave, query }: HitProps) => {
  const sanitizedDescription = useMemo(
    () => DOMPurify.sanitize(hit.description ?? ''),
    [hit.description]
  );

  return (
    <div
      className="relative mt-4 flex flex-row gap-x-2"
      data-testid="search-hit"
      data-id={hit.id ?? hit.objectID}
    >
      <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden border border-gray-200">
        {hit.thumbnail ? (
          <img
            src={hit.thumbnail}
            alt={hit.title ?? 'Product Image'}
            width={100}
            height={100}
            className="aspect-square object-cover"
          />
        ) : (
          <div className="border-grey-400 flex h-[125px] w-[100px] items-center justify-center self-start border">
            <PlaceholderImage size={40} />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-1">
        <h3>{hit.title}</h3>
        <p
          className="text-sm text-gray-500"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }} // nosemgrep: react-dangerouslysetinnerhtml
        />
      </div>
      <a
        href={`/products/${hit.handle}`}
        className="absolute right-0 top-0 h-full w-full"
        aria-label={`View Product: ${hit.title}`}
        onClick={() => onSave(query)}
      />
    </div>
  );
};

export { SearchModal };
