import React, { useState } from 'react';
import { Menu, MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import { useAppDispatch } from '../../store/hooks';
import { RouterPath } from '../../models/RouterPath';
import getMainMenuItemList from '../../helpers/getMainMenuItemList';
import { actions as authActions } from '../../store/auth.slice';

export const LAYOUT_BREAKPOINT = 768; //antd-layout breakpoint - md.

const SideMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(window.innerWidth <= LAYOUT_BREAKPOINT);
  const [showTrigger, setShowTrigger] = useState(!collapsed);
  const loc = useLocation().pathname;
  const items = getMainMenuItemList();
  const onClick = ({ key }: Parameters<MenuProps['onClick']>[0]) => {
    if (key === 'Logout') {
      dispatch(authActions.logout());
      navigate(RouterPath.HOME);
    }
  };
  const breakPointHandler = () => {
    setShowTrigger((prev) => !prev);
  };

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      breakpoint="md"
      collapsedWidth="45px"
      onBreakpoint={breakPointHandler}
      style={{ position: 'relative' }}
      trigger={showTrigger && null}
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[loc]}
        items={items}
        style={{ position: 'sticky', left: 0, top: 0, padding: '10px 0 0' }}
        onClick={onClick}
      />
    </Layout.Sider>
  );
};

export default SideMenu;
