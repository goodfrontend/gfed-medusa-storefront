'use client';

import React from 'react';

import { Stripe, loadStripe } from '@stripe/stripe-js';

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
