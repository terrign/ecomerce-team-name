import React, { useEffect } from 'react';
import { Layout, message } from 'antd';
import logo from './../../assets/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import { RouterPath } from '../../models/RouterPath';
import { useAppSelector } from '../../store/hooks';

const Header = () => {
  const alert = useAppSelector((state) => state.alert);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (alert.content === '') return;
    messageApi.open({
      type: alert.type,
      content: alert.content,
    });
  }, [alert.content]);
  return (
    <Layout.Header className="site-layout-background header">
      {contextHolder}
      <Link to={RouterPath.HOME}>
        <img src={logo} className="header__site-logo"></img>
      </Link>
      <UserAvatar />
    </Layout.Header>
  );
};
export default Header;
