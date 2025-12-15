import Addresses from '@/components/addresses';
import Payment from '@/components/payment';
import Review from '@/components/review';
import Shipping from '@/components/shipping';
import { listCartShippingMethods } from '@/lib/data/fulfillment';
import { listCartPaymentMethods } from '@/lib/data/payment';
import { Customer } from '@/lib/gql/generated-types/graphql';
import { Cart } from '@/lib/gql/generated-types/graphql';

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: Cart;
  customer: Customer | null;
}) {
  if (!cart) {
    return null;
  }

  const shippingMethods = await listCartShippingMethods(cart.id);
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? '');

  if (!shippingMethods || !paymentMethods) {
    return null;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-y-8">
      <Addresses cart={cart} customer={customer} />
      <Shipping cart={cart} availableShippingMethods={shippingMethods} />
      <Payment cart={cart} availablePaymentMethods={paymentMethods} />
      <Review cart={cart} />
    </div>
  );
}
