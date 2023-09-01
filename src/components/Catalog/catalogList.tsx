import React, { Fragment, useEffect, useState } from 'react';
import getApiClient from '../../helpers/ApiClient/getApiClient';
import { Pagination } from 'antd';
import { CatalogItem } from './catalogItem';
import './catalogList.css';
import { useParams } from 'react-router-dom';
import initCategoryState from '../../store/initCategoryState';
import { Category } from '@commercetools/platform-sdk';

const PROD_LIMIT = 10;

type queryArgs = {
  limit: number;
  offset: number;
  filter?: string;
};

export const CatalogList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [load, setLoading] = useState(true);
  const categoryQuery = useParams().category;

  const getCategoryId = (categoryName: string, categoriesArr: Array<Category>) => {
    return categoriesArr.find((cat) => cat.slug.en === categoryName).id;
  };

  const getProducts = async (categoryName?: string) => {
    setLoading(true);
    try {
      const queryArgs: queryArgs = {
        limit: PROD_LIMIT,
        offset: PROD_LIMIT * (page - 1),
      };
      if (categoryName) {
        queryArgs.filter = `categories.id: subtree("${getCategoryId(categoryName, categories)}")`;
      }
      const resp = await getApiClient()
        .productProjections()
        .search()
        .get({
          queryArgs,
        })
        .execute();
      const data = resp.body.results;
      setProducts(data);
      setLoading(false);
      setTotalPages(Math.ceil(resp.body.total / resp.body.limit));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts(categoryQuery);
  }, [page]);
  useEffect(() => {
    initCategoryState(setCategories);
  }, []);
  useEffect(() => {
    getProducts(categoryQuery);
  }, [categoryQuery]);

  const onChangePage = (currPage: number) => {
    setPage(currPage);
  };

  return (
    <Fragment>
      <div
        onClick={() => {
          console.log(categoryQuery);
          console.log(categories);
        }}
        className="catalog-container"
      >
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
