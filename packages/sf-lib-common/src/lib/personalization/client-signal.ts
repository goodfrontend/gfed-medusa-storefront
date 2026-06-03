import { graphqlMutation } from '@/lib/gql/apollo-client';
import { SEND_SIGNAL_MUTATION } from '@/lib/personalization/personalization-gql';
import { getDeviceId } from '@/lib/personalization/device-id';
import type { SignalInput, SignalType } from '@/types/graphql';

/**
 * Sends a personalization signal from the browser.
 *
 * Uses the default Apollo client which proxies through the shell's /api/graphql
 * route. The proxy injects the x-bff-api-key header server-side, keeping the
 * shared secret out of client-side code.
 *
 * For server-side signals, use `sendSignal()` from `@gfed-medusa/sf-lib-common/lib/data/personalization`
 * which creates an authenticated client with the API key.
 */
export async function sendClientSignal(
  type: SignalType,
  payload?: Record<string, unknown>,
): Promise<boolean> {
  const deviceId = getDeviceId();
  if (!deviceId) return false;

  const input: SignalInput = {
    deviceId,
    type,
    payload,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    timestamp: Date.now(),
  };

  // Try Apollo client mutation first
  try {
    await graphqlMutation({
      mutation: SEND_SIGNAL_MUTATION,
      variables: { input },
    });
    return true;
  } catch (apolloError) {
    console.warn(
      '[sendClientSignal] Apollo mutation failed, trying fetch fallback:',
      type,
      apolloError
    );
  }

  // Fallback: direct fetch to /api/graphql
  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        query: `mutation SendSignal($input: SignalInput!) { sendSignal(input: $input) { success } }`,
        variables: { input },
      }),
    });
    if (!res.ok) {
      console.warn(
        '[sendClientSignal] Fetch fallback failed:',
        type,
        res.status,
        res.statusText
      );
      return false;
    }
    return true;
  } catch (fetchError) {
    console.warn('[sendClientSignal] Fetch fallback also failed:', type, fetchError);
    return false;
  }
}
