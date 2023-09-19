import React, { useEffect } from 'react';
import { Layout, message, theme } from 'antd';
import logo from './../../assets/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import { RouterPath } from '../../models/RouterPath';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actions as alertActions } from '../../store/alert.slice';
import CartIcon from './CartIcon';
const Header = () => {
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.alert);
  const [messageApi, contextHolder] = message.useMessage();
  const bgColor = theme.useToken().token.colorBgContainer;

  useEffect(() => {
    if (alert.content === '') return;
    messageApi
      .open({
        type: alert.type,
        content: alert.content,
      })
      .then(() => dispatch(alertActions.clear()));
  }, [alert.content]);
  return (
    <Layout.Header className="site-layout-background header" style={{ backgroundColor: bgColor }}>
      {contextHolder}
      <Link to={RouterPath.HOME}>
        <img src={logo} className="header__site-logo"></img>
      </Link>
      <div style={{ display: 'flex', width: 75, justifyContent: 'space-between' }}>
        <CartIcon />
        <UserAvatar />
      </div>
    </Layout.Header>
  );
};
export default Header;
