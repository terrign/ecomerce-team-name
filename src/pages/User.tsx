import React, { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { RouterPath } from '../models/RouterPath';
import UserProfile from '../components/UserProfile/UserProfile';
import { UserType } from '../store/auth.slice';

const User = () => {
  const navigate = useNavigate();
  const userType = useAppSelector((state) => state.auth.userType);
  useEffect(() => {
    if (userType !== UserType.CUSTOMER) navigate(RouterPath.LOGIN);
  }, [userType]);

  return <>{userType === UserType.CUSTOMER && <UserProfile></UserProfile>}</>;
};

export default User;
