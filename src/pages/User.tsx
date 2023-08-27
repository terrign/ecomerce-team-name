import React, { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { RouterPath } from '../models/RouterPath';
const User = () => {
  const isLogged = useAppSelector((state) => Boolean(state.auth.tokenStore.token));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate(RouterPath.LOGIN);
  }, []);

  if (!isLogged) {
    return <></>;
  }
  return <div>User profile</div>;
};

export default User;
