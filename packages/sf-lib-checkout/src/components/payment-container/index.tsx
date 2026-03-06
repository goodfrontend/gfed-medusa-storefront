import React, { type JSX, useContext, useMemo, useState } from 'react';

import { Radio } from '@gfed-medusa/sf-lib-ui/components/radio';
import { Radio as RadioGroupOption } from '@headlessui/react';
import { CreditCard } from '@medusajs/icons';
import { Text, clx } from '@medusajs/ui';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import {
  StripeCardCvcElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElementOptions,
  StripeElementStyle,
} from '@stripe/stripe-js';

import SkeletonCardDetails from '@/components/skeleton-card-details';
import { isManual } from '@/lib/constants';

import PaymentTest from '../payment-test';
import { StripeContext } from '../payment-wrapper/stripe-wrapper';

type PaymentContainerProps = {
  paymentProviderId: string;
  selectedPaymentOptionId: string | null;
  disabled?: boolean;
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>;
  children?: React.ReactNode;
};

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  children,
}) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <RadioGroupOption
      key={paymentProviderId}
      value={paymentProviderId}
      disabled={disabled}
      className={clx(
        'text-small-regular rounded-rounded hover:shadow-borders-interactive-with-active mb-2 flex cursor-pointer flex-col gap-y-2 border px-8 py-4',
        {
          'border-ui-border-interactive':
            selectedPaymentOptionId === paymentProviderId,
        }
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Radio checked={selectedPaymentOptionId === paymentProviderId} />
          <Text className="text-base-regular">
            {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}
          </Text>
          {isManual(paymentProviderId) && isDevelopment && (
            <PaymentTest className="small:block hidden" />
          )}
        </div>
        <span className="text-ui-fg-base justify-self-end">
          {paymentInfoMap[paymentProviderId]?.icon}
        </span>
      </div>
      {isManual(paymentProviderId) && isDevelopment && (
        <PaymentTest className="small:hidden text-[10px]" />
      )}
      {children}
    </RadioGroupOption>
  );
};

export default PaymentContainer;

const CARD_BRAND_LABELS: Record<string, string> = {
  visa: 'VISA',
  mastercard: 'MC',
  amex: 'AMEX',
  discover: 'DISC',
  diners: 'DINERS',
  jcb: 'JCB',
  unionpay: 'UP',
};

export const StripeCardContainer = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  setCardBrand,
  setError,
  setCardComplete,
}: Omit<PaymentContainerProps, 'children'> & {
  setCardBrand: (brand: string) => void;
  setError: (error: string | null) => void;
  setCardComplete: (complete: boolean) => void;
}) => {
  const stripeReady = useContext(StripeContext);
  const [cardBrandId, setCardBrandId] = useState<string>('');
  const [cardFieldCompletion, setCardFieldCompletion] = useState({
    number: false,
    expiry: false,
    cvc: false,
  });

  const elementStyle: StripeElementStyle = useMemo(() => {
    return {
      base: {
        fontFamily: 'Inter, sans-serif',
        color: '#424270',
        '::placeholder': {
          color: 'rgb(107 114 128)',
        },
      },
    };
  }, []);

  const inputClassName =
    'pt-3 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover transition-all duration-300 ease-in-out';

  const cardNumberOptions: StripeCardNumberElementOptions = useMemo(() => {
    return {
      style: elementStyle,
      classes: {
        base: `${inputClassName} pr-16`,
      },
    };
  }, [elementStyle]);

  const cardExpiryOptions: StripeCardExpiryElementOptions = useMemo(() => {
    return {
      style: elementStyle,
      classes: {
        base: inputClassName,
      },
    };
  }, [elementStyle]);

  const cardCvcOptions: StripeCardCvcElementOptions = useMemo(() => {
    return {
      style: elementStyle,
      classes: {
        base: inputClassName,
      },
    };
  }, [elementStyle]);

  const updateCardCompletion = (
    nextState: Partial<typeof cardFieldCompletion>
  ) => {
    setCardFieldCompletion((prevState) => {
      const mergedState = { ...prevState, ...nextState };
      setCardComplete(
        mergedState.number && mergedState.expiry && mergedState.cvc
      );
      return mergedState;
    });
  };

  return (
    <PaymentContainer
      paymentProviderId={paymentProviderId}
      selectedPaymentOptionId={selectedPaymentOptionId}
      paymentInfoMap={paymentInfoMap}
      disabled={disabled}
    >
      {selectedPaymentOptionId === paymentProviderId &&
        (stripeReady ? (
          <div className="my-4 transition-all duration-150 ease-in-out">
            <Text className="txt-medium-plus text-ui-fg-base mb-1">
              Enter your card details:
            </Text>
            <div className="space-y-3">
              <div className="relative">
                <CardNumberElement
                  options={cardNumberOptions}
                  onChange={(event) => {
                    const brand = event.brand || '';
                    setCardBrandId(brand);
                    setCardBrand(
                      brand && brand.charAt(0).toUpperCase() + brand.slice(1)
                    );
                    setError(event.error?.message || null);
                    updateCardCompletion({ number: event.complete });
                  }}
                />
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  {CARD_BRAND_LABELS[cardBrandId] ? (
                    <span className="text-ui-fg-base border-ui-border-base inline-flex min-w-11 items-center justify-center rounded border bg-white px-2 py-1 text-[10px] font-semibold leading-none">
                      {CARD_BRAND_LABELS[cardBrandId]}
                    </span>
                  ) : (
                    <CreditCard className="text-ui-fg-subtle" />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <CardExpiryElement
                  options={cardExpiryOptions}
                  onChange={(event) => {
                    setError(event.error?.message || null);
                    updateCardCompletion({ expiry: event.complete });
                  }}
                />
                <CardCvcElement
                  options={cardCvcOptions}
                  onChange={(event) => {
                    setError(event.error?.message || null);
                    updateCardCompletion({ cvc: event.complete });
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <SkeletonCardDetails />
        ))}
    </PaymentContainer>
  );
};
