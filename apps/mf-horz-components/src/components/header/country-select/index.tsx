import { Fragment, KeyboardEvent, useEffect, useMemo, useState } from 'react';

import ReactCountryFlag from 'react-country-flag';

import {
  useStorefrontActions,
  useStorefrontContext,
} from '@gfed-medusa/sf-lib-common/lib/data/context';
import { Region } from '@gfed-medusa/sf-lib-common/types/graphql';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { ArrowRightMini } from '@medusajs/icons';
import { clx } from '@medusajs/ui';

type CountryOption = {
  country: string;
  region: string;
  label: string;
};

type RegionCountry = NonNullable<Region['countries']>[number];

type CountrySelectProps = {
  regions: Region[];
};

const CountrySelect = ({ regions }: CountrySelectProps) => {
  const [current, setCurrent] = useState<CountryOption | undefined>(undefined);
  const [countryCode, setCountryCode] = useState('dk');
  const ctx = useStorefrontContext();
  const actions = useStorefrontActions(ctx);

  const options = useMemo(() => {
    return regions
      .map((r) => {
        const countryOptions: Array<CountryOption | undefined> =
          r.countries?.map((c: RegionCountry) => {
            if (!c?.iso2 || !c.name) {
              return undefined;
            }

            return {
              country: c.iso2,
              region: r.id,
              label: c.name,
            };
          }) ?? [];

        return (
          countryOptions.filter(
            (option): option is CountryOption => option !== undefined
          ) ?? []
        );
      })
      .flat()
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [regions]);

  useEffect(() => {
    setCountryCode(window.location.pathname.split('/')[1] || 'dk');
  }, []);

  useEffect(() => {
    if (countryCode) {
      const option = options.find((o) => o.country === countryCode);
      setCurrent(option);
    }
  }, [options, countryCode]);

  const handleChange = (option: CountryOption) => {
    if (option.country === countryCode) {
      return;
    }

    const currentPath =
      window.location.pathname.split(`/${countryCode}`)[1] || '';

    actions.updateRegion(option.country, currentPath);
  };

  const handleButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    event.currentTarget.click();
  };

  return (
    <div>
      <Listbox as="span" onChange={handleChange} value={current}>
        {({ open }) => (
          <>
            <div className="flex items-center gap-x-2 py-1">
              <span className="txt-compact-small shrink-0">Shipping to:</span>
              <ListboxButton
                onKeyDown={handleButtonKeyDown}
                className="group flex min-w-0 flex-1 items-center justify-between gap-x-3 text-left focus:outline-none"
              >
                <span className="min-w-0 rounded-sm group-focus-visible:ring-2 group-focus-visible:ring-white group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-black/40">
                  {current && (
                    <span className="txt-compact-small flex items-center gap-x-2">
                      <ReactCountryFlag
                        svg
                        style={{
                          width: '16px',
                          height: '16px',
                        }}
                        countryCode={current.country ?? ''}
                      />
                      {current.label}
                    </span>
                  )}
                </span>
                <ArrowRightMini
                  className={clx(
                    'shrink-0 transition-transform duration-150',
                    open ? '-rotate-90' : ''
                  )}
                />
              </ListboxButton>
            </div>
            <div className="xsmall:min-w-[320px] relative flex w-full min-w-0 max-w-full">
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions className="text-small-regular no-scrollbar rounded-rounded xsmall:left-auto xsmall:right-0 xsmall:min-w-[320px] absolute -bottom-[calc(100%-36px)] left-0 z-[900] max-h-[min(442px,calc(100vh-8rem))] w-full min-w-0 max-w-full overflow-y-auto border border-gray-200 bg-white uppercase text-black drop-shadow-md">
                  {options?.map((o, index) => {
                    return (
                      <ListboxOption
                        key={index}
                        value={o}
                        disabled={o?.country === countryCode}
                        className={({ disabled, focus, selected }) =>
                          clx(
                            'flex items-center gap-x-2 px-3 py-2 outline-none',
                            (focus || selected) && 'bg-gray-200',
                            selected && 'font-medium',
                            disabled ? 'cursor-default' : 'cursor-pointer'
                          )
                        }
                      >
                        <ReactCountryFlag
                          svg
                          style={{
                            width: '16px',
                            height: '16px',
                          }}
                          countryCode={o?.country ?? ''}
                        />{' '}
                        {o?.label}
                      </ListboxOption>
                    );
                  })}
                </ListboxOptions>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export { CountrySelect };
