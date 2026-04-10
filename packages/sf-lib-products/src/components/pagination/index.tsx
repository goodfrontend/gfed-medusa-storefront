'use client';

import { ArrowUpMini } from '@medusajs/icons';
import { Button, clx } from '@medusajs/ui';

export function Pagination({
  loadedCount,
  totalItems,
  itemsPerPage,
  hasNextPage,
  disabled = false,
  isLoading = false,
  onLoadMore,
  'data-testid': dataTestid,
}: {
  loadedCount: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onLoadMore: () => void;
  'data-testid'?: string;
}) {
  const visibleItemsCount = Math.min(loadedCount, totalItems);
  const productsLabel = totalItems === 1 ? 'product' : 'products';
  const formattedTotalItems = new Intl.NumberFormat().format(totalItems);
  const formattedVisibleItems = new Intl.NumberFormat().format(
    visibleItemsCount
  );
  const progressValue =
    totalItems > 0 ? Math.round((visibleItemsCount / totalItems) * 100) : 0;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Load more products"
      className="mt-12 w-full"
      data-testid={dataTestid}
    >
      <div className="mx-auto flex w-full flex-col items-center gap-3 text-center">
        <div className="xsmall:w-[300px] w-full space-y-2">
          <p
            className="text-small-regular text-ui-fg-subtle"
            aria-live="polite"
          >
            Showing {formattedVisibleItems} of {formattedTotalItems}{' '}
            {productsLabel}
          </p>
          <div
            aria-label="Loaded products progress"
            aria-valuemax={totalItems}
            aria-valuemin={0}
            aria-valuenow={visibleItemsCount}
            className="border-ui-border-base bg-ui-bg-subtle h-2 w-full overflow-hidden rounded-full border"
            role="progressbar"
          >
            <div
              className="bg-ui-fg-base h-full rounded-full transition-[width] duration-300 ease-out"
              style={{ width: `${progressValue}%` }}
            />
          </div>
        </div>
        {hasNextPage && (
          <Button
            type="button"
            variant="secondary"
            className="xsmall:w-[300px] h-[45px] w-full justify-center rounded-md px-6"
            disabled={disabled || isLoading}
            isLoading={isLoading}
            aria-label={`Load ${Math.min(itemsPerPage, totalItems - visibleItemsCount)} more ${productsLabel}`}
            onClick={onLoadMore}
          >
            Load more
          </Button>
        )}
        <button
          type="button"
          aria-label="Scroll back to the top of the page"
          className={clx(
            'text-small-regular text-ui-fg-subtle hover:text-ui-fg-base mt-8 inline-flex items-center gap-2 transition-colors'
          )}
          onClick={scrollToTop}
        >
          <span
            aria-hidden="true"
            className="flex h-4 w-4 items-center justify-center"
          >
            <ArrowUpMini className="h-4 w-4" color="currentColor" />
          </span>
          <span>Scroll to top</span>
        </button>
      </div>
    </nav>
  );
}
