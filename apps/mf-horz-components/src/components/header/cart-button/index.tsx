import { useCart } from '@gfed-medusa/sf-lib-common/lib/hooks/use-cart';

import { CartDropdown } from '../cart-dropdown';

interface CartButtonProps {
  initialCartItemCount?: number;
}

function CartButton({ initialCartItemCount }: CartButtonProps) {
  const { cart } = useCart();

  return (
    <CartDropdown cart={cart} initialCartItemCount={initialCartItemCount} />
  );
}

export { CartButton };
