'use client';

import React from 'react';

import { convertToLocale } from '@gfed-medusa/sf-lib-common/lib/utils/money';

type CartTotalsProps = {
  totals: {
    total?: number | null;
    subtotal?: number | null;
    taxTotal?: number | null;
    shippingTotal?: number | null;
    discountTotal?: number | null;
    giftCardTotal?: number | null;
    currencyCode: string;
  };
};

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currencyCode,
    total,
    subtotal,
    taxTotal,
    discountTotal,
    giftCardTotal,
    shippingTotal,
  } = totals;

  const shipping_excluded = (subtotal ?? 0) - (shippingTotal ?? 0);

  return (
    <div>
      <div className="txt-medium text-ui-fg-subtle flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-1">
            Subtotal (excl. shipping and taxes)
          </span>
          <span data-testid="cart-subtotal" data-value={shipping_excluded}>
            {convertToLocale({
              amount: shipping_excluded,
              currency_code: currencyCode,
            })}
          </span>
        </div>
        {!!discountTotal && (
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-discount"
              data-value={discountTotal || 0}
            >
              -{' '}
              {convertToLocale({
                amount: discountTotal ?? 0,
                currency_code: currencyCode,
              })}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span data-testid="cart-shipping" data-value={shippingTotal || 0}>
            {convertToLocale({
              amount: shippingTotal ?? 0,
              currency_code: currencyCode,
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center gap-x-1">Taxes</span>
          <span data-testid="cart-taxes" data-value={taxTotal || 0}>
            {convertToLocale({
              amount: taxTotal ?? 0,
              currency_code: currencyCode,
            })}
          </span>
        </div>
        {!!giftCardTotal && (
          <div className="flex items-center justify-between">
            <span>Gift card</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-gift-card-amount"
              data-value={giftCardTotal || 0}
            >
              -{' '}
              {convertToLocale({
                amount: giftCardTotal ?? 0,
                currency_code: currencyCode,
              })}
            </span>
          </div>
        )}
      </div>
      <div className="my-4 h-px w-full border-b border-gray-200" />
      <div className="txt-medium text-ui-fg-base mb-2 flex items-center justify-between">
        <span>Total</span>
        <span
          className="txt-xlarge-plus"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code: currencyCode })}
        </span>
      </div>
      <div className="mt-4 h-px w-full border-b border-gray-200" />
    </div>
  );
};

export default CartTotals;
