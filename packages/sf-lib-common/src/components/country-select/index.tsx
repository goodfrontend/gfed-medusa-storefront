import React, { useImperativeHandle, useMemo, useRef } from 'react';

import NativeSelect, {
  NativeSelectProps,
} from '@gfed-medusa/sf-lib-ui/components/native-select';

import { Region } from '@/types/graphql';

const CountrySelect = React.forwardRef<
  HTMLSelectElement,
  NativeSelectProps & {
    region?: Region | null;
  }
>(({ placeholder = 'Country', region, defaultValue, ...props }, ref) => {
  const innerRef = useRef<HTMLSelectElement>(null);

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => innerRef.current
  );

  const countryOptions = useMemo(() => {
    if (!region) {
      return [];
    }

    return region.countries?.map((country) => ({
      value: country?.iso2,
      label: country?.displayName,
    }));
  }, [region]);

  return (
    <NativeSelect
      ref={innerRef}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...props}
    >
      {countryOptions?.map(({ value, label }, index) => (
        <option key={index} value={value ?? ''}>
          {label}
        </option>
      ))}
    </NativeSelect>
  );
});

CountrySelect.displayName = 'CountrySelect';

export { CountrySelect };
