'use client';

import { useEffect, useRef, useState } from 'react';

import { BrowseProductPreview } from '@/components/browse-product-preview';
import { Pagination } from '@/components/pagination';
import SkeletonProductGrid from '@/components/skeleton-product-grid';
import type { SortOptions } from '@/components/refinement-list/sort-products';
import type { BrowseProductHitFragment } from '@/types/graphql';

const LCP_CANDIDATE_COUNT = 4;

type PaginatedProductsClientProps = {
  initialProducts: BrowseProductHitFragment[];
  initialTotalItems: number;
  initialTargetPage: number;
  itemsPerPage: number;
  sortBy?: SortOptions;
  collectionId?: string;
  categoryId?: string;
  productsIds?: string[];
  countryCode: string;
};

type PlpResponse = {
  products: BrowseProductHitFragment[];
  count: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
};

const appendUniqueProducts = (
  currentProducts: BrowseProductHitFragment[],
  nextProducts: BrowseProductHitFragment[]
) => {
  const seenProductIds = new Set(currentProducts.map((product) => product.id));

  return [
    ...currentProducts,
    ...nextProducts.filter((product) => !seenProductIds.has(product.id)),
  ];
};

const buildPlpRequestUrl = ({
  countryCode,
  page,
  sortBy,
  collectionId,
  categoryId,
  productsIds,
}: {
  countryCode: string;
  page: number;
  sortBy?: SortOptions;
  collectionId?: string;
  categoryId?: string;
  productsIds?: string[];
}) => {
  const params = new URLSearchParams({
    countryCode,
    page: page.toString(),
  });

  if (sortBy) {
    params.set('sortBy', sortBy);
  }

  if (collectionId) {
    params.set('collectionId', collectionId);
  }

  if (categoryId) {
    params.set('categoryId', categoryId);
  }

  productsIds?.forEach((productId) => {
    params.append('productId', productId);
  });

  return `/api/products/plp?${params.toString()}`;
};

const buildInitialHydrationRequestUrl = ({
  countryCode,
  targetPage,
  excludeLoadedCount,
  sortBy,
  collectionId,
  categoryId,
  productsIds,
}: {
  countryCode: string;
  targetPage: number;
  excludeLoadedCount: number;
  sortBy?: SortOptions;
  collectionId?: string;
  categoryId?: string;
  productsIds?: string[];
}) => {
  const params = new URLSearchParams({
    countryCode,
    targetPage: targetPage.toString(),
    excludeLoadedCount: excludeLoadedCount.toString(),
  });

  if (sortBy) {
    params.set('sortBy', sortBy);
  }

  if (collectionId) {
    params.set('collectionId', collectionId);
  }

  if (categoryId) {
    params.set('categoryId', categoryId);
  }

  productsIds?.forEach((productId) => {
    params.append('productId', productId);
  });

  return `/api/products/plp?${params.toString()}`;
};

const replacePageInUrl = (page: number) => {
  const nextUrl = new URL(window.location.href);

  if (page <= 1) {
    nextUrl.searchParams.delete('page');
  } else {
    nextUrl.searchParams.set('page', page.toString());
  }

  window.history.replaceState(window.history.state, '', nextUrl.toString());
};

