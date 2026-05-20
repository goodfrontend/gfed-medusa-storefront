import { graphqlMutation } from '@/lib/gql/apollo-client';
import { SEND_SIGNAL_MUTATION } from '@/lib/personalization/personalization-gql';
import { getDeviceId } from '@/lib/personalization/device-id';
import type { SignalType } from '@/types/graphql';

/**
 * Sends a personalization signal from the browser.
 *
 * Uses the default Apollo client which proxies through the MFE's /api/graphql
 * route. This route forwards cookies but does NOT inject the x-bff-api-key header
 * (the BFF gateway handles auth for browser-originated requests differently).
 *
 * For server-side signals, use `sendSignal()` from `@gfed-medusa/sf-lib-common/lib/data/personalization`
 * which creates an authenticated client with the API key.
 */
export async function sendClientSignal(
  type: SignalType,
  payload?: Record<string, unknown>,
  userId?: string
): Promise<boolean> {
  const deviceId = getDeviceId();
  if (!deviceId) return false;

  const url = typeof window !== 'undefined' ? window.location.href : '';

  try {
    await graphqlMutation({
      mutation: SEND_SIGNAL_MUTATION,
      variables: {
        input: {
          deviceId,
          ...(userId ? { userId } : {}),
          type,
          payload: payload ?? {},
          url,
          timestamp: Date.now(),
        },
      },
    });
    return true;
  } catch {
    return false;
  }
}
