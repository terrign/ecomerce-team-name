import React, { useEffect } from 'react';
import RegistrationForm from '../components/Forms/RegistrationForm';
import { useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { RouterPath } from '../models/RouterPath';

const Registration = () => {
  const navigate = useNavigate();
  const logged: boolean = useAppSelector((state) => state.auth.tokenStore.token > '') ?? false;
  useEffect(() => {
    if (logged) navigate(RouterPath.HOME);
  }, [logged]);

  return <> {!logged && <RegistrationForm />} </>;
};

export default Registration;
