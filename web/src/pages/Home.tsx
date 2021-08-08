import React from 'react';
import { useGetAllUsersQuery } from '../generated/graphql';

export const Home : React.FC = () => {

  const {data,loading,error} = useGetAllUsersQuery();

  if(loading) return <div>Loading..</div>;
  if(error) return <div>{JSON.stringify(error)}</div>;
  return (
    <div>
      {data?.users.map(user => 
        <p key={user.id}>{user.email}, {user.tokenVersion}</p>
      )}
    </div>
  );
}