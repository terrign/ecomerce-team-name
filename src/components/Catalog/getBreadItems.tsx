import React from 'react';

import { ShopOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import { RouterPath } from '../../models/RouterPath';
import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';

const getBreadItems = ({ category, subCategory }: { category?: string; subCategory?: string }) => {
  const calalogItem = {
    title: (
      <>
        <ShopOutlined />
        <NavLink to={RouterPath.CATALOG}>Catalog</NavLink>
      </>
    ),
  };

  const items: Array<{ title: React.JSX.Element | string }> = [calalogItem];

  if (category && subCategory)
    items.push({
      title: <Link to={`${RouterPath.CATALOG}/${category}`}>{capitalizeFirstLetter(category)}</Link>,
    });
  if (category && !subCategory) {
    items.push({
      title: capitalizeFirstLetter(category),
    });
  }
  if (subCategory) {
    items.push({ title: capitalizeFirstLetter(subCategory) });
  }
  return items;
};

export default getBreadItems;
