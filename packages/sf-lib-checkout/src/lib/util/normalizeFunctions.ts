// to be removed once Order and Region resolvers are implemented, the normalizers will then be used within the resolvers theselves
import { Order, Region } from '@lib/gql/generated-types/graphql';
import { HttpTypes } from '@medusajs/types';

const toISO = (d: string | Date | undefined) =>
  d instanceof Date ? d.toISOString() : (d ?? '');

function normalizeLineItems(items: any[] = [], cartId?: string) {
  return items.map((item) => ({
    id: item.id,
    title: item.title ?? '',
    quantity: item.quantity ?? 0,
    requiresShipping: item.requires_shipping ?? false,
    unitPrice: item.unit_price ?? 0,
    total: item.total ?? 0,
    originalTotal: item.original_total ?? 0,
    cartId: item.cart_id ?? cartId ?? '',
    thumbnail: item.thumbnail ?? '',
    productHandle: item.variant?.product?.handle ?? '',
    productTitle: item.variant?.product?.title ?? '',
    createdAt: item.created_at ?? null,
    variant: item.variant ?? null,
  }));
}

export const normalizeRegion = (region: HttpTypes.StoreRegion): Region => ({
  id: region.id,
  name: region.name,
  currencyCode: region.currency_code,
  countries:
    region.countries?.map((c) => ({
      iso2: c.iso_2,
      name: c.name,
    })) ?? [],
  createdAt: region.created_at,
});

export function normalizeOrder(order: HttpTypes.StoreOrder): Order {
  return {
    id: order.id,
    displayId: order.display_id,
    email: order.email ?? '',
    customerId: order.customer_id ?? '',
    regionId: order.region_id ?? '',
    paymentStatus: order.payment_status ?? '',
    fulfillmentStatus: order.fulfillment_status ?? '',
    total: order.total ?? 0,
    subtotal: order.subtotal ?? 0,
    discountTotal: order.discount_total ?? 0,
    giftCardTotal: order.gift_card_total ?? 0,
    taxTotal: order.tax_total ?? 0,
    shippingTotal: order.shipping_total ?? 0,
    currencyCode: order.currency_code ?? 'usd',
    status: order.status ?? '',
    createdAt: toISO(order.created_at),
    items: normalizeLineItems(order?.items ?? []),
    shippingMethods: (order.shipping_methods ?? []).map((sm) => ({
      id: sm.id ?? '',
      name: sm.name ?? '',
      amount: sm.amount ?? 0,
      createdAt: toISO(sm.created_at),
      shippingOptionId: sm.shipping_option_id,
    })),
    shippingAddress: order.shipping_address
      ? {
          firstName: order.shipping_address.first_name,
          lastName: order.shipping_address.last_name,
          address1: order.shipping_address.address_1,
          address2: order.shipping_address.address_2,
          city: order.shipping_address.city,
          postalCode: order.shipping_address.postal_code,
          phone: order.shipping_address.phone,
        }
      : null,
  };
}

export function camelToSnakeCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(camelToSnakeCase);
  } else if (obj && typeof obj === 'object' && obj.constructor === Object) {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        const snakeKey = key
          .replace(/([A-Z])/g, '_$1') // handle camelCase letters
          .replace(/([a-z])([0-9])/g, '$1_$2') // handle letters followed by numbers
          .toLowerCase();
        acc[snakeKey] = camelToSnakeCase(value);
        return acc;
      },
      {} as Record<string, any>
    );
  }
  return obj;
}
