'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ErrorMessage } from '@gfed-medusa/sf-lib-common/components/error-message';
import { useStorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import { convertToLocale } from '@gfed-medusa/sf-lib-common/lib/utils/money';
import { Divider } from '@gfed-medusa/sf-lib-ui/components/divider';
import { Radio as MedusaRadio } from '@gfed-medusa/sf-lib-ui/components/radio';
import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircleSolid, Loader } from '@medusajs/icons';
import { Button, Heading, Text, clx } from '@medusajs/ui';

import { setShippingMethod } from '@/lib/data/cart';
import { calculatePriceForShippingOption } from '@/lib/data/fulfillment';
import { Cart, ShippingOption } from '@/lib/gql/generated-types/graphql';

/* eslint-disable react/prop-types */

const PICKUP_OPTION_ON = '__PICKUP_ON';
const PICKUP_OPTION_OFF = '__PICKUP_OFF';

type ShippingProps = {
  cart: Cart;
  availableShippingMethods: ShippingOption[] | null;
};

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPrices, setIsLoadingPrices] = useState(true);

  const [showPickupOptions, setShowPickupOptions] =
    useState<string>(PICKUP_OPTION_OFF);
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({});
  const [error, setError] = useState<string | null>(null);
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shippingMethods?.at(-1)?.shippingOptionId || null
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get('step') === 'delivery';

  const ctx = useStorefrontContext();

  const _shippingMethods = availableShippingMethods?.filter(
    (sm) => sm.serviceZoneId
  );

  const _pickupMethods = availableShippingMethods?.filter(
    (sm) => sm.serviceZoneId && sm.serviceZoneId.includes('pickup')
  );

  const hasPickupOptions = !!_pickupMethods?.length;

  useEffect(() => {
    setIsLoadingPrices(true);

    if (_shippingMethods?.length) {
      const promises = _shippingMethods
        .filter((sm) => sm.priceType === 'calculated')
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id, {}, ctx));

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {};
          res
            .filter((r) => r.status === 'fulfilled')
            .forEach(
              (p) => (pricesMap[p.value?.id ?? ''] = p.value?.amount ?? 0)
            );

          setCalculatedPricesMap(pricesMap);
          setIsLoadingPrices(false);
        });
      }
    }

    if (_pickupMethods?.find((m) => m.id === shippingMethodId)) {
      setShowPickupOptions(PICKUP_OPTION_ON);
    }
  }, [availableShippingMethods]);

  const handleEdit = () => {
    router.push(pathname + '?step=delivery', { scroll: false });
  };

  const handleSubmit = () => {
    router.push(pathname + '?step=payment', { scroll: false });
  };

  const handleSetShippingMethod = async (
    id: string,
    variant: 'shipping' | 'pickup'
  ) => {
    setError(null);

    if (variant === 'pickup') {
      setShowPickupOptions(PICKUP_OPTION_ON);
    } else {
      setShowPickupOptions(PICKUP_OPTION_OFF);
    }

    let currentId: string | null = null;
    setIsLoading(true);
    setShippingMethodId((prev) => {
      currentId = prev;
      return id;
    });

    await setShippingMethod(cart.id, id, ctx)
      .catch((err) => {
        setShippingMethodId(currentId);

        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  return (
    <div className="bg-white">
      <div className="mb-6 flex flex-row items-center justify-between">
        <Heading
          level="h2"
          className={clx(
            'text-3xl-regular flex flex-row items-baseline gap-x-2',
            {
              'pointer-events-none select-none opacity-50':
                !isOpen && cart.shippingMethods?.length === 0,
            }
          )}
        >
          Delivery
          {!isOpen && (cart.shippingMethods?.length ?? 0) > 0 && (
            <CheckCircleSolid />
          )}
        </Heading>
        {!isOpen &&
          cart?.shippingAddress &&
          cart?.billingAddress &&
          cart?.email && (
            <Text>
              <button
                onClick={handleEdit}
                className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
                data-testid="edit-delivery-button"
              >
                Edit
              </button>
            </Text>
          )}
      </div>
      {isOpen ? (
        <>
          <div className="grid">
            <div className="flex flex-col">
              <span className="txt-medium text-ui-fg-base font-medium">
                Shipping method
              </span>
              <span className="txt-medium text-ui-fg-muted mb-4">
                How would you like you order delivered
              </span>
            </div>
            <div data-testid="delivery-options-container">
              <div className="pb-8 pt-2 md:pt-0">
                {hasPickupOptions && (
                  <RadioGroup
                    value={showPickupOptions}
                    onChange={(value) => {
                      const id = _pickupMethods.find(
                        (option) => !option.insufficientInventory
                      )?.id;

                      if (id) {
                        handleSetShippingMethod(id, 'pickup');
                      }
                    }}
                  >
                    <Radio
                      value={PICKUP_OPTION_ON}
                      data-testid="delivery-option-radio"
                      className={clx(
                        'text-small-regular rounded-rounded hover:shadow-borders-interactive-with-active mb-2 flex cursor-pointer items-center justify-between border px-8 py-4',
                        {
                          'border-ui-border-interactive':
                            showPickupOptions === PICKUP_OPTION_ON,
                        }
                      )}
                    >
                      <div className="flex items-center gap-x-4">
                        <MedusaRadio
                          checked={showPickupOptions === PICKUP_OPTION_ON}
                        />
                        <span className="text-base-regular">
                          Pick up your order
                        </span>
                      </div>
                      <span className="text-ui-fg-base justify-self-end">
                        -
                      </span>
                    </Radio>
                  </RadioGroup>
                )}
                <RadioGroup
                  value={shippingMethodId}
                  onChange={(v) => handleSetShippingMethod(v!, 'shipping')}
                >
                  {_shippingMethods?.map((option) => {
                    const isDisabled =
                      option.priceType === 'calculated' &&
                      !isLoadingPrices &&
                      typeof calculatedPricesMap[option.id] !== 'number';

                    return (
                      <Radio
                        key={option.id}
                        value={option.id}
                        data-testid="delivery-option-radio"
                        disabled={isDisabled}
                        className={clx(
                          'text-small-regular rounded-rounded hover:shadow-borders-interactive-with-active mb-2 flex cursor-pointer items-center justify-between border px-8 py-4',
                          {
                            'border-ui-border-interactive':
                              option.id === shippingMethodId,
                            'hover:shadow-brders-none cursor-not-allowed':
                              isDisabled,
                          }
                        )}
                      >
                        <div className="flex items-center gap-x-4">
                          <MedusaRadio
                            checked={option.id === shippingMethodId}
                          />
                          <span className="text-base-regular">
                            {option.name}
                          </span>
                        </div>
                        <span className="text-ui-fg-base justify-self-end">
                          {option.priceType === 'flat_rate' ? (
                            convertToLocale({
                              amount: option.amount!,
                              currency_code: cart?.currencyCode,
                            })
                          ) : calculatedPricesMap[option.id] ? (
                            convertToLocale({
                              amount: calculatedPricesMap[option.id],
                              currency_code: cart?.currencyCode,
                            })
                          ) : isLoadingPrices ? (
                            <Loader />
                          ) : (
                            '-'
                          )}
                        </span>
                      </Radio>
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          </div>

          {showPickupOptions === PICKUP_OPTION_ON && (
            <div className="grid">
              <div className="flex flex-col">
                <span className="txt-medium text-ui-fg-base font-medium">
                  Store
                </span>
                <span className="txt-medium text-ui-fg-muted mb-4">
                  Choose a store near you
                </span>
              </div>
              <div data-testid="delivery-options-container">
                <div className="pb-8 pt-2 md:pt-0">
                  <RadioGroup
                    value={shippingMethodId}
                    onChange={(v) => handleSetShippingMethod(v!, 'pickup')}
                  >
                    {_pickupMethods?.map((option) => {
                      return (
                        <Radio
                          key={option.id}
                          value={option.id}
                          disabled={option.insufficientInventory ?? undefined}
                          data-testid="delivery-option-radio"
                          className={clx(
                            'text-small-regular rounded-rounded hover:shadow-borders-interactive-with-active mb-2 flex cursor-pointer items-center justify-between border px-8 py-4',
                            {
                              'border-ui-border-interactive':
                                option.id === shippingMethodId,
                              'hover:shadow-brders-none cursor-not-allowed':
                                option.insufficientInventory,
                            }
                          )}
                        >
                          <div className="flex items-start gap-x-4">
                            <MedusaRadio
                              checked={option.id === shippingMethodId}
                            />
                            <div className="flex flex-col">
                              <span className="text-base-regular">
                                {option.name}
                              </span>
                            </div>
                          </div>
                          <span className="text-ui-fg-base justify-self-end">
                            {convertToLocale({
                              amount: option.amount!,
                              currency_code: cart?.currencyCode,
                            })}
                          </span>
                        </Radio>
                      );
                    })}
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          <div>
            <ErrorMessage
              error={error}
              data-testid="delivery-option-error-message"
            />
            <Button
              size="large"
              className="mt"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={!cart.shippingMethods?.[0]}
              data-testid="submit-delivery-option-button"
            >
              Continue to payment
            </Button>
          </div>
        </>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && (cart.shippingMethods?.length ?? 0) > 0 && (
              <div className="flex w-1/3 flex-col">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  Method
                </Text>
                <Text className="txt-medium text-ui-fg-subtle">
                  {cart.shippingMethods?.at(-1)?.name}{' '}
                  {convertToLocale({
                    amount: cart?.shippingMethods?.at(-1)?.amount ?? 0,
                    currency_code: cart?.currencyCode,
                  })}
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  );
};

export default Shipping;
