import { Metadata } from 'next';

import { getHomeBannerContent } from '@gfed-medusa/sf-lib-common/lib/data/home-banner';
import { Hero } from '@gfed-medusa/sf-lib-home/components/hero';

import { FeaturedCategoryRail } from '../../../components/featured-category-rail';
import { getFeaturedCategories } from '../../../lib/data/featured-categories';

export const metadata: Metadata = {
  title: 'Medusa Next.js Starter Template',
  description:
    'A performant frontend ecommerce starter template with Next.js 15 and Medusa.',
};

type Props = {
  params: Promise<{ countryCode: string }>;
};

export default async function Home({ params }: Props) {
  const { countryCode } = await params;

  const [featuredCategories, bannerContent] = await Promise.all([
    getFeaturedCategories(countryCode),
    getHomeBannerContent(),
  ]);

  if (featuredCategories.length === 0) {
    return (
      <>
        <Hero bannerContent={bannerContent} />
        <div className="py-10">
          <p className="text-ui-fg-subtle text-center">
            No featured category products available at the moment.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Hero bannerContent={bannerContent} />
      <div>
        <ul className="flex flex-col gap-x-6">
          {featuredCategories.map(({ category, products, title }) => (
            <li key={category.id}>
              <FeaturedCategoryRail
                handle={category.handle}
                products={products}
                title={title}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
