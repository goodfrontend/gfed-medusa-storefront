import type { ProductActionsProduct } from '@/types';

export const isSimpleProduct = (
  product: Pick<ProductActionsProduct, 'options'>
): boolean => {
  return (
    product.options?.length === 1 && product.options[0]?.values?.length === 1
  );
};
