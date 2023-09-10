import React, { useEffect } from 'react';
import LoginForm from '../components/Forms/LoginForm';
import { useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { RouterPath } from '../models/RouterPath';
import { UserType } from '../store/auth.slice';

const Login = () => {
  const navigate = useNavigate();
  const userType = useAppSelector((state) => state.auth.userType);
  useEffect(() => {
    if (userType === UserType.CUSTOMER) navigate(RouterPath.HOME);
  }, [userType]);

  return <> {userType !== UserType.CUSTOMER && <LoginForm />} </>;
};

export default Login;
