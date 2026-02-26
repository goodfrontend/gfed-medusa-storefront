import type { ShippingOptionPrice } from './graphql';

export type VariantPrice = {
  calculated_price_number: number;
  calculated_price: string;
  original_price_number: number;
  original_price: string;
  currency_code: string;
  price_type: string;
  percentage_diff: string;
};

export type StoreFreeShippingPrice = ShippingOptionPrice & {
  shipping_option_id: string;
  current_amount: number;
  target_amount: number;
  target_reached: boolean;
  target_remaining: number;
  remaining_percentage: number;
};
