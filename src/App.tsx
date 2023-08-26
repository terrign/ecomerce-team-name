import React from 'react';
import './App.css';
import MainRoutes from './routes/MainRoutes';
import { HashRouter } from 'react-router-dom';
import initAuthState from './store/initAuthState';
import SideMenu from './components/UI/SideMenu';
import MainLayout from './components/UI/MainLayout';
import ContentLayout from './components/UI/ContentLayout';

const App: React.FC = () => {
  initAuthState();

  return (
    <HashRouter>
      <MainLayout>
        <SideMenu />
        <ContentLayout>
          <MainRoutes />
        </ContentLayout>
      </MainLayout>
    </HashRouter>
  );
};
export default App;
