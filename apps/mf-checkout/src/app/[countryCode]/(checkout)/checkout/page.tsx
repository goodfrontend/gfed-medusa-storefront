import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PaymentWrapper from '@gfed-medusa/sf-lib-checkout/components/payment-wrapper';
import { retrieveCart } from '@gfed-medusa/sf-lib-checkout/lib/data/cart';
import { Cart } from '@gfed-medusa/sf-lib-checkout/lib/gql/generated-types/graphql';
import CheckoutForm from '@gfed-medusa/sf-lib-checkout/templates/checkout-form';
import CheckoutSummary from '@gfed-medusa/sf-lib-checkout/templates/checkout-summary';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import { retrieveCustomer } from '@gfed-medusa/sf-lib-common/lib/data/customer';

export const metadata: Metadata = {
  title: 'Checkout',
};

export default async function Checkout() {
  const cart = await retrieveCart();

  if (!cart) {
    return notFound();
  }

  const customer = await retrieveCustomer(await resolveNextContext());

  return (
    <div className="content-container small:grid-cols-[1fr_416px] grid grid-cols-1 gap-x-40 py-12">
      <PaymentWrapper cart={cart as Cart}>
        <CheckoutForm cart={cart as Cart} customer={customer} />
      </PaymentWrapper>
      <CheckoutSummary cart={cart as Cart} />
    </div>
  );
}
