import React, { useState } from 'react';
import { Menu } from 'antd';
import getMenuItem, { MenuItem } from '../helpers/getMenuItem';
import { NavLink, useLocation } from 'react-router-dom';
import { UserOutlined, HomeOutlined, UserAddOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { RouterPath } from '../models/RouterPath';

const items: MenuItem[] = [
  getMenuItem(<NavLink to={RouterPath.HOME}>Home</NavLink>, RouterPath.HOME, <HomeOutlined />),
  getMenuItem('User', 'UserActions', <UserOutlined />, [
    getMenuItem(<NavLink to={RouterPath.LOGIN}>Login</NavLink>, RouterPath.LOGIN, <UserOutlined />),
    getMenuItem(<NavLink to={RouterPath.REG}>Registration</NavLink>, RouterPath.REG, <UserAddOutlined />),
  ]),
];

const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const loc = useLocation().pathname;
  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      breakpoint="md"
      collapsedWidth="45px"
      style={{ position: 'relative' }}
    >
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
