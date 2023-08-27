import React from 'react';
import { Menu, MenuProps } from 'antd';
import { actions as userMenuActions } from '../../store/userMenu.slice';
import { useNavigate } from 'react-router-dom';
import { actions as authActions } from '../../store/auth.slice';
import getUserMenuItemList from '../../helpers/getUserMenuItemList';
import { RouterPath } from '../../models/RouterPath';
import { useAppDispatch } from '../../store/hooks';

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const menuItems = getUserMenuItemList();
  const onClick = ({ key }: Parameters<MenuProps['onClick']>[0]) => {
    dispatch(userMenuActions.toggle());
    if (key === 'Logout') {
      dispatch(authActions.logout());
      navigate(RouterPath.HOME);
    }
  };

  return (
    <Menu onClick={onClick} openKeys={['sub1']} theme="light" items={menuItems} mode="inline" selectedKeys={null} />
  );
};

export default UserMenu;
