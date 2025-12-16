import { Metadata } from 'next';
import { Nav } from '@gfed-medusa/sf-lib-common/components/nav';
import Footer from '@gfed-medusa/sf-lib-common/components/footer';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8001'
  ),
};

export default async function MainLayout(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">{props.children}</main>
      <Footer />
    </div>
  );
}
