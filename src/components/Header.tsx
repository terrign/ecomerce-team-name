import React from 'react';
import UserAvatar from '../components/UserAvatar';
import { Layout } from 'antd';

const Header = () => {
  return (
    <Layout.Header className="site-layout-background header">
      <UserAvatar />
    </Layout.Header>
  );
};
export default Header;
