import { cookies as nextCookies } from 'next/headers';

import CartTotals from '@components/cart-totals';
import Help from '@components/help';
import Items from '@components/items';
import OnboardingCta from '@components/onboarding-cta';
import OrderDetails from '@components/order-details';
import PaymentDetails from '@components/payment-details';
import ShippingDetails from '@components/shipping-details';
import { Order } from '@lib/gql/generated-types/graphql';
import { Heading } from '@medusajs/ui';

type OrderCompletedTemplateProps = {
  order: Order;
};

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies();

  const isOnboarding = cookies.get('_medusa_onboarding')?.value === 'true';

  return (
    <div className="min-h-[calc(100vh-64px)] py-6">
      <div className="content-container flex h-full w-full max-w-4xl flex-col items-center justify-center gap-y-10">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div
          className="flex h-full w-full max-w-4xl flex-col gap-4 bg-white py-10"
          data-testid="order-complete-container"
        >
          <Heading
            level="h1"
            className="text-ui-fg-base mb-4 flex flex-col gap-y-3 text-3xl"
          >
            <span>Thank you!</span>
            <span>Your order was placed successfully.</span>
          </Heading>
          <OrderDetails order={order} />
          <Heading level="h2" className="text-3xl-regular flex flex-row">
            Summary
          </Heading>
          <Items order={order} />
          <CartTotals totals={order} />
          <ShippingDetails order={order} />
          <PaymentDetails order={order} />
          <Help />
        </div>
      </div>
    </div>
  );
}
