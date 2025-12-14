import EmptyCartMessage from '@components/empty-cart-message';
import SignInPrompt from '@components/sign-in-prompt';
import { Divider } from '@gfed-medusa/sf-lib-ui/components/divider';
import { Customer } from '@lib/gql/generated-types/graphql';
import { Cart } from '@lib/gql/generated-types/graphql';

import ItemsTemplate from './items';
import Summary from './summary';

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: Cart | undefined | null;
  customer: Customer | null;
}) => {
  return (
    <div className="py-12">
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="small:grid-cols-[1fr_360px] grid grid-cols-1 gap-x-40">
            <div className="flex flex-col gap-y-6 bg-white py-6">
              {!customer && (
                <>
                  <SignInPrompt />
                  <Divider />
                </>
              )}
              <ItemsTemplate cart={cart} />
            </div>
            <div className="relative">
              <div className="sticky top-12 flex flex-col gap-y-8">
                {cart && cart.region && (
                  <>
                    <div className="bg-white py-6">
                      <Summary cart={cart} />
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
