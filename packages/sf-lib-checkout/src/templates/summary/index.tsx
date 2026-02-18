'use client';

import { LocalizedClientLink } from '@gfed-medusa/sf-lib-common/components/localized-client-link';
import { useCart } from '@gfed-medusa/sf-lib-common/lib/hooks/use-cart';
import { Divider } from '@gfed-medusa/sf-lib-ui/components/divider';
import { Button, Heading } from '@medusajs/ui';

import CartTotals from '@/components/cart-totals';
import DiscountCode from '@/components/discount-code';
import { Cart } from '@/lib/gql/generated-types/graphql';

function getCheckoutStep(cart: Cart) {
  if (!cart?.shippingAddress?.address1 || !cart.email) {
    return 'address';
  } else if (cart?.shippingMethods?.length === 0) {
    return 'delivery';
  } else {
    return 'payment';
  }
}

const Summary = () => {
  const { cart } = useCart();

  if (!cart) {
    return null;
  }

  const step = getCheckoutStep(cart);

  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        Summary
      </Heading>
      <DiscountCode />
      <Divider />
      <CartTotals />
      <LocalizedClientLink
        href={'/checkout?step=' + step}
        data-testid="checkout-button"
      >
        <Button className="h-10 w-full">Go to checkout</Button>
      </LocalizedClientLink>
    </div>
  );
};

export default Summary;
