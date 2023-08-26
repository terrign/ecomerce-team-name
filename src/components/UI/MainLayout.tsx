import React from 'react';
import { Layout } from 'antd';
import { PropsWithChildren } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actions as userMenuActions } from '../../store/userMenu.slice';

const MainLayout = (props: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const menuHidden = useAppSelector((state) => state.userMenu.visible);
  const onClick = () => {
    if (menuHidden) {
      dispatch(userMenuActions.hide());
    }
  };
  return (
    <Layout className="main-layout" style={{ minHeight: '100vh' }} onClick={onClick} hasSider>
      {props.children}
    </Layout>
  );
};

export default MainLayout;
