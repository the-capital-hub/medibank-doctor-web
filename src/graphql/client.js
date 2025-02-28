import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';
// http://ec2-3-94-100-11.compute-1.amazonaws.com:8080/graphql
const httpLink = createHttpLink({
  uri: 'http://ec2-3-94-100-11.compute-1.amazonaws.com:8080/graphql', // Replace with your actual GraphQL endpoint
  credentials: 'include', // This ensures cookies are sent with requests
  headers: {
    'Content-Type': 'application/json',
    
  },
});
console.log(httpLink);
// const authLink = setContext((_, { headers }) => {
//   const token = Cookies.get('token');
//   console.log(token);
//   return {
//     headers: {
//       ...headers,
//       Authorization: `Bearer ${token}`,
//     },
//   };
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