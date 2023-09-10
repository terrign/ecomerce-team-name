import React, { useEffect } from 'react';
import './App.css';
import MainRoutes from './routes/MainRoutes';
import { BrowserRouter } from 'react-router-dom';
import SideMenu from './components/UI/SideMenu';
import MainLayout from './components/UI/MainLayout';
import ContentLayout from './components/UI/ContentLayout';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { UserType, authSlice } from './store/auth.slice';
import { customerSlice } from './store/customer.slice';
import getApiClient from './helpers/ApiClient/getApiClient';
import { categoriesSlice } from './store/categories.slice';
import Loading from './components/UI/Loading';
import { cartSlice } from './store/cart.slice';

const App: React.FC = () => {
  const categories = useAppSelector((state) => state.categories.items);
  const userType = useAppSelector((state) => state.auth.userType);
  const dispatch = useAppDispatch();
  const init = async () => {
    if (userType === UserType.CUSTOMER) {
      try {
        const res = await getApiClient().me().get().execute();
        dispatch(authSlice.actions.initAuthState());
        dispatch(customerSlice.actions.set(res.body));
        const cartRes = await getApiClient().me().carts().get().execute();
        dispatch(cartSlice.actions.set(cartRes.body.results.find((a) => a.cartState === 'Active')));
      } catch {
        try {
          const res = await getApiClient('refresh').me().get().execute();
          dispatch(authSlice.actions.initAuthStateWithRefresh());
          dispatch(customerSlice.actions.set(res.body));
          const cartRes = await getApiClient().me().carts().get().execute();
          dispatch(cartSlice.actions.set(cartRes.body.results.find((a) => a.cartState === 'Active')));
        } catch {
          dispatch(authSlice.actions.logout());
        }
      }
    } else if (userType === UserType.ANON) {
      try {
        const res = await getApiClient().me().carts().get().execute();
        dispatch(authSlice.actions.initAuthState());
        dispatch(cartSlice.actions.set(res.body.results.find((a) => a.cartState === 'Active')));
      } catch {
        try {
          const res = await getApiClient('refresh').me().carts().get().execute();
          dispatch(authSlice.actions.initAuthStateWithRefresh());
          dispatch(cartSlice.actions.set(res.body.results.find((a) => a.cartState === 'Active')));
        } catch {
          dispatch(authSlice.actions.logout());
        }
      }
    }
    const categoryRes = await getApiClient().categories().get().execute();
    dispatch(categoriesSlice.actions.set(categoryRes.body.results));
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
