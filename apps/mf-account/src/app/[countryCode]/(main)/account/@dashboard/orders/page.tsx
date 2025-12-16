import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { OrderOverview } from '@gfed-medusa/sf-lib-account/components/order-overview';
import { TransferRequestForm } from '@gfed-medusa/sf-lib-account/components/transfer-request-form';
import { listOrders } from '@gfed-medusa/sf-lib-account/lib/data/orders';
import { Divider } from '@gfed-medusa/sf-lib-ui/components/divider';

export const metadata: Metadata = {
  title: 'Orders',
  description: 'Overview of your previous orders.',
};

export default async function Orders() {
  const orders = await listOrders();

  if (!orders) {
    notFound();
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Orders</h1>
        <p className="text-base-regular">
          View your previous orders and their status. You can also create
          returns or exchanges for your orders if needed.
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} />
        <Divider className="my-16" />
        <TransferRequestForm />
      </div>
    </div>
  );
}
