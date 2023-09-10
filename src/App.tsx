import React, { useEffect, useState } from 'react';
import './App.css';
import MainRoutes from './routes/MainRoutes';
import { BrowserRouter } from 'react-router-dom';
import SideMenu from './components/UI/SideMenu';
import MainLayout from './components/UI/MainLayout';
import ContentLayout from './components/UI/ContentLayout';
import Loading from './components/UI/Loading';
import useAppInit from './hooks/useAppInit';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const init = useAppInit();

  useEffect(() => {
    init().then(() => setIsLoading(() => false));
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
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
