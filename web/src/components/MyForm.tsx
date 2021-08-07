import React from 'react';
import {Formik, Form, Field} from 'formik';

// Formik by Ben Awad "https://www.youtube.com/watch?v=FD50LPJ6bjE" 

const formData = {myUserName: '', myPassword: ''}; 
export type FormData = typeof formData;

interface Props {
  onSubmit: (formData: FormData) => void,
}

export const MyForm : React.FC<Props> = ({onSubmit}) => {
  return (
    <>
    <Formik initialValues={formData}
      onSubmit={onSubmit}  
    >
      {({values, handleChange})=>(
          <Form>
            <div>
              <label>User Name</label>
              <input type="text" name="myUserName" value={values.myUserName} onChange={handleChange} />
            </div>
            <div>
              <label>Password </label>
              <Field type="input" name="myPassword"/>
            </div>
            <div>
              <button type="submit">Register</button>
            </div>
          </Form>
        )
      }
    </Formik>
    </>
  );
}