import React from 'react';

import {useQuery, gql} from "@apollo/client"

function App() {
  
  const {data, loading, error} = useQuery(gql`
    query Query {
      tracksForHome {
        id
        auther
      }
    }

  `)

  if(loading) return <div>Loading...</div> 
  if(!data) return <div>No Data... {JSON.stringify(error)}</div>
  return (
    <div>{JSON.stringify(data)}</div>
  );
}

export default App;
