import React from 'react';
import { Menu } from 'antd';
import { ITEMS_ANONYMOUS_USER, ITEMS_LOGGED_USER } from '../constants/UserMenus';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { actions as userMenuActions } from '../store/userMenu.slice';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const logged: boolean = useAppSelector((state) => state.auth.token > '') ?? false;
  const menuItems = logged ? ITEMS_LOGGED_USER : ITEMS_ANONYMOUS_USER;
  const onClick = () => dispatch(userMenuActions.toggle());

  return (
    <Menu onClick={onClick} openKeys={['sub1']} theme="light" items={menuItems} mode="inline" selectedKeys={null} />
  );
};

export default UserMenu;
