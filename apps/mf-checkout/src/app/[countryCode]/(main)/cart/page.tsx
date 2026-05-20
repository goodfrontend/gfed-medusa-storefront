import { Metadata } from 'next';

import CartTemplate from '@gfed-medusa/sf-lib-checkout/templates/cart';
import { retrieveCustomer } from '@gfed-medusa/sf-lib-common/lib/data/customer';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import { WebComponent } from '@gfed-medusa/sf-lib-common/components/web-component';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Review and manage the items in your shopping cart.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Cart() {
  const ctx = await resolveNextContext();
  const customer = await retrieveCustomer(ctx);

  return (
    <>
      <WebComponent tag="mfe-personalized-cart-page" />
      <CartTemplate customer={customer} />
    </>
  );
}