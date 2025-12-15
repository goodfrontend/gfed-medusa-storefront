// sort-imports-ignore
import './global.css';
import '@gfed-medusa/sf-lib-ui/styles.css';

import { Metadata } from 'next';
import { ApolloClientProvider } from '@gfed-medusa/sf-lib-common/lib/context/apollo-context';
import { getBaseURL } from '@gfed-medusa/sf-lib-common/lib/utils/env';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </body>
    </html>
  );
}
