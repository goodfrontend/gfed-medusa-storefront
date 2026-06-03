import { createServerApolloClient, graphqlFetch, graphqlMutation } from '@/lib/gql/apollo-client';

import {
  PERSONALIZE_QUERY,
  SEND_SIGNAL_MUTATION,
  SUBMIT_CONVERSION_MUTATION,
} from '@/lib/personalization/personalization-gql';
import type { StorefrontContext } from './context';

const DEVICE_ID_COOKIE = '_jg_device_id';

export function getDeviceIdFromCookieHeader(cookieHeader?: string): string {
  if (!cookieHeader) return '';
  const match = cookieHeader.match(new RegExp(`${DEVICE_ID_COOKIE}=([^;]+)`));
  return match ? decodeURIComponent(match[1] ?? '') : '';
}

export async function sendSignal(
  type: string,
  ctx: StorefrontContext,
  payload?: Record<string, unknown>,
  url?: string,
): Promise<boolean> {
  const deviceId = getDeviceIdFromCookieHeader(ctx.cookieHeader);

  const apolloClient = createServerApolloClient(ctx.cookieHeader);

  try {
    await graphqlMutation<Record<string, unknown>, { input: Record<string, unknown> }>(
      {
        mutation: SEND_SIGNAL_MUTATION,
        variables: {
          input: {
            deviceId,
            type,
            payload: payload ?? {},
            url: url ?? '',
            timestamp: Date.now(),
          },
        },
      },
      apolloClient
    );
    return true;
  } catch (error) {
    console.warn('[sendSignal] Failed to send signal:', type, error);
    return false;
  }
}

export function sendPageViewSignal(
  surface: string,
  ctx: StorefrontContext,
  payload?: Record<string, unknown>,
): Promise<boolean> {
  return sendSignal('PAGE_VIEW', ctx, { ...payload, surface });
}

export interface PersonalizedComponent {
  component: string;
  contentId: string | null;
  propsOverrides: Record<string, unknown>;
  priority: number;
  reasoning: string;
  score: number;
}

export interface PersonalizationReasoning {
  intent: string;
  confidence: number;
  factors: string[];
  modelVersion: string;
}

export interface PersonalizationResult {
  components: PersonalizedComponent[];
  reasoning: PersonalizationReasoning;
  cacheKey: string;
  servedAt: string;
}

type PersonalizeQueryResult = {
  personalize: PersonalizationResult;
};

type PersonalizeQueryVariables = {
  input: {
    surface: string;
    page: string;
    productId?: string;
    cartValue?: number;
    category?: string;
    searchQuery?: string;
  };
  deviceId: string;
};

export async function getPersonalization(
  surface: string,
  page: string,
  deviceId: string,
  ctx: StorefrontContext,
  context?: {
    productId?: string;
    cartValue?: number;
    category?: string;
    searchQuery?: string;
  },
): Promise<PersonalizationResult | null> {
  const apolloClient = createServerApolloClient(ctx.cookieHeader);

  try {
    const data = await graphqlFetch<PersonalizeQueryResult, PersonalizeQueryVariables>(
      {
        query: PERSONALIZE_QUERY,
        variables: {
          input: {
            surface,
            page,
            ...context,
          },
          deviceId,
        },
      },
      apolloClient
    );

    return data?.personalize ?? null;
  } catch (error) {
    console.error('[getPersonalization]', error);
    return null;
  }
}

interface ConversionInput {
  deviceId: string;
  checkoutSignalId?: string;
  orderId: string;
  amount: number;
  currency: string;
  items?: Array<{ productId: string; variantId?: string; quantity: number; price: number; category?: string }>;
}

export async function submitConversion(
  input: ConversionInput,
  ctx: StorefrontContext
): Promise<boolean> {
  if (!input.deviceId) return false;

  const apolloClient = createServerApolloClient(ctx.cookieHeader);

  try {
    await graphqlMutation<Record<string, boolean>, { input: ConversionInput }>(
      {
        mutation: SUBMIT_CONVERSION_MUTATION,
        variables: { input },
      },
      apolloClient
    );
    return true;
  } catch (error) {
    console.error('[submitConversion] Failed:', error);
    return false;
  }
}
