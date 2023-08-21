import { Layout } from 'antd';
import React, { useEffect } from 'react';
import './App.css';
import MainRoutes from './routes/MainRoutes';
import SideMenu from './components/SideMenu';
import { HashRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { actions as userMenuActions } from './store/userMenu.slice';
// import { actions as authActions } from './store/auth.slice';
import Header from './components/Header';
const { Content } = Layout;

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const logged: boolean = useAppSelector((state) => state.auth.token > '') ?? false;
  const username = useAppSelector((state) => state.auth.username);
  const menuHidden = useAppSelector((state) => state.userMenu.visible);
  useEffect(() => {
    // console.log('LOGGED');
    /* TODO get username from server and dispatch to store */
    // if (logged && username === 'User Name') dispatch(authActions.updateUser({ username: 'test' }));
  }, [logged, username]);
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
