import { retrieveCart } from '@/lib/data/cart';

import { CartDropdown } from '../cart-dropdown';

async function CartButton() {
  const cart = await retrieveCart().catch(() => null);

  return <CartDropdown cart={cart} />;
}

export { CartButton };
