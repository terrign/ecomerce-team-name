import React, { useEffect } from 'react';
import './App.css';
import MainRoutes from './routes/MainRoutes';
import { BrowserRouter } from 'react-router-dom';
import SideMenu from './components/UI/SideMenu';
import MainLayout from './components/UI/MainLayout';
import ContentLayout from './components/UI/ContentLayout';

import { useAppDispatch, useAppSelector } from './store/hooks';
import { authSlice } from './store/auth.slice';
import { customerSlice } from './store/customer.slice';
import getApiClient from './helpers/ApiClient/getApiClient';
import { categoriesSlice } from './store/categories.slice';
import Loading from './components/UI/Loading';

const App: React.FC = () => {
  const authState = useAppSelector((state) => state.auth);
  const categories = useAppSelector((state) => state.categories.items);
  const dispatch = useAppDispatch();
  const init = async () => {
    if (authState.tokenStore.token) {
      try {
        console.log('trying token');
        const res = await getApiClient().me().get().execute();
        dispatch(authSlice.actions.initAuthState(`${res.body.firstName} ${res.body.lastName}`));
        dispatch(customerSlice.actions.set(res.body));
      } catch {
        try {
          console.log('trying Refrehtoken');
          const res = await getApiClient('refresh').me().get().execute();
          dispatch(authSlice.actions.initAuthStateWithRefresh(`${res.body.firstName} ${res.body.lastName}`));
          dispatch(customerSlice.actions.set(res.body));
        } catch {
          console.log('logout');
          dispatch(authSlice.actions.logout());
        }
      }
    }
    const res = await getApiClient().categories().get().execute();
    dispatch(categoriesSlice.actions.set(res.body.results));
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {categories.length === 0 && <Loading />}
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
