import { Fragment, useMemo } from 'react';

import { Radio } from '@gfed-medusa/sf-lib-ui/components/radio';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDown } from '@medusajs/icons';
import { HttpTypes } from '@medusajs/types';
import { clx } from '@medusajs/ui';

import {
  Address,
  CustomerAddress,
  Maybe,
} from '@/lib/gql/generated-types/graphql';
import compareAddresses from '@/lib/util/compare-addresses';

type AddressSelectProps = {
  addresses?: Maybe<Maybe<CustomerAddress>[]>;
  addressInput: Address | null;
  onSelect: (
    address: HttpTypes.StoreCartAddress | undefined,
    email?: string
  ) => void;
};

const AddressSelect = ({
  addresses,
  addressInput,
  onSelect,
}: AddressSelectProps) => {
  const handleSelect = (id: string) => {
    const savedAddress = addresses?.find((a) => a?.id === id);
    if (savedAddress) {
      onSelect(savedAddress as HttpTypes.StoreCartAddress);
    }
  };

  const selectedAddress = useMemo(() => {
    return addresses?.find((a) => compareAddresses(a, addressInput));
  }, [addresses, addressInput]);

  return (
    <Listbox onChange={handleSelect} value={selectedAddress?.id}>
      <div className="relative">
        <Listbox.Button
          className="text-base-regular rounded-rounded relative flex w-full cursor-default items-center justify-between border bg-white px-4 py-[10px] text-left focus:outline-none focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300"
          data-testid="shipping-address-select"
        >
          {({ open }) => (
            <>
              <span className="block truncate">
                {selectedAddress
                  ? selectedAddress.address1
                  : 'Choose an address'}
              </span>
              <ChevronUpDown
                className={clx('transition-rotate duration-200', {
                  'rotate-180 transform': open,
                })}
              />
            </>
          )}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="text-small-regular border-top-0 absolute z-20 max-h-60 w-full overflow-auto border bg-white focus:outline-none sm:text-sm"
            data-testid="shipping-address-options"
          >
            {addresses?.map((address) => {
              return (
                <Listbox.Option
                  key={address?.id}
                  value={address?.id}
                  className="relative cursor-default select-none py-4 pl-6 pr-10 hover:bg-gray-50"
                  data-testid="shipping-address-option"
                >
                  <div className="flex items-start gap-x-4">
                    <Radio
                      checked={selectedAddress?.id === address?.id}
                      data-testid="shipping-address-radio"
                    />
                    <div className="flex flex-col">
                      <span className="text-base-semi text-left">
                        {address?.firstName} {address?.lastName}
                      </span>
                      {address?.company && (
                        <span className="text-small-regular text-ui-fg-base">
                          {address.company}
                        </span>
                      )}
                      <div className="text-base-regular mt-2 flex flex-col text-left">
                        <span>
                          {address?.address1}
                          {address?.address2 && (
                            <span>, {address.address2}</span>
                          )}
                        </span>
                        <span>
                          {address?.postalCode}, {address?.city}
                        </span>
                        <span>
                          {address?.province && `${address.province}, `}
                          {address?.countryCode?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default AddressSelect;
