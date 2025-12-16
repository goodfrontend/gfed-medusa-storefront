import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getCategoryByHandle } from '@gfed-medusa/sf-lib-products/lib/data/categories';
import PaginatedProducts from '@gfed-medusa/sf-lib-products/templates/paginated-products';
import RefinementList from '@gfed-medusa/sf-lib-products/components/refinement-list';
import SkeletonProductGrid from '@gfed-medusa/sf-lib-products/components/skeleton-product-grid';
import type { SortOptions } from '@gfed-medusa/sf-lib-products/types/index';

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>;
  searchParams: Promise<{
    sortBy?: SortOptions;
    page?: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  try {
    const productCategory = await getCategoryByHandle(params.category);

    const title = productCategory?.name + ' | Medusa Store';
    const description = productCategory?.description ?? `${title} category.`;

    return {
      title: `${title} | Medusa Store`,
      description,
      alternates: {
        canonical: `${params.category.join('/')}`,
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

  const productCategory = await getCategoryByHandle(params.category);

  if (!productCategory) {
    notFound();
  }

  const pageNumber = page ? parseInt(page) : 1;
  const sort = sortBy || 'created_at';

  return (
    <div
      className="content-container flex flex-col py-6 small:flex-row small:items-start"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="text-2xl-semi mb-8">
          <h1 data-testid="category-page-title">{productCategory.name}</h1>
          {productCategory.description && (
            <p className="text-base-regular mt-2">{productCategory.description}</p>
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
