'use client';

import { useParams, usePathname } from 'next/navigation';

import { LocalizedClientLink } from '@gfed-medusa/sf-lib-common/components/localized-client-link';

const AccountNav = ({ bffBaseUrl }: { bffBaseUrl: string }) => {
  const route = usePathname();

  const handleLogout = async () => {
    window.location.href = `${bffBaseUrl}/auth/logout`;
  };

  return (
    <div className="small:block w-full" data-testid="account-nav">
      <div>
        <div className="small:pb-4 pb-3">
          <h3 className="text-large-semi">Account</h3>
        </div>
        <div className="text-base-regular">
          <ul className="no-scrollbar small:mx-0 small:grid small:grid-cols-1 small:gap-y-4 small:overflow-visible small:px-0 small:pb-0 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            <li>
              <AccountNavLink
                href="/account"
                route={route!}
                data-testid="overview-link"
              >
                Overview
              </AccountNavLink>
            </li>
            <li>
              <AccountNavLink
                href="/account/profile"
                route={route!}
                data-testid="profile-link"
              >
                Profile
              </AccountNavLink>
            </li>
            <li>
              <AccountNavLink
                href="/account/addresses"
                route={route!}
                data-testid="addresses-link"
              >
                Addresses
              </AccountNavLink>
            </li>
            <li>
              <AccountNavLink
                href="/account/orders"
                route={route!}
                data-testid="orders-link"
              >
                Orders
              </AccountNavLink>
            </li>
            <li className="small:shrink shrink-0 snap-start">
              <button
                type="button"
                onClick={handleLogout}
                className="text-ui-fg-subtle hover:text-ui-fg-base cursor-pointer whitespace-nowrap underline-offset-4 transition-colors"
                data-testid="logout-button"
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

type AccountNavLinkProps = {
  href: string;
  route: string;
  children: React.ReactNode;
  'data-testid'?: string;
};

const AccountNavLink = ({
  href,
  route,
  children,
  'data-testid': dataTestId,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams();

  const activeRoute = route.split(countryCode)[1];
  const active = activeRoute === href || activeRoute?.startsWith(`${href}/`);

  if (active) {
    return (
      <span
        className="text-ui-fg-base block shrink-0 snap-start font-semibold whitespace-nowrap underline underline-offset-4"
        data-testid={dataTestId}
        aria-current="page"
      >
        {children}
      </span>
    );
  }

  return (
    <LocalizedClientLink
      href={href}
      className="text-ui-fg-subtle hover:text-ui-fg-base block shrink-0 snap-start whitespace-nowrap underline-offset-4 transition-colors"
      data-testid={dataTestId}
    >
      {children}
    </LocalizedClientLink>
  );
};

export { AccountNav };
