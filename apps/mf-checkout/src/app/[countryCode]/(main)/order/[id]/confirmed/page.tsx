import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { retrieveOrder } from '@gfed-medusa/sf-lib-checkout/lib/data/orders';
import OrderCompletedTemplate from '@gfed-medusa/sf-lib-checkout/templates/order-completed-template';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';

type Props = {
  params: Promise<{ id: string }>;
};
export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'You purchase was successful',
};

export default async function OrderConfirmedPage(props: Props) {
  const params = await props.params;
  const ctx = await resolveNextContext();
  const order = await retrieveOrder(params.id, ctx).catch(() => null);

  if (!order) {
    return notFound();
  }

  return <OrderCompletedTemplate order={order} />;
}
