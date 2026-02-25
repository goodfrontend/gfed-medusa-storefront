// sort-imports-ignore
import '@gfed-medusa/sf-lib-common/lib/globals/expose-globals';

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
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            right: '8px',
            bottom: '8px',
            zIndex: 2147483647,
            fontSize: '10px',
            lineHeight: '12px',
            padding: '2px 6px',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
            background: 'rgba(255, 255, 255, 0.85)',
            color: 'rgba(0, 0, 0, 0.7)',
            pointerEvents: 'none',
          }}
        >
          products deploy check 2026-02-25
        </div>
      </body>
    </html>
  );
}
