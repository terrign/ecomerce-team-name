import React from 'react';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import getMenuItem, { MenuItem } from '../helpers/getMenuItem';
import { RouterPath } from '../models/RouterPath';

const ANONYMOUS_USER = 'Anounymous User';
const ITEMS_ANONYMOUS_USER: MenuItem[] = [
  getMenuItem(<NavLink to={RouterPath.LOGIN}>Login</NavLink>, RouterPath.LOGIN, <UserOutlined />),
];
const ITEMS_LOGGED_USER: MenuItem[] = [
  getMenuItem(<NavLink to={RouterPath.HOME}>Logout</NavLink>, RouterPath.HOME, <LogoutOutlined />),
];

export { ITEMS_ANONYMOUS_USER, ITEMS_LOGGED_USER, ANONYMOUS_USER };
