import { useCart } from '@gfed-medusa/sf-lib-common/lib/hooks/use-cart';

import { CartDropdown } from '../cart-dropdown';

function CartButton() {
  const { cart } = useCart();

  return <CartDropdown cart={cart} />;
}

export { CartButton };
