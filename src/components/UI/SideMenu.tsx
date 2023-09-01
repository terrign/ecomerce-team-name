import React, { useEffect, useState } from 'react';
import { Menu, MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import { useAppDispatch } from '../../store/hooks';
import { RouterPath } from '../../models/RouterPath';
import getMainMenuItemList from '../../helpers/getMainMenuItemList';
import { actions as authActions } from '../../store/auth.slice';
import initCategoryState from '../../store/initCategoryState';
import { categorySlice } from '../../store/category.slice';

export const LAYOUT_BREAKPOINT = 768; //antd-layout breakpoint - md.

const SideMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(window.innerWidth <= LAYOUT_BREAKPOINT);
  const [showTrigger, setShowTrigger] = useState(!collapsed);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const loc = useLocation().pathname;
  const items = getMainMenuItemList(categoriesArr);
  useEffect(() => {
    initCategoryState(setCategoriesArr);
  }, [categoriesArr]);
  const onClick = ({ key }: Parameters<MenuProps['onClick']>[0]) => {
    dispatch(categorySlice.actions.set(categoriesArr));
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