export default function PaginatedProductsClient({
  initialProducts,
  initialTotalItems,
  initialTargetPage,
  itemsPerPage,
  sortBy,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
}: PaginatedProductsClientProps) {
  const initialLoadedCount = initialProducts.length;
  const [products, setProducts] = useState(initialProducts);
  const [totalItems, setTotalItems] = useState(initialTotalItems);
  const [currentPage, setCurrentPage] = useState(
    initialLoadedCount ? 1 : 0
  );
  const [isHydratingInitialPage, setIsHydratingInitialPage] = useState(
    initialTargetPage > 1 && initialTotalItems > itemsPerPage
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pendingScrollProductId, setPendingScrollProductId] = useState<
    string | null
  >(null);
  const isMountedRef = useRef(true);
  const currentPageRef = useRef(initialLoadedCount ? 1 : 0);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasNextPage = currentPage < totalPages;
  const remainingItemsCount = Math.max(totalItems - products.length, 0);
  const skeletonCount = isHydratingInitialPage
    ? Math.min(itemsPerPage, remainingItemsCount)
    : 0;

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    if (!pendingScrollProductId) {
      return;
    }

    const productCard = document.getElementById(
      `product-card-${pendingScrollProductId}`
    );

    if (!productCard) {
      return;
    }

    requestAnimationFrame(() => {
      productCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setPendingScrollProductId(null);
    });
  }, [pendingScrollProductId, products]);

  const requestPage = async (
    pageToLoad: number,
    {
      syncUrl = false,
      scrollToFirstNewProduct = false,
      showButtonLoading = true,
    }: {
      syncUrl?: boolean;
      scrollToFirstNewProduct?: boolean;
      showButtonLoading?: boolean;
    } = {}
  ) => {
    if (
      isLoadingMore ||
      isHydratingInitialPage ||
      pageToLoad <= currentPageRef.current ||
      (totalPages > 0 && pageToLoad > totalPages)
    ) {
      return false;
    }

    if (showButtonLoading) {
      setIsLoadingMore(true);
    }

    try {
      const response = await fetch(
        buildPlpRequestUrl({
          countryCode,
          page: pageToLoad,
          sortBy,
          collectionId,
          categoryId,
          productsIds,
        }),
        {
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch PLP page ${pageToLoad}`);
      }

      const data = (await response.json()) as PlpResponse;

      if (!isMountedRef.current) {
        return false;
      }

      if (scrollToFirstNewProduct && data.products[0]?.id) {
        setPendingScrollProductId(data.products[0].id);
      }

      setProducts((currentProducts) =>
        appendUniqueProducts(currentProducts, data.products)
      );
      setTotalItems(data.count);
      setCurrentPage(data.page);

      if (syncUrl) {
        replacePageInUrl(data.page);
      }

      return true;
    } catch (error) {
      console.error('Failed to load more PLP products:', error);
      return false;
    } finally {
      if (showButtonLoading && isMountedRef.current) {
        setIsLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    const targetPage = Math.min(initialTargetPage, totalPages);

    if (
      totalPages === 0 ||
      targetPage <= 1 ||
      currentPageRef.current >= targetPage
    ) {
      setIsHydratingInitialPage(false);
      return;
    }

    let cancelled = false;

    const catchUpToRequestedPage = async () => {
      setIsHydratingInitialPage(true);

      try {
        const response = await fetch(
          buildInitialHydrationRequestUrl({
            countryCode,
            targetPage,
            excludeLoadedCount: initialLoadedCount,
            sortBy,
            collectionId,
            categoryId,
            productsIds,
          }),
          {
            credentials: 'include',
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to hydrate PLP up to page ${targetPage}`);
        }

        const data = (await response.json()) as PlpResponse;

        if (cancelled || !isMountedRef.current) {
          return;
        }

        setProducts((currentProducts) =>
          appendUniqueProducts(currentProducts, data.products)
        );
        setTotalItems(data.count);
        setCurrentPage(data.page);
      } catch (error) {
        console.error('Failed to hydrate initial PLP products:', error);
      } finally {
        if (!cancelled && isMountedRef.current) {
          setIsHydratingInitialPage(false);
        }
      }
    };

    void catchUpToRequestedPage();

    return () => {
      cancelled = true;
    };
  }, [
    categoryId,
    collectionId,
    countryCode,
    initialLoadedCount,
    initialTargetPage,
    productsIds,
    sortBy,
    totalPages,
  ]);

  return (
    <>
      <ul
        className="grid w-full grid-cols-[repeat(auto-fit,_minmax(min(100%,_max(10rem,_calc((100%_-_4.5rem)_/_4))),_1fr))] gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {products.map((product, index) => {
          const isLcpCandidate = index < LCP_CANDIDATE_COUNT;

          return (
            <li
              key={product.id}
              id={`product-card-${product.id}`}
              className="scroll-mt-24"
            >
              <BrowseProductPreview
                product={product}
                imagePriority={isLcpCandidate}
                imageFetchPriority={isLcpCandidate ? 'high' : undefined}
              />
            </li>
          );
        })}
      </ul>
      {skeletonCount > 0 && (
        <div aria-hidden="true" className="mt-8">
          <SkeletonProductGrid numberOfProducts={skeletonCount} />
        </div>
      )}
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          loadedCount={products.length}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          hasNextPage={hasNextPage}
          disabled={isHydratingInitialPage}
          isLoading={isLoadingMore}
          onLoadMore={() =>
            requestPage(currentPageRef.current + 1, {
              syncUrl: true,
              scrollToFirstNewProduct: true,
            })
          }
        />
      )}
    </>
  );
}
