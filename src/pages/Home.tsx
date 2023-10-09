import React from 'react';
import { Link } from 'react-router-dom';
import { RouterPath } from '../models/RouterPath';

const Home = () => {
  return (
    <ul>
      <li>
        <Link to={RouterPath.CATALOG}>Catalog</Link>
      </li>
      <li>
        <Link to={RouterPath.REG}>Registration</Link>
      </li>
      <li>
        <Link to={RouterPath.LOGIN}>Login</Link>
      </li>
    </ul>
  );
};

export default Home;
