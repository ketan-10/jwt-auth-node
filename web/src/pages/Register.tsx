import React from 'react';
import { MyForm } from '../components/MyForm';
import {useRegisterUserMutation} from '../generated/graphql';

export const Register : React.FC = () => {

  const [registerUser] = useRegisterUserMutation();
  return (
    <>
      <MyForm onSubmit={
        async (data, {setSubmitting})=>{
          setSubmitting(true);
          await registerUser({
            variables:{
              registerEmail: data.myUserName,
              registerPassword: data.myPassword,
            }
          });
          setSubmitting(false);
        }
      }/>
    </>
  );
}