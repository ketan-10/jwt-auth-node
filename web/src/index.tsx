import React from 'react';
import ReactDOM from 'react-dom';
// import TestCodeGen from './TestCodeGen';
import {Routes} from './components/Routes';

import {ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client"
import { getAccessToken } from './TokenStore';
import { setContext } from "@apollo/client/link/context";

// Apollo Credentials : https://www.apollographql.com/docs/react/networking/authentication/
// Apollo Link: https://www.apollographql.com/docs/react/api/link/introduction/

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
  link: authLink.concat(httpLink),
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById('root')
);
