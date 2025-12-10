import { Suspense } from 'react';

import { listRegions } from '@/lib/data/regions';
import { Region } from '@/types/graphql';

import { CartButton } from '../cart-button';
import { LocalizedClientLink } from '../localized-client-link';
import { SearchModal } from '../search-modal';
import { SideMenu } from '../side-menu';

async function Nav() {
  const regions = await listRegions().then((regions: Region[]) => regions);

  return (
    <div className="group sticky inset-x-0 top-0 z-50">
      <header className="border-ui-border-base relative mx-auto h-16 border-b bg-white duration-200">
        <nav className="content-container text-small-regular txt-xsmall-plus text-ui-fg-subtle flex h-full w-full items-center justify-between">
          <div className="flex h-full flex-1 basis-0 items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex h-full items-center">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              Medusa Store
            </LocalizedClientLink>
          </div>

          <div className="flex h-full flex-1 basis-0 items-center justify-end gap-x-6">
            <SearchModal />
            <div className="small:flex hidden h-full items-center gap-x-6">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  );
}

export { Nav };
