// sort-imports-ignore
import '@gfed-medusa/sf-lib-ui/styles.css';
import './global.css';

import { Metadata } from 'next';

import { ApolloClientProvider } from '@gfed-medusa/sf-lib-common/lib/context/apollo-context';
import { getBaseURL } from '@gfed-medusa/sf-lib-common/lib/utils/env';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">
          <ApolloClientProvider>{props.children}</ApolloClientProvider>
        </main>
      </body>
    </html>
  );
}
