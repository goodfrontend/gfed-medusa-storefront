import { Suspense } from 'react';

import {
  StorefrontContext,
  StorefrontProvider,
} from '@gfed-medusa/sf-lib-common/lib/data/context';
import { Region } from '@gfed-medusa/sf-lib-common/types/graphql';

import { Link } from '../link';
import { CartButton } from './cart-button';
import { SearchModal } from './search-modal';
import { SideMenu } from './side-menu';

function Header({
  regions,
  ctx,
}: {
  regions: Region[];
  ctx: StorefrontContext;
}) {
  return (
    <StorefrontProvider value={ctx}>
      <div className="group sticky inset-x-0 top-0 z-50">
        <header className="border-ui-border-base relative mx-auto h-16 border-b bg-white duration-200">
          <nav className="content-container text-small-regular txt-xsmall-plus text-ui-fg-subtle flex h-full w-full items-center justify-between">
            <div className="flex h-full flex-1 basis-0 items-center">
              <div className="h-full">
                <SideMenu regions={regions} />
              </div>
            </div>

            <div className="flex h-full items-center">
              <Link
                href="/"
                className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
                data-testid="nav-store-link"
              >
                Medusa Store
              </Link>
            </div>

            <div className="flex h-full flex-1 basis-0 items-center justify-end gap-x-6">
              <SearchModal />
              <div className="small:flex hidden h-full items-center gap-x-6">
                <Link
                  className="hover:text-ui-fg-base"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  Account
                </Link>
              </div>
              <Suspense
                fallback={
                  <Link
                    className="hover:text-ui-fg-base flex gap-2"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    Cart (0)
                  </Link>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </nav>
        </header>
      </div>
    </StorefrontProvider>
  );
}

export { Header };
