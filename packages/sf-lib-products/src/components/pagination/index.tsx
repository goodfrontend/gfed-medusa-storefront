'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { clx } from '@medusajs/ui';

export function Pagination({
  page,
  totalPages,
  'data-testid': dataTestid,
}: {
  page: number;
  totalPages: number;
  'data-testid'?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper function to generate an array of numbers within a range
  const arrayRange = (start: number, stop: number) =>
    Array.from({ length: stop - start + 1 }, (_, index) => start + index);

  // Function to handle page changes
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // Function to render a page button
  const renderPageButton = (
    p: number,
    label: string | number,
    isCurrent: boolean
  ) => (
    <button
      type="button"
      key={p}
      aria-current={isCurrent ? 'page' : undefined}
      aria-label={isCurrent ? `Page ${p}, current page` : `Go to page ${p}`}
      className={clx(
        'txt-xlarge-plus inline-flex h-12 min-w-12 items-center justify-center rounded-full px-2 text-ui-fg-muted transition-colors',
        {
          'border-ui-border-base text-ui-fg-base cursor-default border':
            isCurrent,
          'cursor-pointer hover:bg-ui-bg-subtle hover:text-ui-fg-base':
            !isCurrent,
        }
      )}
      disabled={isCurrent}
      onClick={() => handlePageChange(p)}
    >
      {label}
    </button>
  );

  // Function to render ellipsis
  const renderEllipsis = (key: string) => (
    <span
      key={key}
      className="txt-xlarge-plus text-ui-fg-muted inline-flex h-12 items-center justify-center px-1"
    >
      ...
    </span>
  );

  // Function to render page buttons based on the current page and total pages
  const renderPageButtons = () => {
    const buttons = [];

    if (totalPages <= 7) {
      // Show all pages
      buttons.push(
        ...arrayRange(1, totalPages).map((p) =>
          renderPageButton(p, p, p === page)
        )
      );
    } else {
      // Handle different cases for displaying pages and ellipses
      if (page <= 4) {
        // Show 1, 2, 3, 4, 5, ..., lastpage
        buttons.push(
          ...arrayRange(1, 5).map((p) => renderPageButton(p, p, p === page))
        );
        buttons.push(renderEllipsis('ellipsis1'));
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        );
      } else if (page >= totalPages - 3) {
        // Show 1, ..., lastpage - 4, lastpage - 3, lastpage - 2, lastpage - 1, lastpage
        buttons.push(renderPageButton(1, 1, 1 === page));
        buttons.push(renderEllipsis('ellipsis2'));
        buttons.push(
          ...arrayRange(totalPages - 4, totalPages).map((p) =>
            renderPageButton(p, p, p === page)
          )
        );
      } else {
        // Show 1, ..., page - 1, page, page + 1, ..., lastpage
        buttons.push(renderPageButton(1, 1, 1 === page));
        buttons.push(renderEllipsis('ellipsis3'));
        buttons.push(
          ...arrayRange(page - 1, page + 1).map((p) =>
            renderPageButton(p, p, p === page)
          )
        );
        buttons.push(renderEllipsis('ellipsis4'));
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        );
      }
    }

    return buttons;
  };

  // Render the component
  return (
    <nav aria-label="Pagination" className="mt-12 flex w-full justify-center">
      <div className="flex items-center gap-3" data-testid={dataTestid}>
        {renderPageButtons()}
      </div>
    </nav>
  );
}
