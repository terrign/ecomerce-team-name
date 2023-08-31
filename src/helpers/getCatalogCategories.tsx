import getApiClient from './ApiClient/getApiClient';
import React from 'react';
import { RouterPath } from '../models/RouterPath';
// import { UserAddOutlined, LogoutOutlined, LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import getMenuItem from './getMenuItem';
import { ItemType } from 'antd/es/menu/hooks/useItems';

const getCatalogCategories = async (callbackFn: (arg0: ItemType[]) => void) => {
  try {
    const categoriesResponse = await getApiClient().categories().get().execute();
    const categories = categoriesResponse.body.results;
    const categoriesLinks = categories.map((category) => {
      return getMenuItem(<Link to={RouterPath.CATALOG}>{category.name.en}</Link>, RouterPath.CATALOG);
    });
    callbackFn(categoriesLinks);
  } catch (err) {
    console.log(err);
  }
};

export default getCatalogCategories;
