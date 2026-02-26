import React from 'react';

import { InteractiveLink } from '@gfed-medusa/sf-lib-common/components/interactive-link';

import { Customer } from '@/types/graphql';

import { AccountNav } from '../account-nav';

interface AccountLayoutProps {
  customer?: Customer | null;
  children: React.ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="small:py-12 flex-1" data-testid="account-page">
      <div className="content-container mx-auto flex h-full max-w-5xl flex-1 flex-col bg-white">
        <div className="small:grid-cols-[240px_1fr] grid grid-cols-1 py-12">
          <div>{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1">{children}</div>
        </div>
        <div className="small:flex-row small:border-t flex flex-col items-end justify-between gap-8 border-gray-200 py-12">
          <div>
            <h3 className="text-xl-semi mb-4">Got questions?</h3>
            <span className="txt-medium">
              You can find frequently asked questions and answers on our
              customer service page.
            </span>
          </div>
          <div>
            <InteractiveLink href="/customer-service">
              Customer Service
            </InteractiveLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AccountLayout };
