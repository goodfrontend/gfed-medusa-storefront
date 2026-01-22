import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { retrieveCart } from '@gfed-medusa/sf-lib-checkout/lib/data/cart';
import type { Cart } from '@gfed-medusa/sf-lib-checkout/lib/gql/generated-types/graphql';
import CartTemplate from '@gfed-medusa/sf-lib-checkout/templates/cart';
import { retrieveCustomer } from '@gfed-medusa/sf-lib-common/lib/data/customer';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'View your cart',
};

export default async function Cart() {
  const cart = await retrieveCart().catch((error) => {
    console.error(error);
    return notFound();
  });

  const customer = await retrieveCustomer(await resolveNextContext());

  return <CartTemplate cart={cart} customer={customer} />;
}
