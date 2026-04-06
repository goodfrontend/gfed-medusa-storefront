'use client';

import { FilterRadioGroup } from '@gfed-medusa/sf-lib-ui/components/filter-radio-group';
import NativeSelect from '@gfed-medusa/sf-lib-ui/components/native-select';

export type SortOptions = 'price_asc' | 'price_desc' | 'created_at';

type SortProductsProps = {
  sortBy: SortOptions;
  setQueryParams: (name: string, value: SortOptions) => void;
  variant?: 'radio' | 'dropdown';
  'data-testid'?: string;
};

const sortOptions = [
  {
    value: 'created_at',
    label: 'Latest Arrivals',
  },
  {
    value: 'price_asc',
    label: 'Price: Low -> High',
  },
  {
    value: 'price_desc',
    label: 'Price: High -> Low',
  },
];

const SortProducts = ({
  'data-testid': dataTestId,
  sortBy,
  setQueryParams,
  variant = 'radio',
}: SortProductsProps) => {
  const handleChange = (value: SortOptions) => {
    setQueryParams('sortBy', value);
  };

  if (variant === 'dropdown') {
    return (
      <div className="w-fit max-w-full">
        <NativeSelect
          aria-label="Sort products"
          placeholder="Sort by"
          value={sortBy}
          className="xsmall:w-[280px] w-[220px] max-w-full"
          onChange={(event) => handleChange(event.target.value as SortOptions)}
          data-testid={dataTestId}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect>
      </div>
    );
  }

  return (
    <FilterRadioGroup
      title="Sort by"
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  );
};

export default SortProducts;
