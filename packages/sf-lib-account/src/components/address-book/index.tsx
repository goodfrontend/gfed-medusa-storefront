import React from 'react';

import { Customer, Region } from '@/types/graphql';

import { AddAddress } from '../add-address';
import { EditAddress } from '../edit-address-modal';

type AddressBookProps = {
  customer: Customer;
  region: Region;
};

const AddressBook: React.FC<AddressBookProps> = ({ customer, region }) => {
  const { addresses } = customer;
  return (
    <div className="w-full">
      <div className="mt-4 grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
        <AddAddress region={region} addresses={addresses} />
        {addresses?.map((address) => {
          return (
            <EditAddress region={region} address={address} key={address?.id} />
          );
        })}
      </div>
    </div>
  );
};

export { AddressBook };
