import type { Product } from '@/types/graphql';
import type { SortOptions } from '@/types';

/**
 * Helper function to sort products by price until the store API supports sorting by price
 * @param products
 * @param sortBy
 * @returns products sorted by price
 */
export function sortProducts(
  products: Product[],
  sortBy: SortOptions
): Product[] {
  if (['price_asc', 'price_desc'].includes(sortBy)) {
    const productPrices = new Map<Product, number>();

    products.forEach((product) => {
      if (product.variants && product.variants.length > 0) {
        const minPrice = Math.min(
          ...product.variants.map((variant) => variant?.price?.amount || 0)
        );
        productPrices.set(product, minPrice);
      } else {
        productPrices.set(product, Infinity);
      }
    });

    // Sort products based on the precomputed minimum prices
    return [...products].sort((a, b) => {
      const priceA = productPrices.get(a) || 0;
      const priceB = productPrices.get(b) || 0;
      const diff = priceA - priceB;
      return sortBy === 'price_asc' ? diff : -diff;
    });
  }

  if (sortBy === 'created_at') {
    return [...products].sort((a, b) => {
      return (
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
    });
  }

  return products;
}
