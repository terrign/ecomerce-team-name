import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Registration from '../pages/Registration';
import Login from '../pages/Login';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/registration" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default MainRoutes;
