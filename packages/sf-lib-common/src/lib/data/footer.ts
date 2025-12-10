import { graphqlFetch } from '@/lib/gql/apollo-client';
import { GET_FOOTER_QUERY } from '@/lib/gql/queries/footer';
import { GetFooterQuery, GetFooterQueryVariables } from '@/types/graphql';

export const getFooterContent = async () => {
  try {
    const data = await graphqlFetch<GetFooterQuery, GetFooterQueryVariables>({
      query: GET_FOOTER_QUERY,
    });
    return data?.footer || null;
  } catch (error) {
    console.error('Error fetching footer content:', error);
    return null;
  }
};
