import { Metadata } from 'next';

import { FeaturedCategoryRail } from '../../../components/featured-category-rail';
import { getFeaturedCategories } from '../../../lib/data/featured-categories';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Discover quality products curated for you at JustGood Store.',
  openGraph: {
    title: 'JustGood Store',
    description: 'Discover quality products curated for you at JustGood Store.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JustGood Store',
    description: 'Discover quality products curated for you at JustGood Store.',
  },
};

type Props = {
  params: Promise<{ countryCode: string }>;
};

export default async function Home({ params }: Props) {
  const { countryCode } = await params;

  const featuredCategories = await getFeaturedCategories(countryCode);

  if (featuredCategories.length === 0) {
    return (
      <div className="py-10">
        <p className="text-ui-fg-subtle text-center">
          No featured category products available at the moment.
        </p>
      </div>
    );
  }

  return (
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
  );
}
