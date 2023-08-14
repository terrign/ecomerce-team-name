import React from 'react';
import BaseForm from '../components/BaseForm';

const Login = () => {
  const submitHandler = () => {};
  return <BaseForm formName="login" onSubmit={submitHandler} buttonText="Login" />;
};

export default Login;
