import React, { useState } from 'react';
import { Menu } from 'antd';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { useAppSelector } from '../store/hooks';
import { MAIN_ITEMS_ANONYMOUS_USER, MAIN_ITEMS_LOGGED_USER } from '../constants/MainMenus';

const SideMenu = () => {
  const logged: boolean = useAppSelector((state) => state.auth.token > '') ?? false;
  const [collapsed, setCollapsed] = useState(false);
  const loc = useLocation().pathname;
  const items = logged ? MAIN_ITEMS_LOGGED_USER : MAIN_ITEMS_ANONYMOUS_USER;
  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      breakpoint="md"
      collapsedWidth="45px"
      style={{ position: 'relative' }}
    >
      {/* Do we need logo here? should probably go to header or removed at all */}
      {/* <div className="logo">Logo</div>  */}{' '}
      {/*TODO: need to bind selected page to real view (i.e if user navigates through url, this will remain unchaged) */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[loc]}
        items={items}
        style={{ position: 'sticky', left: 0, top: 0, padding: '10px 0 0' }}
      />
    </Layout.Sider>
  );
};

export default SideMenu;
