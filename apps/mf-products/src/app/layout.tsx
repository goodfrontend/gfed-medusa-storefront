// sort-imports-ignore
import '@gfed-medusa/sf-lib-common/lib/globals/expose-globals';

import { Metadata } from 'next';

import { StorefrontProvider } from '@gfed-medusa/sf-lib-common/lib/data/context';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import { getBaseURL } from '@gfed-medusa/sf-lib-common/lib/utils/env';

import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    template: '%s | JustGood Store',
    default: 'JustGood Store',
  },
  description: 'Shop the latest products at JustGood Store.',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const ctx = await resolveNextContext();
  return (
    <html lang="en" data-mode="light">
      <body>
        <StorefrontProvider value={ctx}>
          <main className="relative">{props.children}</main>
        </StorefrontProvider>
      </body>
    </html>
  );
}
