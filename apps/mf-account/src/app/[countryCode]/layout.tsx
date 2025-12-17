import { Metadata } from 'next';

import { AccountLayout } from '@gfed-medusa/sf-lib-account/components/account-layout';
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
  const customer = await retrieveCustomer();
  const cart = await retrieveCart();
  let shippingOptions: StoreCartShippingOption[] = [];

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
      <AccountLayout customer={customer}>
        {customer ? dashboard : login}
        <Toaster />
      </AccountLayout>
      <Footer />
    </>
  );
}
