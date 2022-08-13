import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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

const cache = new InMemoryCache();
export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});
