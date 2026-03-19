import { cn } from '@gfed-medusa/sf-lib-ui/lib/utils';

type RecentSearchesProps = {
  searches: string[];
  onSelect: (term: string) => void;
  onClear: () => void;
  onRemove: (term: string) => void;
};

function RecentSearches({ searches, onSelect, onClear, onRemove }: RecentSearchesProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        Recent Searched Terms
      </span>

      <ul className="mt-2">
        {searches.map((term) => (
          <li key={term} className="flex items-center w-full">
            <button
              type="button"
              onClick={() => onSelect(term)}
              className={cn(
                'flex flex-1 items-center min-h-[44px] text-left',
                'text-sm text-gray-700',
                'hover:bg-gray-50',
                'cursor-pointer'
              )}
            >
              {term}
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemove(term); }}
              aria-label={`Remove ${term} from recent searches`}
              className={cn(
                'flex shrink-0 items-center justify-center min-h-[44px] w-8',
                'text-gray-400 hover:text-gray-600 hover:bg-gray-100',
                'cursor-pointer'
              )}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onClear}
        style={{ textDecoration: 'underline' }}
        className="mt-3 cursor-pointer text-xs text-gray-400 transition-colors hover:text-gray-600"
      >
        Clear history
      </button>
    </div>
  );
}

export { RecentSearches };
