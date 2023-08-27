import React, { useEffect, useState } from 'react';
import getApiClient from '../../helpers/ApiClient/getApiClient';
import { Row } from 'antd';
import { CatalogItem } from './catalogItem';

export const CatalogList = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const resp = await getApiClient().products().get().execute();
      const data = resp.body.results;
      console.log(data);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Row gutter={[20, 30]}>
      {products.map((prod, ind) => {
        const name = prod?.masterData?.current?.name['en-US'];
        const description = prod?.masterData?.current?.description['en-US'];
        const image = prod?.masterData?.current?.masterVariant?.images[0].url;
        return <CatalogItem key={ind} name={name} description={description} image={image} />;
      })}
    </Row>
  );
};
