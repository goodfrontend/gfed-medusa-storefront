'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { liteClient } from 'algoliasearch/lite';
import DOMPurify from 'isomorphic-dompurify';
import {
  Configure,
  InstantSearch,
  useHits,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch';

import { Modal } from '@gfed-medusa/sf-lib-common/components/modal';
import { PlaceholderImage } from '@gfed-medusa/sf-lib-ui/icons/placeholder-image';
import { cn } from '@gfed-medusa/sf-lib-ui/lib/utils';
import { Button } from '@medusajs/ui';

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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <div
        className={cn(
          'small:flex hidden h-full items-center gap-x-6',
          buttonClassName
        )}
      >
        <Button
          onClick={() => setIsOpen(true)}
          variant="transparent"
          className="text-small-regular hover:text-ui-fg-base cursor-pointer px-0 hover:bg-transparent focus:!bg-transparent"
          data-testid="search-button"
        >
          Search
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        close={() => setIsOpen(false)}
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
          <div className="flex h-full max-h-[75vh] min-h-0 flex-col">
            <div className="shrink-0">
              <SearchBox isOpen={isOpen} />
            </div>
            <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
              <SearchResults />
            </div>
          </div>
        </InstantSearch>
      </Modal>
    </>
  );
}

const SearchBox = ({ isOpen }: { isOpen: boolean }) => {
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
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setInputValue('');
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

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search products..."
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus-visible:outline-2 focus-visible:outline-blue-500"
        autoFocus
        data-testid="search-input"
      />
    </div>
  );
};

const SearchResults = () => {
  const { items, results } = useHits<AlgoliaProductHit>();
  const { status, error, indexUiState } = useInstantSearch();
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
    return null;
  }

  return (
    <div>
      {items.map((hit) => (
        <Hit key={hit.objectID} hit={hit} />
      ))}
    </div>
  );
};

const Hit = ({ hit }: { hit: AlgoliaProductHit }) => {
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
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
      </div>
      <a
        href={`/products/${hit.handle}`}
        className="absolute right-0 top-0 h-full w-full"
        aria-label={`View Product: ${hit.title}`}
      />
    </div>
  );
};

export { SearchModal };
