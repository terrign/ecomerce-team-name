import React from 'react';
import { Menu, MenuProps } from 'antd';
import { actions as userMenuActions } from '../../store/userMenu.slice';
import getUserMenuItemList from '../../helpers/getUserMenuItemList';

import { useAppDispatch } from '../../store/hooks';
import useLogout from '../../hooks/useLogout';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const menuItems = getUserMenuItemList();
  const logout = useLogout();
  const onClick = ({ key }: Parameters<MenuProps['onClick']>[0]) => {
    dispatch(userMenuActions.toggle());
    if (key === 'Logout') {
      logout();
    }
  };

  return (
    <Menu onClick={onClick} openKeys={['sub1']} theme="light" items={menuItems} mode="inline" selectedKeys={null} />
  );
};

export default UserMenu;
