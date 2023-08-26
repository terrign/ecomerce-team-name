import './Page404.css';
import React from 'react';
import image404 from '../assets/404.svg';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { RouterPath } from '../models/RouterPath';
const Page404 = () => {
  return (
    <div className="page-404">
      <Typography.Paragraph>
        return to{' '}
        <Typography.Text>
          <Link to={RouterPath.HOME}>Home Page</Link>
        </Typography.Text>
      </Typography.Paragraph>
      <img className="page404" src={image404} />
    </div>
  );
};

export default Page404;
