import type { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';

export type SurfaceContext = {
  productId?: string;
  cartValue?: number;
  category?: string;
  searchQuery?: string;
  price?: number;
};

export async function deriveSurfaceContext(
  surface: string,
  url: URL,
  ctx?: StorefrontContext
): Promise<SurfaceContext> {
  const context: SurfaceContext = {};
  const segments = url.pathname.split('/').filter(Boolean);

  switch (surface) {
    case 'search_results': {
      const sortBy = url.searchParams.get('sortBy');
      if (sortBy) context.searchQuery = sortBy;
      return context;
    }

    case 'product_detail': {
      const productsIndex = segments.indexOf('products');
      const handle = productsIndex >= 0 ? segments[productsIndex + 1] ?? '' : '';
      if (!handle) return context;

      const { graphqlFetch } = await import('@gfed-medusa/sf-lib-common/lib/gql/apollo-client');
      const { GET_PRODUCT_BY_HANDLE_FOR_PERSONALIZATION } = await import(
        '@gfed-medusa/sf-lib-common/lib/gql/queries/product-personalization'
      );

      type ProductResult = { products: { products: Array<{ id: string; categories: Array<{ handle: string }>; variants: Array<{ id: string; calculatedPrice: { calculatedAmount: number } }> }> } };
      const data = await graphqlFetch<ProductResult, { handle: string }>({
        query: GET_PRODUCT_BY_HANDLE_FOR_PERSONALIZATION,
        variables: { handle },
      }).catch(() => null);

      const product = data?.products?.products?.[0];
      if (product) {
        context.productId = product.id;
        context.category = product.categories?.[0]?.handle ?? undefined;
        const firstVariant = product.variants?.[0];
        if (firstVariant?.calculatedPrice?.calculatedAmount != null) {
          context.price = firstVariant.calculatedPrice.calculatedAmount / 100;
        }
      }
      return context;
    }

    case 'category_page': {
      const catIndex = segments.indexOf('categories');
      if (catIndex >= 0 && catIndex + 1 < segments.length) {
        context.category = segments.slice(catIndex + 1).join('/');
      }
      return context;
    }

    case 'checkout':
    case 'cart_page': {
      if (!ctx?.cartId) return context;
      const { graphqlFetch } = await import('@gfed-medusa/sf-lib-common/lib/gql/apollo-client');
      const { GET_CART_TOTAL_QUERY } = await import(
        '@gfed-medusa/sf-lib-common/lib/gql/queries/cart-total'
      );

      const data = await graphqlFetch<{ cart: { total: number } }, { id: string }>({
        query: GET_CART_TOTAL_QUERY,
        variables: { id: ctx.cartId },
      }).catch(() => null);

      if (data?.cart?.total != null) {
        context.cartValue = data.cart.total;
      }
      return context;
    }

    case 'homepage_hero':
    default:
      return context;
  }
}