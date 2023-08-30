import React from 'react';
import { Tabs } from 'antd';
import UserInfo from './userInfo/UserInfo';
import UserAddresses from './addresses/UserAddresses';

const UserProfile: React.FC = () => {
  const UserProfileItems = [
    { label: 'User info', key: 'userInfo', children: <UserInfo /> },
    { label: 'Addresses', key: 'userAddresses', children: <UserAddresses /> },
  ];

  return <Tabs defaultActiveKey="1" type="card" items={UserProfileItems} />;
};

export default UserProfile;
