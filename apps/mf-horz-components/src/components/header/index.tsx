import { StorefrontProvider } from '@gfed-medusa/sf-lib-common/lib/data/context';
import { useCustomer } from '@gfed-medusa/sf-lib-common/lib/hooks/use-customer';
import { Region } from '@gfed-medusa/sf-lib-common/types/graphql';
import { User } from '@medusajs/icons';

import { Link } from '../link';
import { SearchModal } from './search-modal';
import { SideMenu } from './side-menu';

interface HeaderProps {
  regions: Region[];
}

function Header({ regions }: HeaderProps) {
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

            <div className="small:gap-x-6 flex h-full flex-1 basis-0 items-center justify-end gap-x-4">
              <SearchModal />
              <div className="small:flex hidden h-full items-center gap-x-6">
                {customer ? (
                  <Link
                    className="text-ui-fg-subtle hover:text-ui-fg-base flex min-h-[32px] min-w-[32px] cursor-pointer items-center justify-center focus:outline-none"
                    href="/account"
                    data-testid="nav-account-link"
                    aria-label="Account"
                  >
                    <User width={16} height={16} />
                  </Link>
                ) : (
                  <button
                    className="text-ui-fg-subtle hover:text-ui-fg-base flex min-h-[32px] min-w-[32px] cursor-pointer items-center justify-center focus:outline-none"
                    onClick={goToLogin}
                    aria-label="Log in"
                    data-testid="nav-login-button"
                  >
                    <User width={16} height={16} />
                  </button>
                )}
              </div>
              <slot name="cart" />
            </div>
          </nav>
        </header>
      </div>
    </StorefrontProvider>
  );
}

export { Header };
