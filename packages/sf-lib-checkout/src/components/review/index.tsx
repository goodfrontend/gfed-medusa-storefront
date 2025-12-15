'use client';

import { useSearchParams } from 'next/navigation';

import { Heading, Text, clx } from '@medusajs/ui';

import { Cart } from '@/lib/gql/generated-types/graphql';

import PaymentButton from '../payment-button';

const Review = ({ cart }: { cart: Cart }) => {
  const searchParams = useSearchParams();

  const isOpen = searchParams.get('step') === 'review';

  const paidByGiftcard = cart?.giftCardTotal > 0 && cart?.total === 0;

  const previousStepsCompleted =
    cart?.shippingAddress &&
    (cart?.shippingMethods?.length ?? 0) > 0 &&
    (cart?.paymentCollection || paidByGiftcard);

  return (
    <div className="bg-white">
      <div className="mb-6 flex flex-row items-center justify-between">
        <Heading
          level="h2"
          className={clx(
            'text-3xl-regular flex flex-row items-baseline gap-x-2',
            {
              'pointer-events-none opacity-50 select-none': !isOpen,
            }
          )}
        >
          Review
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="mb-6 flex w-full items-start gap-x-1">
            <div className="w-full">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                By clicking the Place Order button, you confirm that you have
                read, understand and accept our Terms of Use, Terms of Sale and
                Returns Policy and acknowledge that you have read Medusa
                Store&apos;s Privacy Policy.
              </Text>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </div>
  );
};

export default Review;
