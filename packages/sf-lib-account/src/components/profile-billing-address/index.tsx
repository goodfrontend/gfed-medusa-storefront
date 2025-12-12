'use client';

import React, { useActionState, useEffect, useMemo } from 'react';

import { MedusaInput } from '@gfed-medusa/sf-lib-ui/components/medusa-input';
import NativeSelect from '@gfed-medusa/sf-lib-ui/components/native-select';

import { addCustomerAddress, updateCustomerAddress } from '@/lib/data/customer';
import { Customer, Region } from '@/types/graphql';

import { AccountInfo } from '../account-info';

type MyInformationProps = {
  customer: Customer;
  regions: Region[];
};

const ProfileBillingAddress: React.FC<MyInformationProps> = ({
  customer,
  regions,
}) => {
  const regionOptions = useMemo(() => {
    return (
      regions
        ?.map((region) => {
          return region.countries?.map((country) => ({
            value: country?.iso2,
            label: country?.displayName,
          }));
        })
        .flat() || []
    );
  }, [regions]);

  const [successState, setSuccessState] = React.useState(false);

  const billingAddress = customer.addresses?.find(
    (addr) => addr?.isDefaultBilling
  );

  const initialState: Record<string, any> = {
    isDefaultBilling: true,
    isDefaultShipping: false,
    error: false,
    success: false,
  };

  if (billingAddress) {
    initialState.addressId = billingAddress.id;
  }

  const [state, formAction] = useActionState(
    billingAddress ? updateCustomerAddress : addCustomerAddress,
    initialState
  );

  const clearState = () => {
    setSuccessState(false);
  };

  useEffect(() => {
    setSuccessState(state.success);
  }, [state]);

  const currentInfo = useMemo(() => {
    if (!billingAddress) {
      return 'No billing address';
    }

    const country =
      regionOptions?.find(
        (country) => country?.value === billingAddress.countryCode
      )?.label || billingAddress.countryCode?.toUpperCase();

    return (
      <div className="flex flex-col font-semibold" data-testid="current-info">
        <span>
          {billingAddress.firstName} {billingAddress.lastName}
        </span>
        <span>{billingAddress.company}</span>
        <span>
          {billingAddress.address1}
          {billingAddress.address2 ? `, ${billingAddress.address2}` : ''}
        </span>
        <span>
          {billingAddress.postalCode}, {billingAddress.city}
        </span>
        <span>{country}</span>
      </div>
    );
  }, [billingAddress, regionOptions]);

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <input type="hidden" name="addressId" value={billingAddress?.id} />
      <AccountInfo
        label="Billing address"
        currentInfo={currentInfo}
        isSuccess={successState}
        isError={!!state.error}
        clearState={clearState}
        data-testid="account-billing-address-editor"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <div className="grid grid-cols-2 gap-x-2">
            <MedusaInput
              label="First name"
              name="first_name"
              defaultValue={billingAddress?.firstName || undefined}
              required
              data-testid="billing-first-name-input"
            />
            <MedusaInput
              label="Last name"
              name="last_name"
              defaultValue={billingAddress?.lastName || undefined}
              required
              data-testid="billing-last-name-input"
            />
          </div>
          <MedusaInput
            label="Company"
            name="company"
            defaultValue={billingAddress?.company || undefined}
            data-testid="billing-company-input"
          />
          <MedusaInput
            label="Address"
            name="address_1"
            defaultValue={billingAddress?.address1 || undefined}
            required
            data-testid="billing-address-1-input"
          />
          <MedusaInput
            label="Apartment, suite, etc."
            name="address_2"
            defaultValue={billingAddress?.address2 || undefined}
            data-testid="billing-address-2-input"
          />
          <div className="grid grid-cols-[144px_1fr] gap-x-2">
            <MedusaInput
              label="Postal code"
              name="postal_code"
              defaultValue={billingAddress?.postalCode || undefined}
              required
              data-testid="billing-postcal-code-input"
            />
            <MedusaInput
              label="City"
              name="city"
              defaultValue={billingAddress?.city || undefined}
              required
              data-testid="billing-city-input"
            />
          </div>
          <MedusaInput
            label="Province"
            name="province"
            defaultValue={billingAddress?.province || undefined}
            data-testid="billing-province-input"
          />
          <NativeSelect
            name="country_code"
            defaultValue={billingAddress?.countryCode || undefined}
            required
            data-testid="billing-country-code-select"
          >
            <option value="">-</option>
            {regionOptions.map((option, i) => {
              return (
                <option key={i} value={option?.value ?? ''}>
                  {option?.label}
                </option>
              );
            })}
          </NativeSelect>
        </div>
      </AccountInfo>
    </form>
  );
};

export { ProfileBillingAddress };
