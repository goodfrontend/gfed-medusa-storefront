'use client';

import React from 'react';

import Help from '@components/help';
import Items from '@components/items';
import OrderDetails from '@components/order-details';
import OrderSummary from '@components/order-summary';
import ShippingDetails from '@components/shipping-details';
import { LocalizedClientLink } from '@gfed-medusa/sf-lib-common/components/localized-client-link';
import { Order } from '@lib/gql/generated-types/graphql';
import { XMark } from '@medusajs/icons';

type OrderDetailsTemplateProps = {
  order: Order;
};

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="flex flex-col justify-center gap-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl-semi">Order details</h1>
        <LocalizedClientLink
          href="/account/orders"
          className="text-ui-fg-subtle hover:text-ui-fg-base flex items-center gap-2"
          data-testid="back-to-overview-button"
        >
          <XMark /> Back to overview
        </LocalizedClientLink>
      </div>
      <div
        className="flex h-full w-full flex-col gap-4 bg-white"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} showStatus />
        <Items order={order} />
        <ShippingDetails order={order} />
        <OrderSummary order={order} />
        <Help />
      </div>
    </div>
  );
};

export default OrderDetailsTemplate;
