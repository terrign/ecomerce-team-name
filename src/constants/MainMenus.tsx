import React from 'react';
import { UserOutlined, HomeOutlined, UserAddOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import getMenuItem, { MenuItem } from '../helpers/getMenuItem';
import { RouterPath } from '../models/RouterPath';

const MAIN_ITEMS_ANONYMOUS_USER: MenuItem[] = [
  getMenuItem(<NavLink to={RouterPath.HOME}>Home</NavLink>, RouterPath.HOME, <HomeOutlined />),
  getMenuItem('User', 'UserActions', <UserOutlined />, [
    getMenuItem(<NavLink to={RouterPath.LOGIN}>Login</NavLink>, RouterPath.LOGIN, <UserOutlined />),
    getMenuItem(<NavLink to={RouterPath.REG}>Registration</NavLink>, RouterPath.REG, <UserAddOutlined />),
  ]),
];
const MAIN_ITEMS_LOGGED_USER: MenuItem[] = [
  getMenuItem(<NavLink to={RouterPath.HOME}>Home</NavLink>, RouterPath.HOME, <HomeOutlined />),
  getMenuItem('User', 'UserActions', <UserOutlined />, [
    getMenuItem(<NavLink to={RouterPath.LOGOUT}>Logout</NavLink>, RouterPath.LOGOUT, <UserOutlined />),
  ]),
];

export { MAIN_ITEMS_ANONYMOUS_USER, MAIN_ITEMS_LOGGED_USER };
