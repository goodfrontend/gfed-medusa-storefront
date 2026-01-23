import { Metadata } from 'next';

import { StorefrontProvider } from '@gfed-medusa/sf-lib-common/lib/data/context';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import { getBaseURL } from '@gfed-medusa/sf-lib-common/lib/utils/env';

import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
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
