import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Main from '../pages/Main';
import Registration from '../pages/Registration';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Product from '../pages/Product';
import { RouterPath, RouterComponent } from '../models/RouterPath';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { actions as routesActions } from '../store/routes.slice';

const MainRoutes = () => {
  const routesState = useAppSelector((state) => state.routes);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const logged: boolean = useAppSelector((state) => state.auth.tokenStore.token > '') ?? false;

  if (location.pathname[0] !== '/' && location.key === 'default') location.pathname = RouterPath.ERROR404;
  if (location.pathname === '/' && location.key === 'default' && window.location.href.split('/').pop() !== '') {
    location.pathname = RouterPath.ERROR404;
  }

  const params: { [key: string]: string } = location.search.startsWith('?')
    ? location.search
        .substring(1)
        .split('&')
        .reduce((acc, param) => {
          const [key, value] = param.split('=');
          if (key) Object.assign(acc, { [key]: value });
          return acc;
        }, {})
    : {};

  useEffect(() => {
    dispatch(logged ? routesActions.logged() : routesActions.loggedOut());
  }, [logged]);

  const routes = Object.entries(routesState.routes).map(([route, type]) => {
    const key: string | undefined | null = params && 'id' in params ? params.id : null;
    if (type === RouterComponent.MAIN) return [route, <Main />];
    if (type === RouterComponent.LOGIN) return [route, <Login />];
    if (type === RouterComponent.REG) return [route, <Registration />];
    if (type === RouterComponent.PAGE404) return [route, <Page404 />];
    if (type === RouterComponent.PRODUCT) return [route, <Product id={key} />];
  });

  return (
    <Routes>
      {routes.map(([to, component]) => (
        <Route key={`${to}`} path={`${to}`} element={component} />
      ))}
    </Routes>
  );
};

export default MainRoutes;
