import { cn } from '@gfed-medusa/sf-lib-ui/lib/utils';

type RecentSearchesProps = {
  searches: string[];
  onSelect: (term: string) => void;
  onClear: () => void;
};

function RecentSearches({ searches, onSelect, onClear }: RecentSearchesProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Recent Searched Terms
        </span>
        <button
          type="button"
          onClick={onClear}
          className="cursor-pointer text-xs text-gray-400 transition-colors hover:text-gray-600"
        >
          Clear history
        </button>
      </div>

      <ul className="mt-2">
        {searches.map((term) => (
          <li key={term}>
            <button
              type="button"
              onClick={() => onSelect(term)}
              className={cn(
                'flex min-h-[44px] w-full items-center text-left',
                'py-2 text-sm text-gray-700',
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

export { RecentSearches };
