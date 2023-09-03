import React from 'react';
import useCatalogRedirect from '../hooks/useCatalogRedirect';
import CatalogList from '../components/Catalog/NewCatalogList';

const Catalog = () => {
  useCatalogRedirect();
  return (
    <>
      <CatalogList />
    </>
  );
};

export default Catalog;
