import { StorefrontProvider } from '@gfed-medusa/sf-lib-common/lib/data/context';
import { useCart } from '@gfed-medusa/sf-lib-common/lib/hooks/use-cart';

import { CartDropdown } from '../header/cart-dropdown';

interface CartProps {
  cartItemCount?: number;
}

function Cart({ cartItemCount }: CartProps) {
  const { cart } = useCart();

  return (
    <StorefrontProvider>
      <CartDropdown cart={cart} initialCartItemCount={cartItemCount} />
    </StorefrontProvider>
  );
}

export { Cart };
