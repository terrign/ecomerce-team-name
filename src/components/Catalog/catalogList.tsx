import React, { useEffect, useState } from 'react';
import getApiClient from '../../helpers/ApiClient/getApiClient';
import { Row, Pagination } from 'antd';
import { CatalogItem } from './catalogItem';

export const CatalogList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getProducts = async () => {
    try {
      const resp = await getApiClient()
        .products()
        .get({ queryArgs: { offset: page } })
        .execute();
      const data = resp.body.results;
      console.log(Math.ceil(resp.body.total / resp.body.limit));
      // console.log(data);
      // console.log(resp);
      setProducts(data);
      setTotalPages(Math.floor(resp.body.total / resp.body.limit));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProducts();
  }, [page]);

  return (
    <div>
      <Row gutter={[20, 30]}>
        {products.map((prod, ind) => {
          const name = prod?.masterData?.current?.name?.en;
          const description = prod?.masterData?.current?.description?.en;
          const image = prod?.masterData?.current?.masterVariant?.images[0].url;
          const price = prod?.masterData?.current?.masterVariant?.prices[0]?.value?.centAmount;
          const discPrice = prod?.masterData?.current?.masterVariant?.prices[0]?.discounted?.value?.centAmount;
          return (
            <CatalogItem
              key={ind}
              name={name}
              description={description}
              image={image}
              price={price}
              discPrice={discPrice}
            />
          );
        })}
      </Row>
      <Pagination
        defaultCurrent={1}
        total={totalPages * 10}
        onChange={(page) => {
          setPage(page * 20);
        }}
      />
    </div>
  );
};
