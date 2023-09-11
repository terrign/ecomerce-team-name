import React from 'react';
import { Menu, MenuProps } from 'antd';
import { actions as userMenuActions } from '../../store/userMenu.slice';
import getUserMenuItemList from '../../helpers/getUserMenuItemList';

import { useAppDispatch } from '../../store/hooks';
import useLogout from '../../hooks/useLogout';
import { RouterPath } from '../../models/RouterPath';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const menuItems = getUserMenuItemList();
  const navigate = useNavigate();
  const logout = useLogout();
  const onClick = ({ key }: Parameters<MenuProps['onClick']>[0]) => {
    dispatch(userMenuActions.toggle());
    if (key === 'Logout') {
      logout();
      navigate(RouterPath.HOME);
    }
  };

  return (
    <Menu onClick={onClick} openKeys={['sub1']} theme="light" items={menuItems} mode="inline" selectedKeys={null} />
  );
};

export default UserMenu;
