import React from 'react';
import useCatalogRedirect from '../hooks/useCatalogRedirect';
import CatalogList from '../components/Catalog/catalogList';

const Catalog = () => {
  useCatalogRedirect();
  return (
    <>
      <CatalogList />
    </>
  );
};

export default Catalog;
