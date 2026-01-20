import { useEffect, useState } from 'react';

import { retrieveCart } from '@gfed-medusa/sf-lib-common/lib/data/cart';
import { useStorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import { Cart } from '@gfed-medusa/sf-lib-common/types/graphql';

import { CartDropdown } from '../cart-dropdown';

function CartButton() {
  const ctx = useStorefrontContext();
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    retrieveCart(ctx)
      .then(setCart)
      .catch(() => setCart(null));
  }, [ctx]);

  return <CartDropdown cart={cart} />;
}

export { CartButton };
