import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { retrieveOrder } from '@gfed-medusa/sf-lib-checkout/lib/data/orders';
import OrderCompletedTemplate from '@gfed-medusa/sf-lib-checkout/templates/order-completed-template';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
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
    const converted = await submitConversion(
      {
        deviceId,
        orderId: order.id,
        amount: order.total,
        currency: order.currencyCode,
        items: order.items?.map((item: any) => ({
          productId: item.variant?.product?.id ?? '',
          variantId: item.variant?.id,
          quantity: item.quantity,
          price: item.unitPrice ?? 0,
          category: item.variant?.product?.categories?.[0]?.handle ?? undefined,
        })),
      },
      ctx
    );
    if (!converted) {
      console.error('[OrderConfirmed] submitConversion failed for order:', order.id);
    }
  }

  return <OrderCompletedTemplate order={order} />;
}
