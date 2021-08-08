import React from 'react';
import { useHistory } from 'react-router-dom';
import { MyForm } from '../components/MyForm';
import {useRegisterUserMutation} from '../generated/graphql';

export const Register : React.FC = () => {

  const [registerUser] = useRegisterUserMutation();
  const history = useHistory();
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
          history.push("/login");
        }
      }/>
    </>
  );
}