import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Registration from '../pages/Registration';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Page404 from '../pages/Page404';
// import icon from './assets/img/favicon.ico';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Page404 />}></Route>
      <Route path="/" element={<Main />}></Route>
      <Route path="/registration" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/logout" element={<Logout />}></Route>
    </Routes>
  );
};

export default MainRoutes;
