import React, { useState } from 'react';
import { Menu, MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { MAIN_ITEMS_ANONYMOUS_USER, MAIN_ITEMS_LOGGED_USER } from '../constants/MainMenus';
import { actions as userMenuActions } from '../store/userMenu.slice';
import { actions as authActions } from '../store/auth.slice';
import { RouterPath } from '../models/RouterPath';

const SideMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logged: boolean = useAppSelector((state) => state.auth.token > '') ?? false;
  const [collapsed, setCollapsed] = useState(false);
  const loc = useLocation().pathname;
  const items = logged ? MAIN_ITEMS_LOGGED_USER : MAIN_ITEMS_ANONYMOUS_USER;
  const onClick = ({ key }: Parameters<MenuProps['onClick']>[0]) => {
    dispatch(userMenuActions.toggle());
    if (RouterPath.LOGOUT === key) {
      dispatch(authActions.logout());
      navigate(RouterPath.HOME);
    }
  };

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
        onClick={onClick}
      />
    </Layout.Sider>
  );
};

export default SideMenu;
