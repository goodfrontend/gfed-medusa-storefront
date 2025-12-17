import { Metadata } from 'next';

import Footer from '@gfed-medusa/sf-lib-common/components/footer';
import { Nav } from '@gfed-medusa/sf-lib-common/components/nav';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'
  ),
};

export default async function MainLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">{props.children}</main>
      <Footer />
    </div>
  );
}
