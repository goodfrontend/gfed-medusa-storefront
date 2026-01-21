import { Fragment, useEffect, useMemo, useState } from 'react';

import ReactCountryFlag from 'react-country-flag';

import { useStorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import { StateType } from '@gfed-medusa/sf-lib-common/lib/hooks/use-toggle-state';
import { Region } from '@gfed-medusa/sf-lib-common/types/graphql';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';

type CountryOption = {
  country: string;
  region: string;
  label: string;
};

type CountrySelectProps = {
  toggleState: StateType;
  regions: Region[];
};

const CountrySelect = ({ toggleState, regions }: CountrySelectProps) => {
  const [current, setCurrent] = useState<
    | { country: string | undefined; region: string; label: string | undefined }
    | undefined
  >(undefined);
  const [countryCode, setCountryCode] = useState('dk');
  const ctx = useStorefrontContext();

  const { state, close } = toggleState;

  const options = useMemo(() => {
    return regions
      .map((r) => {
        return r.countries?.map((c) => ({
          country: c?.iso2 ?? undefined,
          region: r.id,
          label: c?.name ?? undefined,
        }));
      })
      .flat()
      .sort((a, b) => (a?.label ?? '').localeCompare(b?.label ?? ''));
  }, [regions]);

  useEffect(() => {
    setCountryCode(window.location.pathname.split('/')[1] || 'dk');
  }, []);

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o?.country === countryCode);
      setCurrent(option);
    }
  }, [options, countryCode]);

  const handleChange = (option: CountryOption) => {
    const currentPath =
      window.location.pathname.split(`/${countryCode}`)[1] || '';

    if (ctx.updateRegion) {
      ctx.updateRegion(option.country, currentPath);
    } else {
      // Fallback for non-provisioned environments
      window.location.href = `/${option.country}${currentPath}`;
    }
    close();
  };

  return (
    <div>
      <Listbox
        as="span"
        onChange={handleChange}
        defaultValue={
          countryCode
            ? options?.find(
                (o): o is CountryOption => o?.country === countryCode
              )
            : undefined
        }
      >
        <ListboxButton className="w-full py-1">
          <div className="txt-compact-small flex items-start gap-x-2">
            <span>Shipping to:</span>
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
          </div>
        </ListboxButton>
        <div className="relative flex w-full min-w-[320px]">
          <Transition
            show={state}
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className="text-small-regular no-scrollbar rounded-rounded xsmall:left-auto xsmall:right-0 absolute -bottom-[calc(100%-36px)] left-0 z-[900] max-h-[442px] w-full overflow-y-scroll bg-white uppercase text-black drop-shadow-md"
              static
            >
              {options?.map((o, index) => {
                return (
                  <ListboxOption
                    key={index}
                    value={o}
                    className="flex cursor-pointer items-center gap-x-2 px-3 py-2 hover:bg-gray-200"
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
      </Listbox>
    </div>
  );
};

export { CountrySelect };
