import React, { Fragment, useEffect, useState } from 'react';
import getApiClient from '../../helpers/ApiClient/getApiClient';
import { Pagination } from 'antd';
import { CatalogItem } from './catalogItem';
import { useAppSelector } from '../../store/hooks';
import './catalogList.css';

const PROD_LIMIT = 10;
// const ROWS = 2;

export const CatalogList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [load, setLoading] = useState(true);
  const categories = useAppSelector((state) => state.categories);

  const getProducts = async () => {
    setLoading(true);
    // console.log(getCategoryId(category));
    try {
      const resp = await getApiClient()
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit: PROD_LIMIT,
            offset: PROD_LIMIT * (page - 1),
          },
        })
        .execute();
      const data = resp.body.results;
      console.log(data);
      setProducts(data);
      setLoading(false);
      setTotalPages(Math.ceil(resp.body.total / resp.body.limit));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProducts();
    console.log(categories);
  }, [page]);

  const onChangePage = (currPage: number) => {
    setPage(currPage);
    console.log(categories);
  };

  return (
    <Fragment>
      <div className="catalog-container">
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
      </div>
      <Pagination size="small" total={totalPages * PROD_LIMIT} onChange={onChangePage} current={page} />
    </Fragment>
  );
};
