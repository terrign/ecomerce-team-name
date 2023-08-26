import React from 'react';
import UserAvatar from '../components/UserAvatar';
import { Layout } from 'antd';
import img from './../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { RouterPath } from '../models/RouterPath';
import './Header.css';

const Header = () => {
  return (
    <Layout.Header className="site-layout-background header">
      <NavLink to={RouterPath.REG}>
        <img src={img} className="header__site-logo"></img>
      </NavLink>
      <UserAvatar />
    </Layout.Header>
  );
};
export default Header;
