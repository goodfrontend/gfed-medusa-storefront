import { Suspense } from 'react';

import { Metadata } from 'next';

import { CartMismatchBanner } from '@gfed-medusa/sf-lib-common/components/cart-mismatch-banner';
import { ShippingPriceNudge } from '@gfed-medusa/sf-lib-common/components/free-shipping-price-nudge';
import {
  listCartOptions,
  retrieveCart,
} from '@gfed-medusa/sf-lib-common/lib/data/cart';
import { retrieveCustomer } from '@gfed-medusa/sf-lib-common/lib/data/customer';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import { getBaseURL } from '@gfed-medusa/sf-lib-common/lib/utils/env';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

async function LayoutPersonalization() {
  const ctx = await resolveNextContext();

  if (!ctx.cartId) {
    return null;
  }

  const [customer, cart] = await Promise.all([
    retrieveCustomer(ctx),
    retrieveCart(ctx),
  ]);

  if (!cart) {
    return null;
  }

  const shippingOptions = await listCartOptions(ctx);

  return (
    <>
      {customer && <CartMismatchBanner customer={customer} cart={cart} />}
      <ShippingPriceNudge
        variant="popup"
        cart={cart}
        shippingOptions={shippingOptions ?? []}
      />
    </>
  );
}

export default function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      {/* @ts-expect-error -- Web Component */}
      <mfe-header suppressHydrationWarning></mfe-header>
      <Suspense fallback={null}>
        <LayoutPersonalization />
      </Suspense>
      {props.children}
      {/* @ts-expect-error -- Web Component */}
      <mfe-footer suppressHydrationWarning></mfe-footer>
    </>
  );
}
