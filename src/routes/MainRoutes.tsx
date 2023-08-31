import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Registration from '../pages/Registration';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Product from '../pages/Product';
import { RouterPath } from '../models/RouterPath';
import Catalog from '../pages/Catalog';
import User from '../pages/User';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path={RouterPath.HOME} element={<Home />}></Route>
      <Route path={RouterPath.REG} element={<Registration />}></Route>
      <Route path={RouterPath.LOGIN} element={<Login />}></Route>
      <Route path={RouterPath.CATALOG} element={<Catalog />}></Route>
      <Route path={`${RouterPath.CATALOG}/:category`} element={<Catalog />}></Route>
      <Route path={RouterPath.USER} element={<User />}></Route>
      <Route path={`${RouterPath.PRODUCT}/:productId`} element={<Product />}></Route>
      <Route path={RouterPath.NOT_FOUND} element={<Page404 />}></Route>
    </Routes>
  );
};

export default MainRoutes;
