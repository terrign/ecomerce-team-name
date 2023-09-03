import React from 'react';

import { ShopOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import { RouterPath } from '../../models/RouterPath';
import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';
// import useCategoryTree from '../../hooks/useCategoryTree';

const useBreadItems = ({ category, subCategory }: { category?: string; subCategory?: string }) => {
  //   const tree = useCategoryTree();
  const calalogItem = {
    title: (
      <>
        <ShopOutlined />
        <NavLink to={RouterPath.CATALOG}>Catalog</NavLink>
      </>
    ),
  };

  //   const getCategoryItem = () => {
  //     const getCategoryMenuItems = () =>
  //       tree.map((a) => {
  //         return {
  //           key: a.id,
  //           label: <Link to={`${RouterPath.CATALOG}/${a.name}`}>{capitalizeFirstLetter(a.name)}</Link>,
  //         };
  //       });

  //     console.log(getCategoryMenuItems());
  //     if (!category) {
  //       return {
  //         title: 'Choose Category',
  //         menu: { items: getCategoryMenuItems(), path: '' },
  //       };
  //     }
  //   };
  const items: Array<{ title: React.JSX.Element | string }> = [calalogItem];

  //   capitalizeFirstLetter;
  //   subCategory;

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

export default useBreadItems;
