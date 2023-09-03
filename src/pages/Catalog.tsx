import React from 'react';
import useCatalogRedirect from '../hooks/useCatalogRedirect';
import CatalogList from '../components/Catalog/CatalogList';

const Catalog = () => {
  useCatalogRedirect();
  return <CatalogList />;
};

export default Catalog;
