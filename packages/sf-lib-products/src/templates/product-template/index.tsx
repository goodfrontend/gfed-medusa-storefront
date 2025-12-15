import React, { Suspense } from 'react';

import { notFound } from 'next/navigation';

import { Product } from '@/types/graphql';
import { HttpTypes } from '@medusajs/types';
import ImageGallery from '@/components/image-gallery';
import ProductActions from '@/components/product-actions';
import ProductOnboardingCta from '@/components/product-onboarding-cta';
import ProductTabs from '@/components/product-tabs';
import RelatedProducts from '@/components/related-products';
import ProductInfo from '@/templates/product-info';
import SkeletonRelatedProducts from '@/components/skeleton-related-products';

import ProductActionsWrapper from '../product-actions-wrapper';

type ProductTemplateProps = {
  product?: Product | null;
  region: HttpTypes.StoreRegion;
  countryCode: string;
  breadcrumbs?: React.ReactNode;
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  breadcrumbs,
}) => {
  if (!product || !product.id) {
    return notFound();
  }

  return (
    <>
      {breadcrumbs && <div className="content-container my-8">{breadcrumbs}</div>}
      <div
        className="content-container relative flex flex-col py-6 small:flex-row small:items-start"
        data-testid="product-container"
      >
        <div className="flex w-full flex-col gap-y-6 py-8 small:sticky small:top-48 small:max-w-[300px] small:py-0">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div>
        <div className="relative block w-full">
          <ImageGallery images={product?.images || []} />
        </div>
        <div className="flex w-full flex-col gap-y-12 py-8 small:sticky small:top-48 small:max-w-[300px] small:py-0">
          <ProductOnboardingCta />
          <Suspense
            fallback={<ProductActions disabled={true} product={product} />}
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  );
};

export default ProductTemplate;
