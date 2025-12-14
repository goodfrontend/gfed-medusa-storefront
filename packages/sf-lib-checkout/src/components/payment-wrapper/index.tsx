'use client';

import React from 'react';

import { isStripe } from '@lib/constants';
import { Cart } from '@lib/gql/generated-types/graphql';
import { camelToSnakeCase } from '@lib/util/normalizeFunctions';
import { loadStripe } from '@stripe/stripe-js';

import StripeWrapper from './stripe-wrapper';

type PaymentWrapperProps = {
  cart: Cart;
  children: React.ReactNode;
};

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

const PaymentWrapper: React.FC<PaymentWrapperProps> = ({ cart, children }) => {
  const paymentSession = cart.paymentCollection?.paymentSessions?.find(
    (s) => s?.status === 'pending'
  );

  if (
    paymentSession?.providerId &&
    isStripe(paymentSession.providerId) &&
    stripePromise
  ) {
    return (
      <StripeWrapper
        paymentSession={camelToSnakeCase(paymentSession)}
        stripeKey={stripeKey}
        stripePromise={stripePromise}
      >
        {children}
      </StripeWrapper>
    );
  }

  return <div>{children}</div>;
};

export default PaymentWrapper;
