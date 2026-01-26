// sort-imports-ignore
import '@gfed-medusa/sf-lib-ui/styles.css';
import '@gfed-medusa/sf-lib-common/lib/globals/expose-globals';
import './global.css';

import { Metadata } from 'next';
import { ApolloClientProvider } from '@gfed-medusa/sf-lib-common/lib/context/apollo-context';
import { getBaseURL } from '@gfed-medusa/sf-lib-common/lib/utils/env';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import { StorefrontProvider } from '@gfed-medusa/sf-lib-common/lib/data/context';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = await resolveNextContext();
  return (
    <html lang="en" data-mode="light">
      <body>
        <main>
          <ApolloClientProvider>
            <StorefrontProvider value={ctx}>{children}</StorefrontProvider>
          </ApolloClientProvider>
        </main>
      </body>
    </html>
  );
}
