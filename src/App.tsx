import { Layout, message } from 'antd';
import React, { useEffect } from 'react';
import './App.css';
import MainRoutes from './routes/MainRoutes';
import SideMenu from './components/SideMenu';
import { HashRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { actions as userMenuActions } from './store/userMenu.slice';
import Header from './components/Header';
import initAuthState from './store/initAuthState';

const { Content } = Layout;

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const menuHidden = useAppSelector((state) => state.userMenu.visible);
  const alert = useAppSelector((state) => state.alert);
  const [messageApi, contextHolder] = message.useMessage();
  initAuthState();

  useEffect(() => {
    if (alert.content === '') return;
    messageApi.open({
      type: alert.type,
      content: alert.content,
    });
  }, [alert.content]);

  const onClick = () => {
    if (menuHidden) {
      dispatch(userMenuActions.hide());
    }
  };

  return (
    <HashRouter>
      <Layout className="main-layout" style={{ minHeight: '100vh' }} onClick={onClick}>
        <SideMenu />
        <Layout className="site-layout">
          {contextHolder}
          <Header />
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
            }}
          >
            <MainRoutes />
          </Content>
        </Layout>
      </Layout>
    </HashRouter>
  );
};
export default App;
