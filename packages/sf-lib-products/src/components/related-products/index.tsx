import { ProductPreview } from '@gfed-medusa/sf-lib-common/components/product-preview';

import { listProducts } from '@/lib/data/products';
import { getRegion } from '@/lib/data/regions';
import {
  GetProductsQueryVariables,
  Product as ProductType,
} from '@/types/graphql';

type RelatedProductsProps = {
  product: ProductType;
  countryCode: string;
};

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode);

  if (!region) {
    return null;
  }

  // edit this function to define your related products logic
  const queryParams: GetProductsQueryVariables = {};
  if (region?.id) {
    queryParams.region_id = region.id;
  }
  if (product.collectionId) {
    queryParams.collection_id = [product.collectionId];
  }
  if (product.tags) {
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[];
  }
  queryParams.is_giftcard = false;

  const products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products?.filter(
      (responseProduct) => responseProduct?.id !== product.id
    );
  });

  if (!products?.length) {
    return null;
  }

  return (
    <div className="product-page-constraint">
      <div className="mb-16 flex flex-col items-center text-center">
        <span className="text-base-regular mb-6 text-gray-600">
          Related products
        </span>
        <p className="text-2xl-regular text-ui-fg-base max-w-lg">
          You might also want to check out these products.
        </p>
      </div>

      <ul className="small:grid-cols-3 medium:grid-cols-4 grid grid-cols-2 gap-x-6 gap-y-8">
        {products?.map((product) => (
          <li key={product?.id}>
            <ProductPreview product={product as ProductType} />
          </li>
        ))}
      </ul>
    </div>
  );
}
