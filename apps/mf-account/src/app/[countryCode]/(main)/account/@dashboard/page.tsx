import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Overview } from '@gfed-medusa/sf-lib-account/components/overview';
import { listOrders } from '@gfed-medusa/sf-lib-account/lib/data/orders';
import { retrieveCustomer } from '@gfed-medusa/sf-lib-common/lib/data/customer';

export const metadata: Metadata = {
  title: 'Account',
  description: 'Overview of your account activity.',
};

export default async function OverviewTemplate() {
  const customer = await retrieveCustomer().catch(() => null);
  const orders = (await listOrders().catch(() => null)) || null;

  if (!customer) {
    notFound();
  }

  return <Overview customer={customer} orders={orders} />;
}
