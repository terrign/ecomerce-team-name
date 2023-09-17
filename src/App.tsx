import React, { useEffect, useState } from 'react';
import './App.css';
import MainRoutes from './routes/MainRoutes';
import { BrowserRouter } from 'react-router-dom';
import SideMenu from './components/UI/SideMenu';
import MainLayout from './components/UI/MainLayout';
import ContentLayout from './components/UI/ContentLayout';
import Loading from './components/UI/Loading';
import useAppInit from './hooks/useAppInit';
import { ConfigProvider, theme } from 'antd';
import Theme from './context/ThemeContext';
import Cookie from './utils/Cookie';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const init = useAppInit();
  const [dark, setIsDark] = useState(Cookie.get('themeScheme') === 'dark' ? true : false);
  useEffect(() => {
    init().then(() => setIsLoading(() => false));
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.style.colorScheme = 'dark';
      Cookie.set('themeScheme', 'dark');
    } else {
      document.documentElement.style.colorScheme = null;
      Cookie.delete('themeScheme');
    }
  }, [dark]);

  return isLoading ? (
    <Loading />
  ) : (
    <Theme.Provider value={{ dark: dark, setDark: setIsDark }}>
      <ConfigProvider theme={{ algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
        <BrowserRouter>
          <MainLayout>
            <SideMenu />
            <ContentLayout>
              <MainRoutes />
            </ContentLayout>
          </MainLayout>
        </BrowserRouter>
      </ConfigProvider>
    </Theme.Provider>
  );
};

export default App;
