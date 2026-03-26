import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PaymentWrapper from '@gfed-medusa/sf-lib-checkout/components/payment-wrapper';
import { retrieveCart } from '@gfed-medusa/sf-lib-checkout/lib/data/cart';
import CheckoutForm from '@gfed-medusa/sf-lib-checkout/templates/checkout-form';
import CheckoutSummary from '@gfed-medusa/sf-lib-checkout/templates/checkout-summary';
import { retrieveCustomer } from '@gfed-medusa/sf-lib-common/lib/data/customer';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your purchase securely.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Checkout() {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY;

  if (!stripeKey) {
    console.warn(
      '[checkout] NEXT_PUBLIC_STRIPE_KEY is missing. Stripe credit card input will not be available.'
    );
  }

  const ctx = await resolveNextContext();
  const cart = await retrieveCart(undefined, ctx);

  if (!cart) {
    return notFound();
  }

  const customer = await retrieveCustomer(ctx);

  return (
    <div className="content-container small:grid-cols-[1fr_416px] grid grid-cols-1 gap-x-40 py-12">
      <PaymentWrapper stripeKey={stripeKey}>
        <CheckoutForm cart={cart} customer={customer} />
      </PaymentWrapper>
      <CheckoutSummary cart={cart} />
    </div>
  );
}
