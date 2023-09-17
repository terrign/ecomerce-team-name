import React from 'react';
import { UserAddOutlined, LogoutOutlined, LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import getMenuItem from './getMenuItem';
import { RouterPath } from '../models/RouterPath';
import { useAppSelector } from '../store/hooks';
import { UserType } from '../store/auth.slice';

import ThemeSwitch from '../components/UI/ThemeSwitch';

const getUserMenuItemList = () => {
  const userType = useAppSelector((state) => state.auth.userType);

  return userType === UserType.CUSTOMER
    ? [
        getMenuItem(<Link to={RouterPath.USER}>Profile</Link>, RouterPath.USER, <ProfileOutlined />),
        getMenuItem('Logout', 'Logout', <LogoutOutlined />),
        ThemeSwitch(),
      ]
    : [
        getMenuItem(<Link to={RouterPath.LOGIN}>Login</Link>, RouterPath.LOGIN, <LoginOutlined />),
        getMenuItem(<Link to={RouterPath.REG}>Registration</Link>, RouterPath.REG, <UserAddOutlined />),
        ThemeSwitch(),
      ];
};

export default getUserMenuItemList;
