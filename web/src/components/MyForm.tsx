import React from 'react';
import {Formik, Form, Field, FormikConfig} from 'formik';

// Formik by Ben Awad "https://www.youtube.com/watch?v=FD50LPJ6bjE" 

const formData = {myUserName: '', myPassword: ''}; 
export type FormData = typeof formData;

interface Props {
  // https://stackoverflow.com/questions/36311284/is-there-a-way-to-extract-the-type-of-typescript-interface-property
  onSubmit: FormikConfig<FormData>['onSubmit'],
}

export const MyForm : React.FC<Props> = ({onSubmit}) => {
  return (
    <>
    <Formik initialValues={formData}
      onSubmit={onSubmit}  
      validate={(value)=>{
        const errors = {} as typeof value;
        if (!value.myUserName) {
          errors.myUserName = 'Please enter your username';
        }
        if (!value.myPassword) {
          errors.myPassword = 'Please enter your password';
        }
        return errors;
      }}
    >
      {({values, errors, touched, handleChange})=>(
          <Form>
            <div>
              <label>User Name</label>
              <input type="text" name="myUserName" value={values.myUserName} onChange={handleChange} required/>
            </div>
            <div>
              <label>Password </label>
              <Field type="input" name="myPassword" required/>
            </div>
            <div>
              <button type="submit">Register</button>
            </div>
            <p>{JSON.stringify(errors)}</p>
          </Form>
        )
      }
    </Formik>
    
    </>
  );
}