import React, { useEffect, useMemo, useState } from 'react';

import { mapKeys } from 'lodash';

import { CountrySelect } from '@gfed-medusa/sf-lib-common/components/country-select';
import { CheckboxWithLabel as Checkbox } from '@gfed-medusa/sf-lib-ui/components/checkbox';
import { Input } from '@gfed-medusa/sf-lib-ui/components/input';
import { Address, Cart, Customer } from '@lib/gql/generated-types/graphql';
import { Container } from '@medusajs/ui';

import AddressSelect from '../address-select';

const ShippingAddress = ({
  customer,
  cart,
  checked,
  onChange,
}: {
  customer: Customer | null;
  cart: Cart;
  checked: boolean;
  onChange: () => void;
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    'shippingAddress.firstName': cart?.shippingAddress?.firstName || '',
    'shippingAddress.lastName': cart?.shippingAddress?.lastName || '',
    'shippingAddress.address1': cart?.shippingAddress?.address1 || '',
    'shippingAddress.company': cart?.shippingAddress?.company || '',
    'shippingAddress.postalCode': cart?.shippingAddress?.postalCode || '',
    'shippingAddress.city': cart?.shippingAddress?.city || '',
    'shippingAddress.countryCode': cart?.shippingAddress?.countryCode || '',
    'shippingAddress.province': cart?.shippingAddress?.province || '',
    'shippingAddress.phone': cart?.shippingAddress?.phone || '',
    email: cart?.email || '',
  });

  const countriesInRegion = useMemo(
    () => cart?.region?.countries?.map((c) => c?.iso2),
    [cart?.region]
  );

  // check if customer has saved addresses that are in the current region
  const addressesInRegion = useMemo(
    () =>
      customer?.addresses?.filter(
        (a) => a?.countryCode && countriesInRegion?.includes(a.countryCode)
      ),
    [customer?.addresses, countriesInRegion]
  );

  const setFormAddress = (address?: Address, email?: string | null) => {
    if (address) {
      setFormData((prevState: Record<string, unknown>) => ({
        ...prevState,
        'shippingAddress.firstName': address.firstName || '',
        'shippingAddress.lastName': address.lastName || '',
        'shippingAddress.address1': address.address1 || '',
        'shippingAddress.company': address.company || '',
        'shippingAddress.postalCode': address.postalCode || '',
        'shippingAddress.city': address.city || '',
        'shippingAddress.countryCode': address.countryCode || '',
        'shippingAddress.province': address.province || '',
        'shippingAddress.phone': address.phone || '',
      }));
    }

    if (email) {
      setFormData((prevState: Record<string, unknown>) => ({
        ...prevState,
        email,
      }));
    }
  };

  useEffect(() => {
    // Ensure cart is not null and has a shipping_address before setting form data
    if (cart && cart.shippingAddress) {
      setFormAddress(cart?.shippingAddress, cart?.email);
    }

    if (cart && !cart.email && customer?.email) {
      setFormAddress(undefined, customer.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]); // Add cart as a dependency

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {customer && (addressesInRegion?.length || 0) > 0 && (
        <Container className="mb-6 flex flex-col gap-y-4 p-5">
          <p className="text-small-regular">
            {`Hi ${customer.firstName}, do you want to use one of your saved addresses?`}
          </p>
          <AddressSelect
            addresses={customer.addresses}
            addressInput={
              mapKeys(formData, (_, key) =>
                key.replace('shippingAddress.', '')
              ) as Address
            }
            onSelect={setFormAddress}
          />
        </Container>
      )}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First name"
          name="shippingAddress.firstName"
          autoComplete="given-name"
          value={formData['shippingAddress.firstName']}
          onChange={handleChange}
          required
          data-testid="shipping-first-name-input"
        />
        <Input
          label="Last name"
          name="shippingAddress.lastName"
          autoComplete="family-name"
          value={formData['shippingAddress.lastName']}
          onChange={handleChange}
          required
          data-testid="shipping-last-name-input"
        />
        <Input
          label="Address"
          name="shippingAddress.address1"
          autoComplete="address-line1"
          value={formData['shippingAddress.address1']}
          onChange={handleChange}
          required
          data-testid="shipping-address-input"
        />
        <Input
          label="Company"
          name="shippingAddress.company"
          value={formData['shippingAddress.company']}
          onChange={handleChange}
          autoComplete="organization"
          data-testid="shipping-company-input"
        />
        <Input
          label="Postal code"
          name="shippingAddress.postalCode"
          autoComplete="postal-code"
          value={formData['shippingAddress.postalCode']}
          onChange={handleChange}
          required
          data-testid="shipping-postal-code-input"
        />
        <Input
          label="City"
          name="shippingAddress.city"
          autoComplete="address-level2"
          value={formData['shippingAddress.city']}
          onChange={handleChange}
          required
          data-testid="shipping-city-input"
        />
        <CountrySelect
          name="shippingAddress.countryCode"
          autoComplete="country"
          region={cart?.region}
          value={formData['shippingAddress.countryCode']}
          onChange={handleChange}
          required
          data-testid="shipping-country-select"
        />
        <Input
          label="State / Province"
          name="shippingAddress.province"
          autoComplete="address-level1"
          value={formData['shippingAddress.province']}
          onChange={handleChange}
          data-testid="shipping-province-input"
        />
      </div>
      <div className="my-8">
        <Checkbox
          label="Billing address same as shipping address"
          name="same-as-billing"
          checked={checked}
          onChange={onChange}
          data-testid="billing-address-checkbox"
        />
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <Input
          label="Email"
          name="email"
          type="email"
          title="Enter a valid email address."
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
          data-testid="shipping-email-input"
        />
        <Input
          label="Phone"
          name="shippingAddress.phone"
          autoComplete="tel"
          value={formData['shippingAddress.phone']}
          onChange={handleChange}
          data-testid="shipping-phone-input"
        />
      </div>
    </>
  );
};

export default ShippingAddress;
