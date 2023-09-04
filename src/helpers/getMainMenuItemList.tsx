import React from 'react';
import {
  UserOutlined,
  HomeOutlined,
  UserAddOutlined,
  LogoutOutlined,
  LoginOutlined,
  ProfileOutlined,
  ShopOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import getMenuItem from './getMenuItem';
import { RouterPath } from '../models/RouterPath';
import { useAppSelector } from '../store/hooks';
import useCategoryTree from '../hooks/useCategoryTree';

const getMainMenuItemList = () => {
  const isLogged = useAppSelector((state) => Boolean(state.auth.tokenStore.token));
  const categories = useCategoryTree();

  return [
    getMenuItem(<NavLink to={RouterPath.HOME}>Home</NavLink>, RouterPath.HOME, <HomeOutlined />),
    getMenuItem(
      <NavLink to={RouterPath.CATALOG}>Catalog</NavLink>,
      RouterPath.CATALOG,
      <ShopOutlined />,
      categories.map((category) => {
        return getMenuItem(
          <NavLink to={`${RouterPath.CATALOG}/${category.slug}`}>{category.name}</NavLink>,
          `${RouterPath.CATALOG}/${category.slug}`,
          <UnorderedListOutlined />,
          category.children.map((child) => {
            return getMenuItem(
              <NavLink to={`${RouterPath.CATALOG}/${category.slug}/${child.slug}`}>{child.name}</NavLink>,
              `${RouterPath.CATALOG}/${category.slug}/${child.slug}`
            );
          })
        );
      })
    ),
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
