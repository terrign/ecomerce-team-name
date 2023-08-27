import React from 'react';
import {
  UserOutlined,
  HomeOutlined,
  UserAddOutlined,
  LogoutOutlined,
  LoginOutlined,
  ProfileOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import getMenuItem from './getMenuItem';
import { RouterPath } from '../models/RouterPath';
import { useAppSelector } from '../store/hooks';

const getMainMenuItemList = () => {
  const isLogged = useAppSelector((state) => Boolean(state.auth.tokenStore.token));
  return [
    getMenuItem(<NavLink to={RouterPath.HOME}>Home</NavLink>, RouterPath.HOME, <HomeOutlined />),
    getMenuItem(<NavLink to={RouterPath.CATALOG}>Catalog</NavLink>, RouterPath.CATALOG, <ShopOutlined />),
    getMenuItem(
      'User',
      'UserActions',
      <UserOutlined />,
      isLogged
        ? [
            getMenuItem(<NavLink to={RouterPath.USER}>Profile</NavLink>, RouterPath.USER, <ProfileOutlined />),
            getMenuItem('Logout', 'Logout', <LogoutOutlined />),
          ]
        : [
            getMenuItem(<NavLink to={RouterPath.LOGIN}>Login</NavLink>, RouterPath.LOGIN, <LoginOutlined />),
            getMenuItem(<NavLink to={RouterPath.REG}>Registration</NavLink>, RouterPath.REG, <UserAddOutlined />),
          ]
    ),
  ];
};

export default getMainMenuItemList;
