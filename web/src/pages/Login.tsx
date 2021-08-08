import React from 'react';
import { MyForm } from '../components/MyForm';

import {useLoginUserMutation} from '../generated/graphql';
import { setAccessToken } from '../TokenStore';

export const Login : React.FC = () => {

  const [loginUser] = useLoginUserMutation();
  return (
    <>
      <MyForm onSubmit={
        async (data, {setSubmitting})=>{
          setSubmitting(true);
          const token = await loginUser({
            variables:{
              loginEmail: data.myUserName,
              loginPassword: data.myPassword,
            }
          });

          setAccessToken(token.data?.login?.accessToken!);

          setSubmitting(false);
        }
      }/>
    </>
  );
}