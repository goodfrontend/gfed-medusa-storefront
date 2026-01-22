import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { OrderDetailsTemplate } from '@gfed-medusa/sf-lib-checkout/templates';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import { retrieveOrder } from '@gfed-medusa/sf-lib-common/lib/data/orders';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const ctx = await resolveNextContext();
  const order = await retrieveOrder(params.id, ctx).catch(() => null);

  if (!order) {
    notFound();
  }

  return {
    title: `Order #${order.displayId}`,
    description: `View your order`,
  };
}

export default async function OrderDetailPage(props: Props) {
  const params = await props.params;
  const ctx = await resolveNextContext();
  const order = await retrieveOrder(params.id, ctx).catch(() => null);

  if (!order) {
    notFound();
  }

  return <OrderDetailsTemplate order={order} />;
}
