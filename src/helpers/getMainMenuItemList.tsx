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
  InfoCircleOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import getMenuItem from './getMenuItem';
import { RouterPath } from '../models/RouterPath';
import { useAppSelector } from '../store/hooks';
import useCategoryTree from '../hooks/useCategoryTree';
import { UserType } from '../store/auth.slice';

const getMainMenuItemList = () => {
  const userType = useAppSelector((state) => state.auth.userType);
  const categories = useCategoryTree();

  return [
    getMenuItem(<NavLink to={RouterPath.HOME}>Home</NavLink>, RouterPath.HOME, <HomeOutlined />),
    getMenuItem(
      <NavLink to={RouterPath.CATALOG} onClick={(event) => event.stopPropagation()}>
        Catalog
      </NavLink>,
      RouterPath.CATALOG,
      <NavLink to={RouterPath.CATALOG}>
        <ShopOutlined />
      </NavLink>,
      categories.map((category) => {
        return getMenuItem(
          <NavLink to={`${RouterPath.CATALOG}/${category.slug}`} onClick={(event) => event.stopPropagation()}>
            {category.name}
          </NavLink>,
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
      userType === UserType.CUSTOMER
        ? [
            getMenuItem(<NavLink to={RouterPath.USER}>Profile</NavLink>, RouterPath.USER, <ProfileOutlined />),
            getMenuItem('Logout', 'Logout', <LogoutOutlined />),
          ]
        : [
            getMenuItem(<NavLink to={RouterPath.LOGIN}>Login</NavLink>, RouterPath.LOGIN, <LoginOutlined />),
            getMenuItem(<NavLink to={RouterPath.REG}>Registration</NavLink>, RouterPath.REG, <UserAddOutlined />),
          ]
    ),
    getMenuItem(<NavLink to={RouterPath.ABOUT}>About Us</NavLink>, RouterPath.ABOUT, <InfoCircleOutlined />),
  ];
};

export default getMainMenuItemList;
