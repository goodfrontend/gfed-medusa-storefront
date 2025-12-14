import React, { useState } from 'react';

import { CountrySelect } from '@gfed-medusa/sf-lib-common/components/country-select';
import { Input } from '@gfed-medusa/sf-lib-ui/components/input';
import { Cart } from '@lib/gql/generated-types/graphql';

const BillingAddress = ({ cart }: { cart: Cart }) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    'billing_address.first_name': cart?.billingAddress?.firstName || '',
    'billing_address.last_name': cart?.billingAddress?.lastName || '',
    'billing_address.address_1': cart?.billingAddress?.address1 || '',
    'billing_address.company': cart?.billingAddress?.company || '',
    'billing_address.postal_code': cart?.billingAddress?.postalCode || '',
    'billing_address.city': cart?.billingAddress?.city || '',
    'billing_address.country_code': cart?.billingAddress?.countryCode || '',
    'billing_address.province': cart?.billingAddress?.province || '',
    'billing_address.phone': cart?.billingAddress?.phone || '',
  });

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
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First name"
          name="billing_address.first_name"
          autoComplete="given-name"
          value={formData['billing_address.first_name']}
          onChange={handleChange}
          required
          data-testid="billing-first-name-input"
        />
        <Input
          label="Last name"
          name="billing_address.last_name"
          autoComplete="family-name"
          value={formData['billing_address.last_name']}
          onChange={handleChange}
          required
          data-testid="billing-last-name-input"
        />
        <Input
          label="Address"
          name="billing_address.address_1"
          autoComplete="address-line1"
          value={formData['billing_address.address_1']}
          onChange={handleChange}
          required
          data-testid="billing-address-input"
        />
        <Input
          label="Company"
          name="billing_address.company"
          value={formData['billing_address.company']}
          onChange={handleChange}
          autoComplete="organization"
          data-testid="billing-company-input"
        />
        <Input
          label="Postal code"
          name="billing_address.postal_code"
          autoComplete="postal-code"
          value={formData['billing_address.postal_code']}
          onChange={handleChange}
          required
          data-testid="billing-postal-input"
        />
        <Input
          label="City"
          name="billing_address.city"
          autoComplete="address-level2"
          value={formData['billing_address.city']}
          onChange={handleChange}
        />
        <CountrySelect
          name="billing_address.country_code"
          autoComplete="country"
          region={cart?.region}
          value={formData['billing_address.country_code']}
          onChange={handleChange}
          required
          data-testid="billing-country-select"
        />
        <Input
          label="State / Province"
          name="billing_address.province"
          autoComplete="address-level1"
          value={formData['billing_address.province']}
          onChange={handleChange}
          data-testid="billing-province-input"
        />
        <Input
          label="Phone"
          name="billing_address.phone"
          autoComplete="tel"
          value={formData['billing_address.phone']}
          onChange={handleChange}
          data-testid="billing-phone-input"
        />
      </div>
    </>
  );
};

export default BillingAddress;
