import { Metadata } from 'next';

import { AccountLayout } from '@gfed-medusa/sf-lib-account/components/account-layout';
import { CartMismatchBanner } from '@gfed-medusa/sf-lib-common/components/cart-mismatch-banner';
import { ShippingPriceNudge } from '@gfed-medusa/sf-lib-common/components/free-shipping-price-nudge';
import {
  listCartOptions,
  retrieveCart,
} from '@gfed-medusa/sf-lib-common/lib/data/cart';
import { retrieveCustomer } from '@gfed-medusa/sf-lib-common/lib/data/customer';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import { getBaseURL } from '@gfed-medusa/sf-lib-common/lib/utils/env';
import { Cart } from '@gfed-medusa/sf-lib-common/types/graphql';
import { StoreCartShippingOption } from '@medusajs/types';
import { Toaster } from '@medusajs/ui';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export default async function PageLayout({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode;
  login?: React.ReactNode;
}) {
  const ctx = await resolveNextContext();
  const customer = await retrieveCustomer(ctx);
  const cart = await retrieveCart(ctx);
  let shippingOptions: StoreCartShippingOption[] = [];

  if (cart) {
    const { shipping_options } = await listCartOptions(ctx);

    shippingOptions = shipping_options;
  }

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
          shippingOptions={shippingOptions}
        />
      )}
      <AccountLayout customer={customer}>
        {customer ? dashboard : login}
        <Toaster />
      </AccountLayout>
      {/* @ts-expect-error -- Web Component */}
      <mfe-footer suppressHydrationWarning></mfe-footer>
    </>
  );
}
