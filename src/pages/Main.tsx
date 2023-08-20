import React from 'react';
import { Link } from 'react-router-dom';
import { RouterPath } from '../models/RouterPath';
const Main = () => {
  return (
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
      <li>
        <Link to={RouterPath.LOGOUT}>Logout</Link>
      </li>
    </ul>
  );
};

export default Main;
