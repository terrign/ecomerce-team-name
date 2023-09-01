import React from 'react';
import { Tabs } from 'antd';
import UserInfo from './userInfo/UserInfo';
import UserAddresses from './addresses/UserAddresses';
import { useAppSelector } from '../../store/hooks';
import Loading from '../UI/Loading';

const UserProfile: React.FC = () => {
  const customer = useAppSelector((state) => state.customer.info);
  const UserProfileItems = [
    { label: 'User info', key: 'userInfo', children: <UserInfo /> },
    { label: 'Addresses', key: 'userAddresses', children: <UserAddresses /> },
  ];

  return customer ? <Tabs defaultActiveKey="1" type="card" items={UserProfileItems} /> : <Loading />;
};

export default UserProfile;
