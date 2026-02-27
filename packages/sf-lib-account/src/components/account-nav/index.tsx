'use client';

import { useParams, usePathname } from 'next/navigation';

import { LocalizedClientLink } from '@gfed-medusa/sf-lib-common/components/localized-client-link';
import { ChevronDown } from '@gfed-medusa/sf-lib-ui/icons/chevron-down';
import { MapPin } from '@gfed-medusa/sf-lib-ui/icons/map-pin';
import { Package } from '@gfed-medusa/sf-lib-ui/icons/package';
import { User } from '@gfed-medusa/sf-lib-ui/icons/user';
import { ArrowRightOnRectangle } from '@medusajs/icons';
import { clx } from '@medusajs/ui';

import { Customer } from '@/types/graphql';

const AccountNav = ({ customer }: { customer: Customer | null }) => {
  const route = usePathname();

  const { countryCode } = useParams() as { countryCode: string };

  const handleLogout = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BFF_BASE_URL}/auth/logout`;
  };

  return (
    <div>
      <div>
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="text-small-regular flex items-center gap-x-2 py-2"
            data-testid="account-main-link"
          >
            <>
              <ChevronDown className="rotate-90 transform" />
              <span>Account</span>
            </>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="text-xl-semi mb-4 px-8">
              Hello {customer?.firstName}
            </div>
            <div className="text-base-regular">
              <ul>
                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="flex items-center justify-between border-b border-gray-200 px-8 py-4"
                    data-testid="profile-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <User size={20} />
                        <span>Profile</span>
                      </div>
                      <ChevronDown className="-rotate-90 transform" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/addresses"
                    className="flex items-center justify-between border-b border-gray-200 px-8 py-4"
                    data-testid="addresses-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <MapPin size={20} />
                        <span>Addresses</span>
                      </div>
                      <ChevronDown className="-rotate-90 transform" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="flex items-center justify-between border-b border-gray-200 px-8 py-4"
                    data-testid="orders-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <Package size={20} />
                      <span>Orders</span>
                    </div>
                    <ChevronDown className="-rotate-90 transform" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between border-b border-gray-200 px-8 py-4"
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-2">
                      <ArrowRightOnRectangle />
                      <span>Log out</span>
                    </div>
                    <ChevronDown className="-rotate-90 transform" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="small:block" data-testid="account-nav">
        <div>
          <div className="pb-4">
            <h3 className="text-base-semi">Account</h3>
          </div>
          <div className="text-base-regular">
            <ul className="mb-0 flex flex-col items-start justify-start gap-y-4">
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
              <li className="text-grey-700">
                <button
                  type="button"
                  onClick={handleLogout}
                  data-testid="logout-button"
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
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

  const active = route.split(countryCode)[1] === href;
  return (
    <LocalizedClientLink
      href={href}
      className={clx('text-ui-fg-subtle hover:text-ui-fg-base', {
        'text-ui-fg-base font-semibold': active,
      })}
      data-testid={dataTestId}
    >
      {children}
    </LocalizedClientLink>
  );
};

export { AccountNav };
