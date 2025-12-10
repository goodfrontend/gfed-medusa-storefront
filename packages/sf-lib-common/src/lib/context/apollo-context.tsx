'use client';

import { PropsWithChildren } from 'react';

import { ApolloProvider } from '@apollo/client/react';

import { useApollo } from '@/lib/hooks/use-apollo';

function ApolloClientProvider({ children }: PropsWithChildren) {
  const storedApolloClient = useApollo();

  return (
    <ApolloProvider client={storedApolloClient}>{children}</ApolloProvider>
  );
}

export { ApolloClientProvider };
