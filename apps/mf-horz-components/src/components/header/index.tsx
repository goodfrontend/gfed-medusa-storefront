import { Suspense } from 'react';

import { StorefrontProvider } from '@gfed-medusa/sf-lib-common/lib/data/context';
import { useCustomer } from '@gfed-medusa/sf-lib-common/lib/hooks/use-customer';
import { Region } from '@gfed-medusa/sf-lib-common/types/graphql';

import { Link } from '../link';
import { CartButton } from './cart-button';
import { SearchModal } from './search-modal';
import { SideMenu } from './side-menu';

function Header({ regions }: { regions: Region[] }) {
  const { customer } = useCustomer();

  const goToLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BFF_BASE_URL}/auth/login`;
  };

  return (
    <StorefrontProvider>
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
                style={{
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  fontSize: '0.875rem',
                }}
              >
                <span className="xsmall:block hidden">JustGood Store</span>
                <span className="xsmall:hidden" aria-label="JustGood Store">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-ui-fg-subtle"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="28"
                      height="28"
                      rx="4"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <text
                      x="16"
                      y="22"
                      textAnchor="middle"
                      fill="currentColor"
                      fontSize="14"
                      fontWeight="600"
                      fontFamily="Inter, system-ui, sans-serif"
                      letterSpacing="0.05em"
                    >
                      JG
                    </text>
                  </svg>
                </span>
              </Link>
            </div>

            <div className="flex h-full flex-1 basis-0 items-center justify-end gap-x-6">
              <SearchModal />
              <div className="small:flex hidden h-full items-center gap-x-6">
                {customer ? (
                  <Link
                    className="hover:text-ui-fg-base cursor-pointer"
                    href="/account"
                    data-testid="nav-account-link"
                  >
                    Account
                  </Link>
                ) : (
                  <button
                    className="hover:text-ui-fg-base cursor-pointer"
                    onClick={goToLogin}
                  >
                    Log In
                  </button>
                )}
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
