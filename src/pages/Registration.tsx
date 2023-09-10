import React, { useEffect } from 'react';
import RegistrationForm from '../components/Forms/RegistrationForm';
import { useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { RouterPath } from '../models/RouterPath';
import { UserType } from '../store/auth.slice';

const Registration = () => {
  const navigate = useNavigate();
  const userType = useAppSelector((state) => state.auth.userType);
  useEffect(() => {
    if (userType === UserType.CUSTOMER) navigate(RouterPath.HOME);
  }, [userType]);

  return <> {userType !== UserType.CUSTOMER && <RegistrationForm />} </>;
};

export default Registration;
