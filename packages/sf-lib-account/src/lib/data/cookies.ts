import { cookies as nextCookies } from 'next/headers';

import 'server-only';

// TODO: MDS-80 When all SDK calls to Medusa are completely refactored to use BFF
// then we can remove this auth implementation. For now, since there
// are existing calls to the Medusa API using the SDK, we need to manage
// SDK authentication client-side also.
export const setAuthToken = async (token: string) => {
  const cookies = await nextCookies();
  cookies.set('_medusa_jwt', token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
};

export const removeAuthToken = async () => {
  const cookies = await nextCookies();
  cookies.set('_medusa_jwt', '', {
    maxAge: -1,
  });
};
