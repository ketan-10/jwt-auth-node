import React from 'react';
import { useHistory } from 'react-router-dom';
import { MyForm } from '../components/MyForm';

import {useLoginUserMutation} from '../generated/graphql';
import { setAccessToken } from '../TokenStore';

export const Login : React.FC = () => {

  const [loginUser] = useLoginUserMutation();
  const history = useHistory();
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
          history.push("/");
        }
      }/>
    </>
  );
}