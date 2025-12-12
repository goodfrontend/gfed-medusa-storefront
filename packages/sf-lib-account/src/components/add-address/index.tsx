'use client';

import { useActionState, useEffect, useState } from 'react';

import { CountrySelect } from '@gfed-medusa/sf-lib-common/components/country-select';
import { Modal } from '@gfed-medusa/sf-lib-common/components/modal';
import { SubmitButton } from '@gfed-medusa/sf-lib-common/components/submit-button';
import useToggleState from '@gfed-medusa/sf-lib-common/lib/hooks/use-toggle-state';
import { MedusaInput } from '@gfed-medusa/sf-lib-ui/components/medusa-input';
import { Plus } from '@medusajs/icons';
import { Button, Heading } from '@medusajs/ui';

import { addCustomerAddress } from '@/lib/data/customer';
import { CustomerAddress, Maybe, Region } from '@/types/graphql';

const AddAddress = ({
  region,
  addresses,
}: {
  region: Region;
  addresses?: Maybe<Maybe<CustomerAddress>[]> | null;
}) => {
  const [successState, setSuccessState] = useState(false);
  const { state, open, close: closeModal } = useToggleState(false);

  const [formState, formAction] = useActionState(addCustomerAddress, {
    isDefaultShipping: addresses?.length === 0,
    success: false,
    error: null,
  });

  const close = () => {
    setSuccessState(false);
    closeModal();
  };

  useEffect(() => {
    if (successState) {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState]);

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true);
    }
  }, [formState]);

  return (
    <>
      <button
        className="rounded-rounded border-ui-border-base flex h-full min-h-[220px] w-full flex-col justify-between border p-5"
        onClick={open}
        data-testid="add-address-button"
      >
        <span className="text-base-semi">New address</span>
        <Plus />
      </button>

      <Modal isOpen={state} close={close} data-testid="add-address-modal">
        <Modal.Title>
          <Heading className="mb-2">Add address</Heading>
        </Modal.Title>
        <form action={formAction}>
          <Modal.Body>
            <div className="flex flex-col gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <MedusaInput
                  label="First name"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  data-testid="first-name-input"
                />
                <MedusaInput
                  label="Last name"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  data-testid="last-name-input"
                />
              </div>
              <MedusaInput
                label="Company"
                name="company"
                autoComplete="organization"
                data-testid="company-input"
              />
              <MedusaInput
                label="Address"
                name="address_1"
                required
                autoComplete="address-line1"
                data-testid="address-1-input"
              />
              <MedusaInput
                label="Apartment, suite, etc."
                name="address_2"
                autoComplete="address-line2"
                data-testid="address-2-input"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <MedusaInput
                  label="Postal code"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  data-testid="postal-code-input"
                />
                <MedusaInput
                  label="City"
                  name="city"
                  required
                  autoComplete="locality"
                  data-testid="city-input"
                />
              </div>
              <MedusaInput
                label="Province / State"
                name="province"
                autoComplete="address-level1"
                data-testid="state-input"
              />
              <CountrySelect
                region={region}
                name="country_code"
                required
                autoComplete="country"
                data-testid="country-select"
              />
              <MedusaInput
                label="Phone"
                name="phone"
                autoComplete="phone"
                data-testid="phone-input"
              />
            </div>
            {formState.error && (
              <div
                className="text-small-regular py-2 text-rose-500"
                data-testid="address-error"
              >
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="mt-6 flex gap-3">
              <Button
                type="reset"
                variant="secondary"
                onClick={close}
                className="h-10"
                data-testid="cancel-button"
              >
                Cancel
              </Button>
              <SubmitButton data-testid="save-button">Save</SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export { AddAddress };
