'use client';

import { useCallback } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { clx } from '@medusajs/ui';

import SortProducts, { SortOptions } from './sort-products';

type RefinementListProps = {
  sortBy: SortOptions;
  search?: boolean;
  'data-testid'?: string;
  className?: string;
};

const RefinementList = ({
  sortBy,
  'data-testid': dataTestId,
  className,
}: RefinementListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      if (name === 'sortBy') {
        params.delete('page');
      }

      return params.toString();
    },
    [searchParams]
  );

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value);
    router.push(`${pathname}?${query}`);
  };

  return (
    <div className={clx('w-full', className)}>
      <div className="small:hidden">
        <SortProducts
          sortBy={sortBy}
          setQueryParams={setQueryParams}
          data-testid={dataTestId}
          variant="dropdown"
        />
      </div>
      <div className="small:ml-[1.675rem] small:min-w-[250px] small:flex-col small:px-0 small:py-4 small:pr-6 small:block hidden">
        <SortProducts
          sortBy={sortBy}
          setQueryParams={setQueryParams}
          data-testid={dataTestId}
        />
      </div>
    </div>
  );
};

export default RefinementList;
