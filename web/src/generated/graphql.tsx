import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  login: LoginResponse;
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type NestedObject = {
  __typename?: 'NestedObject';
  value: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  tracksForHome: Array<Track>;
};

export type Track = {
  __typename?: 'Track';
  id: Scalars['String'];
  name: Scalars['String'];
  auther?: Maybe<Scalars['String']>;
  nestedObject?: Maybe<NestedObject>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  tokenVersion: Scalars['Int'];
};

export type MyTracksQueryVariables = Exact<{ [key: string]: never; }>;


export type MyTracksQuery = { __typename?: 'Query', tracksForHome: Array<{ __typename?: 'Track', id: string, auther?: Maybe<string> }> };


export const MyTracksDocument = gql`
    query MyTracks {
  tracksForHome {
    id
    auther
  }
}
    `;

/**
 * __useMyTracksQuery__
 *
 * To run a query within a React component, call `useMyTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTracksQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyTracksQuery(baseOptions?: Apollo.QueryHookOptions<MyTracksQuery, MyTracksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyTracksQuery, MyTracksQueryVariables>(MyTracksDocument, options);
      }
export function useMyTracksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyTracksQuery, MyTracksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyTracksQuery, MyTracksQueryVariables>(MyTracksDocument, options);
        }
export type MyTracksQueryHookResult = ReturnType<typeof useMyTracksQuery>;
export type MyTracksLazyQueryHookResult = ReturnType<typeof useMyTracksLazyQuery>;
export type MyTracksQueryResult = Apollo.QueryResult<MyTracksQuery, MyTracksQueryVariables>;