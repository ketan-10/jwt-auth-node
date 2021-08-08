import React from 'react';
import { MyForm } from '../components/MyForm';

export const Login : React.FC = () => {
  return (
    <>
      <MyForm onSubmit={
        (data)=>{
          console.log(data);
        }
      }/>
    </>
  );
}