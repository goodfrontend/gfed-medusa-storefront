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

  const sort = sortBy || 'created_at';

  return (
    <div
      className="content-container small:grid-cols-[250px_minmax(0,1fr)] small:gap-x-6 small:gap-y-0 grid grid-cols-1 gap-y-6 py-6"
      data-testid="category-container"
    >
      <div className="small:contents flex flex-wrap items-center justify-between gap-x-8 gap-y-8">
        <div className="text-2xl-semi small:col-start-2 small:mb-8 min-w-[16rem] flex-1">
          <h1 data-testid="category-page-title">{productCategory.name}</h1>
          {productCategory.description && (
            <p className="text-base-regular mt-2">
              {productCategory.description}
            </p>
          )}
        </div>
        <RefinementList
          className="small:col-start-1 small:row-span-2 small:row-start-1 small:self-start small:w-full w-auto shrink-0"
          sortBy={sort}
        />
      </div>
      <div className="small:col-start-2 w-full">
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={page}
            categoryId={productCategory.id}
            countryCode={params.countryCode}
          />
        </Suspense>
      </div>
    </div>
  );
}
