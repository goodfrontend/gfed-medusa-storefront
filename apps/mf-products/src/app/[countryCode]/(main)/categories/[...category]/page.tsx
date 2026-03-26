import { Suspense, cache } from 'react';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import RefinementList from '@gfed-medusa/sf-lib-products/components/refinement-list';
import SkeletonProductGrid from '@gfed-medusa/sf-lib-products/components/skeleton-product-grid';
import { getCategoryByHandle } from '@gfed-medusa/sf-lib-products/lib/data/categories';
import PaginatedProducts from '@gfed-medusa/sf-lib-products/templates/paginated-products';
import type { SortOptions } from '@gfed-medusa/sf-lib-products/types/index';

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>;
  searchParams: Promise<{
    sortBy?: SortOptions;
    page?: string;
  }>;
};

const getCategoryByPathCached = cache(async (categoryPath: string) => {
  return getCategoryByHandle(categoryPath.split('/'));
});

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  try {
    const categoryPath = params.category.join('/');
    const productCategory = await getCategoryByPathCached(categoryPath);

    const categoryName = productCategory?.name ?? 'Category';

    return {
      title: categoryName,
      description:
        productCategory?.description?.trim() ||
        `Browse ${categoryName} products at JustGood Store.`,
      alternates: {
        canonical: `/${params.countryCode}/categories/${params.category.join('/')}`,
      },
      openGraph: {
        title: `${categoryName} | JustGood Store`,
        description:
          productCategory?.description?.trim() ||
          `Browse ${categoryName} products at JustGood Store.`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${categoryName} | JustGood Store`,
        description:
          productCategory?.description?.trim() ||
          `Browse ${categoryName} products at JustGood Store.`,
      },
    };
  } catch (error) {
    notFound();
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sortBy, page } = searchParams;
  const categoryPath = params.category.join('/');

  const productCategory = await getCategoryByPathCached(categoryPath);

  if (!productCategory) {
    notFound();
  }

  const pageNumber = page ? parseInt(page) : 1;
  const sort = sortBy || 'created_at';

  return (
    <div
      className="content-container small:flex-row small:items-start flex flex-col py-6"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="text-2xl-semi mb-8">
          <h1 data-testid="category-page-title">{productCategory.name}</h1>
          {productCategory.description && (
            <p className="text-base-regular mt-2">
              {productCategory.description}
            </p>
          )}
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={productCategory.id}
            countryCode={params.countryCode}
          />
        </Suspense>
      </div>
    </div>
  );
}
