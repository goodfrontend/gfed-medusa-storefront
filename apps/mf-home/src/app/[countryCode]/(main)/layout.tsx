import { CartMismatchBanner } from '@gfed-medusa/sf-lib-common/components/cart-mismatch-banner';
import { ShippingPriceNudge } from '@gfed-medusa/sf-lib-common/components/free-shipping-price-nudge';
import { WebComponent } from '@gfed-medusa/sf-lib-common/components/web-component';
import {
  listCartOptions,
  retrieveCart,
} from '@gfed-medusa/sf-lib-common/lib/data/cart';
import { retrieveCustomer } from '@gfed-medusa/sf-lib-common/lib/data/customer';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import { Cart } from '@gfed-medusa/sf-lib-common/types/graphql';

export default async function PageLayout(props: { children: React.ReactNode }) {
  const ctx = await resolveNextContext();
  const customer = await retrieveCustomer(ctx);
  const cart = await retrieveCart(ctx);
  let shippingOptions = await (cart
    ? listCartOptions(ctx)
    : Promise.resolve(null));

  return (
    <>
      <WebComponent tag="mfe-header">
        <WebComponent tag="mfe-cart" slot="cart" />
      </WebComponent>
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
      {props.children}
      <WebComponent tag="mfe-footer" />
    </>
  );
}
