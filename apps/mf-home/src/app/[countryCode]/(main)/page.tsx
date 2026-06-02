import { Metadata } from 'next';

import { WebComponent } from '@gfed-medusa/sf-lib-common/components/web-component';

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

export default async function Home() {
  return <WebComponent tag="mfe-personalized-homepage" />;
}
