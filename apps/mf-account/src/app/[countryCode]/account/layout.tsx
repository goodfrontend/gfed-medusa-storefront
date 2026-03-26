import { redirect } from 'next/navigation';

import { AccountLayout } from '@gfed-medusa/sf-lib-account/components/account-layout';
import { CartMismatchBanner } from '@gfed-medusa/sf-lib-common/components/cart-mismatch-banner';
import { ShippingPriceNudge } from '@gfed-medusa/sf-lib-common/components/free-shipping-price-nudge';
import {
  listCartOptions,
  retrieveCart,
} from '@gfed-medusa/sf-lib-common/lib/data/cart';
import { retrieveCustomer } from '@gfed-medusa/sf-lib-common/lib/data/customer';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import { Cart } from '@gfed-medusa/sf-lib-common/types/graphql';
import { Toaster } from '@medusajs/ui';

export default async function PageLayout({
  dashboard,
}: {
  dashboard?: React.ReactNode;
}) {
  const ctx = await resolveNextContext();
  const customer = await retrieveCustomer(ctx);
  const bffBaseUrl = process.env.NEXT_PUBLIC_BFF_BASE_URL ?? '';

  if (!customer) {
    redirect(`${bffBaseUrl}/auth/login`);
  }

  const cart = await retrieveCart(ctx);
  const shippingOptions = await (cart
    ? listCartOptions(ctx)
    : Promise.resolve(null));

  return (
    <>
      {/* @ts-expect-error -- Web Component */}
      <mfe-header suppressHydrationWarning></mfe-header>
      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart as Cart} />
      )}

      {cart && (
        <ShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions ?? []}
        />
      )}
      <AccountLayout bffBaseUrl={bffBaseUrl} customer={customer}>
        {dashboard}
        <Toaster />
      </AccountLayout>
      {/* @ts-expect-error -- Web Component */}
      <mfe-footer suppressHydrationWarning></mfe-footer>
    </>
  );
}
