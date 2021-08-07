import React from 'react';
import { MyForm } from '../components/MyForm';

// Formic by Ben Awad "https://www.youtube.com/watch?v=FD50LPJ6bjE" 


export const Register : React.FC = () => {
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