'use client';

import React, { useEffect } from 'react';

import { Stripe, loadStripe } from '@stripe/stripe-js';

import { getDeviceId } from '@gfed-medusa/sf-lib-common/lib/personalization/device-id';

import StripeWrapper from './stripe-wrapper';

type PaymentWrapperProps = {
  stripeKey?: string;
  children: React.ReactNode;
};

const stripePromiseCache = new Map<string, Promise<Stripe | null>>();

const getStripePromise = (key: string) => {
  const cachedPromise = stripePromiseCache.get(key);
  if (cachedPromise) {
    return cachedPromise;
  }

  const nextPromise = loadStripe(key);
  stripePromiseCache.set(key, nextPromise);
  return nextPromise;
};

const PaymentWrapper: React.FC<PaymentWrapperProps> = ({
  stripeKey,
  children,
}) => {
  const stripePromise = stripeKey ? getStripePromise(stripeKey) : null;

  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        const deviceId = getDeviceId();
        if (!deviceId) return;
        navigator.sendBeacon(
          '/api/checkout/graphql',
          new Blob(
            [
              JSON.stringify({
                query: `mutation SendSignal($input: SignalInput!) { sendSignal(input: $input) { success } }`,
                variables: {
                  input: {
                    deviceId,
                    type: 'CHECKOUT_ABANDON',
                    url: window.location.href,
                    timestamp: Date.now(),
                  },
                },
              }),
            ],
            { type: 'application/json' }
          )
        );
      } catch {}
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  if (stripePromise) {
    return (
      <StripeWrapper stripeKey={stripeKey} stripePromise={stripePromise}>
        {children}
      </StripeWrapper>
    );
  }

  return <div>{children}</div>;
};

export default PaymentWrapper;
