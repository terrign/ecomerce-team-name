import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouterPath } from '../models/RouterPath';

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(RouterPath.HOME);
  }, []);
  return <></>;
};

export default Logout;
