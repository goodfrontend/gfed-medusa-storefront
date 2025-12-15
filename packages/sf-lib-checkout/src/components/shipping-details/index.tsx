import { convertToLocale } from '@gfed-medusa/sf-lib-common/lib/utils/money';
import { Divider } from '@gfed-medusa/sf-lib-ui/components/divider';
import { Heading, Text } from '@medusajs/ui';

import { Order } from '@/lib/gql/generated-types/graphql';

type ShippingDetailsProps = {
  order: Order;
};

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div>
      <Heading level="h2" className="text-3xl-regular my-6 flex flex-row">
        Delivery
      </Heading>
      <div className="flex items-start gap-x-8">
        <div
          className="flex w-1/3 flex-col"
          data-testid="shipping-address-summary"
        >
          <Text className="txt-medium-plus text-ui-fg-base mb-1">
            Shipping Address
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shippingAddress?.address1} {order.shippingAddress?.address2}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shippingAddress?.postalCode}, {order.shippingAddress?.city}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shippingAddress?.countryCode?.toUpperCase()}
          </Text>
        </div>

        <div
          className="flex w-1/3 flex-col"
          data-testid="shipping-contact-summary"
        >
          <Text className="txt-medium-plus text-ui-fg-base mb-1">Contact</Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shippingAddress?.phone}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">{order.email}</Text>
        </div>

        <div
          className="flex w-1/3 flex-col"
          data-testid="shipping-method-summary"
        >
          <Text className="txt-medium-plus text-ui-fg-base mb-1">Method</Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shippingMethods?.[0]?.name} (
            {convertToLocale({
              amount: order.shippingTotal ?? 0,
              currency_code: order.currencyCode,
            })
              .replace(/,/g, '')
              .replace(/\./g, ',')}
            )
          </Text>
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  );
};

export default ShippingDetails;
