'use client';

import { useActionState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ErrorMessage } from '@gfed-medusa/sf-lib-common/components/error-message';
import { SubmitButton } from '@gfed-medusa/sf-lib-common/components/submit-button';
import { Divider } from '@gfed-medusa/sf-lib-ui/components/divider';
import { Spinner } from '@gfed-medusa/sf-lib-ui/icons/spinner';
import { CheckCircleSolid } from '@medusajs/icons';
import { Heading, Text, useToggleState } from '@medusajs/ui';

import { setAddresses } from '@/lib/data/cart';
import { Customer } from '@/lib/gql/generated-types/graphql';
import { Cart } from '@/lib/gql/generated-types/graphql';
import compareAddresses from '@/lib/util/compare-addresses';

import BillingAddress from '../billing_address';
import ShippingAddress from '../shipping-address';

const Addresses = ({
  cart,
  customer,
}: {
  cart: Cart;
  customer: Customer | null;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get('step') === 'address';

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shippingAddress && cart?.billingAddress
      ? compareAddresses(cart?.shippingAddress, cart?.billingAddress)
      : true
  );

  const handleEdit = () => {
    router.push(pathname + '?step=address');
  };

  const [message, formAction] = useActionState(setAddresses, null);

  return (
    <div className="bg-white">
      <div className="mb-6 flex flex-row items-center justify-between">
        <Heading
          level="h2"
          className="text-3xl-regular flex flex-row items-baseline gap-x-2"
        >
          Shipping Address
          {!isOpen && <CheckCircleSolid />}
        </Heading>
        {!isOpen && cart?.shippingAddress && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
              data-testid="edit-address-button"
            >
              Edit
            </button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <Heading
                  level="h2"
                  className="text-3xl-regular gap-x-4 pt-8 pb-6"
                >
                  Billing address
                </Heading>

                <BillingAddress cart={cart} />
              </div>
            )}
            <SubmitButton className="mt-6" data-testid="submit-address-button">
              Continue to delivery
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && cart.shippingAddress ? (
              <div className="flex items-start gap-x-8">
                <div className="flex w-full items-start gap-x-1">
                  <div
                    className="flex w-1/3 flex-col"
                    data-testid="shipping-address-summary"
                  >
                    <Text className="txt-medium-plus text-ui-fg-base mb-1">
                      Shipping Address
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shippingAddress.firstName}{' '}
                      {cart.shippingAddress.lastName}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shippingAddress.address1}{' '}
                      {cart.shippingAddress.address2}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shippingAddress.postalCode},{' '}
                      {cart.shippingAddress.city}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shippingAddress.countryCode?.toUpperCase()}
                    </Text>
                  </div>

                  <div
                    className="flex w-1/3 flex-col"
                    data-testid="shipping-contact-summary"
                  >
                    <Text className="txt-medium-plus text-ui-fg-base mb-1">
                      Contact
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shippingAddress.phone}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.email}
                    </Text>
                  </div>

                  <div
                    className="flex w-1/3 flex-col"
                    data-testid="billing-address-summary"
                  >
                    <Text className="txt-medium-plus text-ui-fg-base mb-1">
                      Billing Address
                    </Text>

                    {sameAsBilling ? (
                      <Text className="txt-medium text-ui-fg-subtle">
                        Billing- and delivery address are the same.
                      </Text>
                    ) : (
                      <>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billingAddress?.firstName}{' '}
                          {cart.billingAddress?.lastName}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billingAddress?.address1}{' '}
                          {cart.billingAddress?.address2}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billingAddress?.postalCode},{' '}
                          {cart.billingAddress?.city}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billingAddress?.countryCode?.toUpperCase()}
                        </Text>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  );
};

export default Addresses;
