import React from 'react';
import { UserAddOutlined, LogoutOutlined, LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import getMenuItem from './getMenuItem';
import { RouterPath } from '../models/RouterPath';
import { useAppSelector } from '../store/hooks';

const getUserMenuItemList = () => {
  const isLogged = useAppSelector((state) => Boolean(state.auth.tokenStore.token));
  return isLogged
    ? [
        getMenuItem(<Link to={RouterPath.USER}>Profile</Link>, RouterPath.USER, <ProfileOutlined />),
        getMenuItem('Logout', 'Logout', <LogoutOutlined />),
      ]
    : [
        getMenuItem(<Link to={RouterPath.LOGIN}>Login</Link>, RouterPath.LOGIN, <LoginOutlined />),
        getMenuItem(<Link to={RouterPath.REG}>Registration</Link>, RouterPath.REG, <UserAddOutlined />),
      ];
};

export default getUserMenuItemList;
