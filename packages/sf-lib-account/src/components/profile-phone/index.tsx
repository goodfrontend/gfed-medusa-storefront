'use client';

import React, { useActionState, useEffect } from 'react';

import { MedusaInput } from '@gfed-medusa/sf-lib-ui/components/medusa-input';

import { updateCustomer } from '@/lib/data/customer';
import { Customer } from '@/types/graphql';

import { AccountInfo } from '../account-info';

type MyInformationProps = {
  customer: Customer;
};

const ProfileEmail: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false);

  const updateCustomerPhone = async (
    _currentState: Record<string, unknown>,
    formData: FormData
  ) => {
    const customer = {
      phone: formData.get('phone') as string,
    };

    try {
      await updateCustomer(customer);
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.toString() };
    }
  };

  const [state, formAction] = useActionState(updateCustomerPhone, {
    error: false,
    success: false,
  });

  const clearState = () => {
    setSuccessState(false);
  };

  useEffect(() => {
    setSuccessState(state.success);
  }, [state]);

  return (
    <form action={formAction} className="w-full">
      <AccountInfo
        label="Phone"
        currentInfo={`${customer.phone}`}
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error}
        clearState={clearState}
        data-testid="account-phone-editor"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <MedusaInput
            label="Phone"
            name="phone"
            type="phone"
            autoComplete="phone"
            required
            defaultValue={customer.phone ?? ''}
            data-testid="phone-input"
          />
        </div>
      </AccountInfo>
    </form>
  );
};

export { ProfileEmail };
