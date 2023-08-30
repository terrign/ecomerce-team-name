import React, { useEffect, useState } from 'react';
import getApiClient from '../../helpers/ApiClient/getApiClient';
import { Row, Pagination } from 'antd';
import { CatalogItem } from './catalogItem';

const PROD_LIMIT = 10;

export const CatalogList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [load, setLoading] = useState(true);

  const getProducts = async () => {
    setLoading(true);
    try {
      const resp = await getApiClient()
        .productProjections()
        .get({ queryArgs: { limit: PROD_LIMIT, offset: PROD_LIMIT * (page - 1) } })
        .execute();
      const data = resp.body.results;
      console.log(Math.ceil(resp.body.total / resp.body.limit));
      // console.log(data);
      console.log(resp);
      setProducts(data);
      setLoading(false);
      setTotalPages(Math.ceil(resp.body.total / resp.body.limit));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProducts();
  }, [page]);

  const onChangePage = (currPage: number) => {
    setPage(currPage);
  };

  return (
    <div>
      <Row gutter={[20, 30]}>
        {products.map((prod, ind) => {
          const name = prod?.name?.en;
          const description = prod?.metaDescription?.en;
          const image = prod?.masterVariant?.images[0].url;
          const price = prod?.masterVariant?.prices[0]?.value?.centAmount;
          const discPrice = prod?.masterVariant?.prices[0]?.discounted?.value?.centAmount;
          return (
            <CatalogItem
              key={ind}
              name={name}
              description={description}
              image={image}
              price={price}
              discPrice={discPrice}
              load={load}
            />
          );
        })}
      </Row>
      <Pagination size="small" total={totalPages * 10} onChange={onChangePage} current={page} />
    </div>
  );
};
