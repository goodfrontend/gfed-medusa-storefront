import { Metadata } from 'next';

import { InteractiveLink } from '@gfed-medusa/sf-lib-common/components/interactive-link';
import { WebComponent } from '@gfed-medusa/sf-lib-common/components/web-component';
import { Text } from '@medusajs/ui';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <WebComponent tag="mfe-header" />
      <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-6 px-4 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-ui-fg-base text-6xl font-semibold">404</p>
          <h1 className="text-2xl-semi text-ui-fg-base">Page Not Found</h1>
          <Text className="text-small-regular text-ui-fg-subtle max-w-md">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. The
            page may have been moved or no longer exists.
          </Text>
        </div>
        <InteractiveLink href="/" className="cursor-pointer">
          Go to Homepage
        </InteractiveLink>
      </div>
      <WebComponent tag="mfe-footer" />
    </>
  );
}
