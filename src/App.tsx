import React from 'react';
import './App.css';
import MainRoutes from './routes/MainRoutes';
import { BrowserRouter } from 'react-router-dom';
import initAuthState from './store/initAuthState';
import SideMenu from './components/UI/SideMenu';
import MainLayout from './components/UI/MainLayout';
import ContentLayout from './components/UI/ContentLayout';
import initCategoryState from './store/initCategoryState';
import { useAppSelector } from './store/hooks';

const App: React.FC = () => {
  initAuthState();
  initCategoryState();

  const categories = useAppSelector((state) => state.categories.items);

  return (
    <>
      {categories.length !== 0 && (
        <BrowserRouter>
          <MainLayout>
            <SideMenu />
            <ContentLayout>
              <MainRoutes />
            </ContentLayout>
          </MainLayout>
        </BrowserRouter>
      )}
    </>
  );
};
export default App;
