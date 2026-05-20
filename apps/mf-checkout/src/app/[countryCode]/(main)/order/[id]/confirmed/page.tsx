import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { retrieveOrder } from '@gfed-medusa/sf-lib-checkout/lib/data/orders';
import OrderCompletedTemplate from '@gfed-medusa/sf-lib-checkout/templates/order-completed-template';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import { retrieveCustomer } from '@gfed-medusa/sf-lib-common/lib/data/customer';
import {
  getDeviceIdFromCookieHeader,
  submitConversion,
} from '@gfed-medusa/sf-lib-common/lib/data/personalization';

type Props = {
  params: Promise<{ id: string }>;
};
export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Your purchase was successful',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function OrderConfirmedPage(props: Props) {
  const params = await props.params;
  const ctx = await resolveNextContext();
  const order = await retrieveOrder(params.id, ctx).catch(() => null);

  if (!order) {
    return notFound();
  }

  const deviceId = getDeviceIdFromCookieHeader(ctx.cookieHeader);
  if (deviceId) {
    const userId = ctx.cookieHeader?.includes('_medusa_jwt=')
      ? (await retrieveCustomer(ctx).catch(() => null))?.id
      : undefined;
    submitConversion(
      {
        deviceId,
        userId,
        orderId: order.id,
        amount: order.total,
        currency: order.currencyCode,
        items: order.items?.map((item: any) => ({
          productId: item.variant?.product_id ?? item.variant?.product?.id ?? '',
          quantity: item.quantity,
          price: item.unit_price / 100,
          category: item.variant?.product?.categories?.[0]?.handle ?? undefined,
        })),
      },
      ctx
    );
  }

  return <OrderCompletedTemplate order={order} />;
}
