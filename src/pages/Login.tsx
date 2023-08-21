import React, { useEffect } from 'react';
import LoginForm from '../components/Forms/LoginForm';
import { useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { RouterPath } from '../models/RouterPath';

const Login = () => {
  const navigate = useNavigate();
  const logged: boolean = useAppSelector((state) => state.auth.token > '') ?? false;
  useEffect(() => {
    if (logged) navigate(RouterPath.HOME);
  }, [logged]);

  return <> {!logged && <LoginForm />} </>;
};

export default Login;
