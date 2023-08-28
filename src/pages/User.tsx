import React, { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { RouterPath } from '../models/RouterPath';
import UserProfile from '../components/UserProfile/UserProfile';

const User = () => {
  const navigate = useNavigate();
  const logged: boolean = useAppSelector((state) => state.auth.tokenStore.token > '') ?? false;

  useEffect(() => {
    if (!logged) {
      navigate(RouterPath.HOME);
    }
  }, [logged]);
  return <>{logged && <UserProfile></UserProfile>}</>;
};

export default User;
