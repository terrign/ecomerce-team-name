import './Page404.css';
import React from 'react';
import image404 from '../assets/404.svg';
import { Link } from 'react-router-dom';
const Page404 = () => {
  return (
    <div className="page-404">
      <h1 className="page-404">
        return to <Link to="/">Home Page</Link>
      </h1>
      <img className="page404" src={image404} />
    </div>
  );
};

export default Page404;
