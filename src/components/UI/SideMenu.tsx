import React, { useEffect, useState } from 'react';
import { Menu, MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import getMainMenuItemList from '../../helpers/getMainMenuItemList';
import useLogout from '../../hooks/useLogout';
import { RouterPath } from '../../models/RouterPath';

export const LAYOUT_BREAKPOINT = 768; //antd-layout breakpoint - md.

const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= LAYOUT_BREAKPOINT);
  const [showTrigger, setShowTrigger] = useState(!collapsed);
  const loc = useLocation().pathname;
  const items = getMainMenuItemList();
  const logout = useLogout();
  const navigate = useNavigate();
  const onClick = ({ key, domEvent }: Parameters<MenuProps['onClick']>[0]) => {
    domEvent.stopPropagation();
    if (key === 'Logout') {
      logout();
      navigate(RouterPath.HOME);
    }
  };
  const breakPointHandler = () => {
    setShowTrigger((prev) => !prev);
  };

  useEffect(() => {
    const cl = document.body.classList;
    collapsed ? setTimeout(() => cl.remove('side-menu_not-collapsed'), 300) : cl.add('side-menu_not-collapsed');
  }, [collapsed]);

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
        style={{ position: 'sticky', left: 0, top: 0, padding: '10px 0 0', userSelect: 'none' }}
        onClick={onClick}
      />
    </Layout.Sider>
  );
};

export default SideMenu;
