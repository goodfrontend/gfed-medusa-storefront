import { IncomingMessage } from 'http';

import { ApolloLink } from '@apollo/client';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  OperationVariables,
} from '@apollo/client';

const isServer = () => typeof window === 'undefined';

const httpLink = new HttpLink({
  uri: isServer()
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`
    : '/api/graphql',
  credentials: 'include',
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({}),
  defaultOptions: {
    watchQuery: {
      notifyOnNetworkStatusChange: true,
    },
  },
});

/**
 * When requests are sent from the server, cookies need to be manually attached.
 *
 * @param cookieHeader Cookies string to forward
 * @returns Server-side Apollo client
 */
export function createServerApolloClient(cookieHeader?: string) {
  const authLink = new ApolloLink((operation, forward) => {
    if (cookieHeader) {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          Cookie: cookieHeader,
        },
      }));
    }
    return forward(operation);
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({}),
    defaultOptions: {
      watchQuery: {
        notifyOnNetworkStatusChange: true,
      },
    },
  });
}

export function initializeApollo(req: IncomingMessage | null = null) {
  if (isServer()) {
    const cookieHeader = req?.headers.cookie;
    return createServerApolloClient(cookieHeader);
  }

  return apolloClient;
}

export async function graphqlFetch<
  TResult,
  TVariables extends OperationVariables,
>(
  options: ApolloClient.QueryOptions<TResult, TVariables>,
  apolloClientOverride?: ApolloClient
): Promise<TResult | undefined> {
  try {
    const client = apolloClientOverride || apolloClient;

    const { data } = await client.query<TResult, TVariables>({
      ...options,
      fetchPolicy: 'network-only',
    });

    return data;
  } catch (error: any) {
    // TODO - Better error handling
    throw new Error(error.message || 'GraphQL error');
  }
}

export async function graphqlMutation<
  TResult,
  TVariables extends OperationVariables,
>(
  options: ApolloClient.MutateOptions<TResult, TVariables>,
  apolloClientOverride?: ApolloClient
): Promise<TResult | undefined> {
  try {
    const client = apolloClientOverride || apolloClient;

    const { data } = await client.mutate<TResult, TVariables>({
      ...options,
      fetchPolicy: 'network-only',
    });

    return data;
  } catch (error: any) {
    // TODO - Better error handling
    throw new Error(error.message || 'GraphQL error');
  }
}
export default apolloClient;
