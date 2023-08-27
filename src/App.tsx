import React from 'react';
import './App.css';
import MainRoutes from './routes/MainRoutes';
import { BrowserRouter } from 'react-router-dom';
import initAuthState from './store/initAuthState';
import SideMenu from './components/UI/SideMenu';
import MainLayout from './components/UI/MainLayout';
import ContentLayout from './components/UI/ContentLayout';

const App: React.FC = () => {
  initAuthState();

  return (
    <BrowserRouter>
      <MainLayout>
        <SideMenu />
        <ContentLayout>
          <MainRoutes />
        </ContentLayout>
      </MainLayout>
    </BrowserRouter>
  );
};
export default App;
