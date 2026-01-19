import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'
  ),
};

export default async function MainLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* @ts-expect-error -- Web Component */}
      <mfe-header suppressHydrationWarning></mfe-header>
      <main className="flex-1">{props.children}</main>
      {/* @ts-expect-error -- Web Component */}
      <mfe-footer suppressHydrationWarning></mfe-footer>
    </div>
  );
}
