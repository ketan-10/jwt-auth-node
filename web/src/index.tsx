import React from 'react';
import ReactDOM from 'react-dom';
// import TestCodeGen from './TestCodeGen';
import {Routes} from './components/Routes';

import {ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client"
import { getAccessToken, setAccessToken } from './TokenStore';
import { setContext } from "@apollo/client/link/context";
import jwtDecode from 'jwt-decode';

// Apollo Credentials : https://www.apollographql.com/docs/react/networking/authentication/
// Apollo Link: https://www.apollographql.com/docs/react/api/link/introduction/

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const currentToken = getAccessToken();
  let token = currentToken;
  if(currentToken){
    const decode = jwtDecode(currentToken) as {exp: number};
   
    console.log(decode);
    // If token is expired. refetch...
    if(Date.now() >= decode?.exp * 1000){
      const result = await fetch("http://localhost:4000/refreshTheAccessToken", {
        credentials: 'include',  // 'uses cookie: containing refresh_token' 
        method: 'POST',
      });
      const {accessToken} = await result.json();
      setAccessToken(accessToken);
      token = accessToken;
    }
  }
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
