import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { offsetLimitPagination } from '@apollo/client/utilities';
import offsetLimitPaginationInput from 'utils/helpers/offsetLimitPaginationInput';

const graphqlUri = 'http://localhost:4000/graphql';

const httpLink = new HttpLink({
  uri: graphqlUri,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('ugctent-token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getJobs: {
          keyArgs: false,
          merge: offsetLimitPaginationInput,
        },
        getSubmissionsForJob: offsetLimitPagination(['jobId', 'offset']),
        getCommentsByEntityId: offsetLimitPagination(['entityId', 'entityType']),
        getCreators: offsetLimitPagination(['skillIds', 'interestIds', 'minRating', 'limit', 'offset', 'search']),
        getJobsForCreator: {
          keyArgs: false,
          merge: offsetLimitPaginationInput
        },
        getJobsForBusinessUser: {
          keyArgs: false,
          merge: offsetLimitPaginationInput
        }
      }
    }
  }
});
export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});
