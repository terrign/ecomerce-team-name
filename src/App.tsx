import { Layout } from 'antd';
import React from 'react';
import './App.css';
import MainRoutes from './routes/MainRoutes';
import SideMenu from './components/SideMenu';
import { HashRouter } from 'react-router-dom';
import UserAvatar from './components/UserAvatar';
import { useAppDispatch } from './store/hooks';
import { actions as userMenuActions } from './store/userMenu.slice';
const { Header, Content } = Layout;

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const onClick = () => dispatch(userMenuActions.hide());

  return (
    <HashRouter>
      <Layout className="main-layout" style={{ minHeight: '100vh' }} onClick={onClick}>
        <SideMenu />
        <Layout className="site-layout">
          <Header className="site-layout-background header">
            <UserAvatar />
          </Header>
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
