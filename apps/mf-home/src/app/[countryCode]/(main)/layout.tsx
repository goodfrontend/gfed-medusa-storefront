import { Metadata } from 'next';

import { CartMismatchBanner } from '@gfed-medusa/sf-lib-common/components/cart-mismatch-banner';
import Footer from '@gfed-medusa/sf-lib-common/components/footer';
import { ShippingPriceNudge } from '@gfed-medusa/sf-lib-common/components/free-shipping-price-nudge';
import { Nav } from '@gfed-medusa/sf-lib-common/components/nav';
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
      <Nav />
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
      <Footer />
    </>
  );
}
