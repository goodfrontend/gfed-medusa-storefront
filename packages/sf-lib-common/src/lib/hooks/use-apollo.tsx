import { useMemo } from 'react';

import { initializeApollo } from '@/lib/gql/apollo-client';

export function useApollo() {
  const storedClient = useMemo(initializeApollo, []);

  return storedClient;
}
