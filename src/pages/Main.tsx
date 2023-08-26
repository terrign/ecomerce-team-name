import React from 'react';
import { Link } from 'react-router-dom';
import { RouterPath } from '../models/RouterPath';
import Test from './temp';
const Main = () => {
  return (
    <>
      <Test></Test>
      <ul>
        <li>
          <Link to={RouterPath.HOME}>Home Page</Link>
        </li>
        <li>
          <Link to={RouterPath.REG}>Registration</Link>
        </li>
        <li>
          <Link to={RouterPath.LOGIN}>Login</Link>
        </li>
      </ul>
    </>
  );
};

export default Main;
