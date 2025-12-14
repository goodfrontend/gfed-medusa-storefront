import { convertToLocale } from '@gfed-medusa/sf-lib-common/lib/utils/money';
import { Order } from '@lib/gql/generated-types/graphql';

type OrderSummaryProps = {
  order: Order;
};

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return;
    }

    return convertToLocale({
      amount,
      currency_code: order.currencyCode,
    });
  };

  return (
    <div>
      <h2 className="text-base-semi">Order Summary</h2>
      <div className="text-small-regular text-ui-fg-base my-2">
        <div className="text-base-regular text-ui-fg-base mb-2 flex items-center justify-between">
          <span>Subtotal</span>
          <span>{getAmount(order.subtotal)}</span>
        </div>
        <div className="flex flex-col gap-y-1">
          {order.discountTotal && order.discountTotal > 0 && (
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>- {getAmount(order.discountTotal)}</span>
            </div>
          )}
          {order.giftCardTotal && order.giftCardTotal > 0 && (
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>- {getAmount(order.giftCardTotal)}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>{getAmount(order.shippingTotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Taxes</span>
            <span>{getAmount(order.taxTotal)}</span>
          </div>
        </div>
        <div className="my-4 h-px w-full border-b border-dashed border-gray-200" />
        <div className="text-base-regular text-ui-fg-base mb-2 flex items-center justify-between">
          <span>Total</span>
          <span>{getAmount(order.total)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
