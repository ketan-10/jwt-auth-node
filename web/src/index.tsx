import React from 'react';
import ReactDOM from 'react-dom';
import TestCodeGen from './TestCodeGen';

import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client"


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <TestCodeGen />
  </ApolloProvider>,
  document.getElementById('root')
);
