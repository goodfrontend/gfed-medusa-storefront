'use client';

import React from 'react';

import { loadStripe } from '@stripe/stripe-js';

import { Cart } from '@/lib/gql/generated-types/graphql';

import StripeWrapper from './stripe-wrapper';

type PaymentWrapperProps = {
  cart: Cart;
  children: React.ReactNode;
};

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

const PaymentWrapper: React.FC<PaymentWrapperProps> = ({ children }) => {
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
