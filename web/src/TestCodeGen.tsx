import React from 'react';

import {useQuery, gql} from "@apollo/client"

import {useMyTracksQuery} from "./generated/graphql";

function TestCodeGen() {
  
  // old-way
  const {data, loading} = useQuery(gql`
    query Query {
      tracksForHome {
        id
        auther
      }
    }
  `)

// using code-gen
  const {data: mydata, loading: myLoading} = useMyTracksQuery()
  if(loading || myLoading) return <div>Loading...</div> 
  
  return (
    <>
      <div>{JSON.stringify(data)}</div>
      <div>{JSON.stringify(mydata)}</div>
    </>
  );
}

export default TestCodeGen;
