import { Layout } from 'antd';
import React from 'react';
import './App.css';
import MainRoutes from './routes/MainRoutes';
import SideMenu from './components/SideMenu';
import { HashRouter } from 'react-router-dom';

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout className="main-layout" style={{ minHeight: '100vh' }}>
        <SideMenu />
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, margin: '0px 16px' }}></Header>
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
