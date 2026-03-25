'use client';

import { useEffect, useState } from 'react';

import { useCart } from '@gfed-medusa/sf-lib-common/lib/hooks/use-cart';
import { Divider } from '@gfed-medusa/sf-lib-ui/components/divider';

import EmptyCartMessage from '@/components/empty-cart-message';
import SignInPrompt from '@/components/sign-in-prompt';
import { Customer } from '@/lib/gql/generated-types/graphql';

import ItemsTemplate from '../items';
import SkeletonCartPage from '../skeleton-cart-page';
import Summary from '../summary';

const CartTemplate = ({ customer }: { customer: Customer | null }) => {
  const { cart, isLoading } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const hasItems = (cart?.items?.length ?? 0) > 0;

  return (
    <div className="py-12">
      <div className="content-container" data-testid="cart-container">
        {!isMounted || isLoading ? (
          <SkeletonCartPage />
        ) : hasItems ? (
          <div className="small:grid-cols-[1fr_360px] grid gap-x-40">
            <div className="flex flex-col gap-y-6 bg-white py-6">
              {!customer && (
                <>
                  <SignInPrompt />
                  <Divider />
                </>
              )}
              <ItemsTemplate />
            </div>
            <div className="relative">
              <div className="sticky top-12 flex flex-col gap-y-8">
                {cart && cart.region && (
                  <>
                    <div className="bg-white py-6">
                      <Summary />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartTemplate;
