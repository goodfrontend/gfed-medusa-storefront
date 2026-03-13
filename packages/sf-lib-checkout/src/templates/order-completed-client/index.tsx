'use client';

import { useEffect } from 'react';

import { Heading } from '@medusajs/ui';

import CartTotals from '@/components/cart-totals';
import Help from '@/components/help';
import Items from '@/components/items';
import OnboardingCta from '@/components/onboarding-cta';
import OrderDetails from '@/components/order-details';
import PaymentDetails from '@/components/payment-details';
import ShippingDetails from '@/components/shipping-details';
import { Order } from '@/lib/gql/generated-types/graphql';

const clearCartCookie = async () => {
  await fetch('/api/checkout/clear-cart', {
    method: 'POST',
    credentials: 'include',
  });
};

export default function OrderCompletedClient({
  order,
  isOnboarding,
}: {
  order: Order;
  isOnboarding: boolean;
}) {
  useEffect(() => {
    void clearCartCookie();
  }, []);

  return (
    <>
      {isOnboarding && <OnboardingCta orderId={order.id} />}
      <Heading level="h1">Thank you!</Heading>
      <OrderDetails order={order} />
      <Items order={order} />
      <CartTotals totals={order} />
      <ShippingDetails order={order} />
      <PaymentDetails order={order} />
      <Help />
    </>
  );
}
