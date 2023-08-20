import React, { useEffect } from 'react';
import Main from './Main';
import { useAppDispatch } from '../store/hooks';
import { actions as authActions } from '../store/auth.slice';

const Logout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authActions.logout());
  }, []);
  return <Main />;
};

export default Logout;
