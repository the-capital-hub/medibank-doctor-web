import { ApolloClient, InMemoryCache, createHttpLink,} from '@apollo/client';
const token = localStorage.getItem('auth-token');
const httpLink = createHttpLink({
  uri: 'https://ec2-3-94-100-11.compute-1.amazonaws.com:4000/graphql', // Replace with your actual GraphQL endpoint
  credentials: 'same-origin', // If you need to send cookies
  headers: {
    'Authorization': `Bearer ${token}`, // Add any necessary auth tokens
    'Content-Type': 'application/json',
  },
});
// const errorLink = onError(({ networkError, graphQLErrors }) => {
//   if (graphQLErrors) {
//     graphQLErrors.forEach(({ message, locations, path }) => {
//       console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
//     });
//   }
//   if (networkError) {
//     console.log(`[Network error]: ${networkError}`);
//   }
// });
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default client;