import { graphqlMutation } from '@/lib/gql/apollo-client';
import { SEND_SIGNAL_MUTATION } from '@/lib/personalization/personalization-gql';
import { getDeviceId } from '@/lib/personalization/device-id';
import type { SignalInput, SignalType } from '@/types/graphql';

// Module-level cache for the resolved customer ID
// userIdChecked tracks whether we've attempted resolution
let resolvedUserId: string | undefined;
let userIdPromise: Promise<string | undefined> | null = null;
let userIdChecked = false;

/**
 * Resolves the current user's ID by fetching /api/horz/customer.
 * Results are cached module-globally so the endpoint is only called once
 * per page session (the cache resets on module reload / page refresh).
 */
async function resolveUserId(): Promise<string | undefined> {
  if (userIdChecked) return resolvedUserId;
  if (userIdPromise) return userIdPromise;

  userIdPromise = (async () => {
    try {
      const res = await fetch('/api/horz/customer', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        resolvedUserId = data?.customer?.id ?? undefined;
      }
    } catch {
      // Network error — resolvedUserId stays undefined
    }
    userIdChecked = true;
    userIdPromise = null;
    return resolvedUserId;
  })();

  return userIdPromise;
}

/**
 * Resets the cached user ID. Call this after login/logout to ensure
 * subsequent signals carry the correct userId.
 */
export function invalidateUserId(): void {
  resolvedUserId = undefined;
  userIdPromise = null;
  userIdChecked = false;
}

/**
 * Sends a personalization signal from the browser.
 *
 * Uses the default Apollo client which proxies through the shell's /api/graphql
 * route. The proxy injects the x-bff-api-key header server-side, keeping the
 * shared secret out of client-side code.
 *
 * For server-side signals, use `sendSignal()` from `@gfed-medusa/sf-lib-common/lib/data/personalization`
 * which creates an authenticated client with the API key.
 *
 * If `userId` is not provided, it is automatically resolved by fetching
 * `/api/horz/customer` (cached once per page session).
 */
export async function sendClientSignal(
  type: SignalType,
  payload?: Record<string, unknown>,
  userId?: string
): Promise<boolean> {
  const deviceId = getDeviceId();
  if (!deviceId) return false;

  // Auto-resolve userId if not explicitly provided
  if (!userId) {
    userId = await resolveUserId();
  }

  const input: SignalInput = {
    deviceId,
    type,
    payload: payload ?? undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    timestamp: Date.now(),
  };

  if (userId) {
    input.userId = userId;
  }

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
