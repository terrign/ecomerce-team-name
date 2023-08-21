import React from 'react';
import { Menu, MenuProps } from 'antd';
import { ITEMS_ANONYMOUS_USER, ITEMS_LOGGED_USER } from '../constants/userMenus';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { actions as userMenuActions } from '../store/userMenu.slice';
import { actions as authActions } from '../store/auth.slice';
import { RouterPath } from '../models/RouterPath';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logged: boolean = useAppSelector((state) => state.auth.token > '') ?? false;
  const menuItems = logged ? ITEMS_LOGGED_USER : ITEMS_ANONYMOUS_USER;
  const onClick = ({ key }: Parameters<MenuProps['onClick']>[0]) => {
    dispatch(userMenuActions.toggle());
    if (RouterPath.LOGOUT === key) {
      dispatch(authActions.logout());
      navigate(RouterPath.HOME);
    }
  };

  return (
    <Menu onClick={onClick} openKeys={['sub1']} theme="light" items={menuItems} mode="inline" selectedKeys={null} />
  );
};

export default UserMenu;
