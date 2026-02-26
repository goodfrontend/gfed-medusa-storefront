import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Overview } from '@gfed-medusa/sf-lib-account/components/overview';
import { listOrders } from '@gfed-medusa/sf-lib-account/lib/data/orders';
import { retrieveCustomer } from '@gfed-medusa/sf-lib-common/lib/data/customer';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';

export const metadata: Metadata = {
  title: 'Account',
  description: 'Overview of your account activity.',
};

export default async function OverviewTemplate() {
  const ctx = await resolveNextContext();
  const customer = await retrieveCustomer(ctx);
  const orders =
    (await listOrders(ctx, 10, 0).catch(() => null)) || null;

  if (!customer) {
    notFound();
  }

  return <Overview customer={customer} orders={orders} />;
}
