import { Metadata } from 'next';

import { CartMismatchBanner } from '@gfed-medusa/sf-lib-common/components/cart-mismatch-banner';
import { ShippingPriceNudge } from '@gfed-medusa/sf-lib-common/components/free-shipping-price-nudge';
import {
  listCartOptions,
  retrieveCart,
} from '@gfed-medusa/sf-lib-common/lib/data/cart';
import { retrieveCustomer } from '@gfed-medusa/sf-lib-common/lib/data/customer';
import { getBaseURL } from '@gfed-medusa/sf-lib-common/lib/utils/env';
import { Cart } from '@gfed-medusa/sf-lib-common/types/graphql';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export default async function PageLayout(props: { children: React.ReactNode }) {
  const customer = await retrieveCustomer();
  const cart = await retrieveCart();
  let shippingOptions: Awaited<
    ReturnType<typeof listCartOptions>
  >['shipping_options'] = [];

  if (cart) {
    const { shipping_options } = await listCartOptions();

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
      {props.children}
      {/* @ts-expect-error -- Web Component */}
      <mfe-footer suppressHydrationWarning></mfe-footer>
    </>
  );
}
