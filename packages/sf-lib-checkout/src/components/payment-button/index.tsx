'use client';

import React, { useState } from 'react';

import { ErrorMessage } from '@gfed-medusa/sf-lib-common/components/error-message';
import { useStorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import { Button } from '@medusajs/ui';
import { useElements, useStripe } from '@stripe/react-stripe-js';

import { isManual, isStripe } from '@/lib/constants';
import { placeOrder } from '@/lib/data/cart';
import { Cart } from '@/lib/gql/generated-types/graphql';

type PaymentButtonProps = {
  cart: Cart;
  'data-testid': string;
};

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  'data-testid': dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shippingAddress ||
    !cart.billingAddress ||
    !cart.email ||
    (cart.shippingMethods?.length ?? 0) < 1;

  const paymentSession = cart.paymentCollection?.paymentSessions?.[0];

  switch (true) {
    case isStripe(paymentSession?.providerId):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      );
    case isManual(paymentSession?.providerId):
      return (
        <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} />
      );
    default:
      return <Button disabled>Select a payment method</Button>;
  }
};

const StripePaymentButton = ({
  cart,
  notReady,
  'data-testid': dataTestId,
}: {
  cart: Cart;
  notReady: boolean;
  'data-testid'?: string;
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const ctx = useStorefrontContext();

  const onPaymentCompleted = async () => {
    await placeOrder(undefined, ctx)
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const stripe = useStripe();
  const elements = useElements();
  const card = elements?.getElement('card');

  const session = cart.paymentCollection?.paymentSessions?.find(
    (s) => s?.status === 'pending'
  );

  const disabled = !stripe || !elements ? true : false;

  const handlePayment = async () => {
    setSubmitting(true);

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false);
      return;
    }

    await stripe
      .confirmCardPayment(session?.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              cart.billingAddress?.firstName +
              ' ' +
              cart.billingAddress?.lastName,
            address: {
              city: cart.billingAddress?.city ?? undefined,
              country: cart.billingAddress?.countryCode ?? undefined,
              line1: cart.billingAddress?.address1 ?? undefined,
              line2: cart.billingAddress?.address2 ?? undefined,
              postal_code: cart.billingAddress?.postalCode ?? undefined,
              state: cart.billingAddress?.province ?? undefined,
            },
            email: cart.email ?? undefined,
            phone: cart.billingAddress?.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent;

          if (
            (pi && pi.status === 'requires_capture') ||
            (pi && pi.status === 'succeeded')
          ) {
            onPaymentCompleted();
          }

          setErrorMessage(error.message || null);
          return;
        }

        if (
          (paymentIntent && paymentIntent.status === 'requires_capture') ||
          paymentIntent.status === 'succeeded'
        ) {
          return onPaymentCompleted();
        }

        return;
      });
  };

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
      >
        Place order
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  );
};

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const ctx = useStorefrontContext();

  const onPaymentCompleted = async () => {
    await placeOrder(undefined, ctx)
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handlePayment = () => {
    setSubmitting(true);

    onPaymentCompleted();
  };

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid="submit-order-button"
      >
        Place order
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  );
};

export default PaymentButton;
