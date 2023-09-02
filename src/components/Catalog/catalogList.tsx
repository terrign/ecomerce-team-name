import React, { Fragment, useEffect, useState } from 'react';
import getApiClient from '../../helpers/ApiClient/getApiClient';
import { Pagination, Spin } from 'antd';
import { CatalogItem } from './catalogItem';
import './catalogList.css';
import { useParams } from 'react-router-dom';
import getCategories from '../../helpers/ApiClient/getCategories';
import { Category } from '@commercetools/platform-sdk';

const PROD_LIMIT = 10;

type queryArgs = {
  limit: number;
  offset: number;
  filter?: string;
};

export const CatalogList = () => {
  const [categoryStatus, setCategoryStatus] = useState(false);
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
    const fetchCategories = async () => {
      try {
        await getCategories(setCategories);
        setCategoryStatus(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, [categoryQuery]);

  useEffect(() => {
    if (categoryStatus) {
      getProducts(categoryQuery);
    }
  }, [categoryStatus, categoryQuery, page]);
  useEffect(() => {
    setPage(1);
    if (page != 1) {
      setCategoryStatus(false);
    }
  }, [categoryQuery]);

  const onChangePage = (currPage: number) => {
    setPage(currPage);
  };

  return !categoryStatus ? (
    <Spin />
  ) : (
    <Fragment>
      <div className="catalog-container">
        {products.map((prod, ind) => {
          const id = prod?.masterVariant.key;
          const name = prod?.name?.en;
          const description = prod?.metaDescription?.en;
          const image = prod?.masterVariant?.images[0].url;
          const price = prod?.masterVariant?.prices[0]?.value?.centAmount;
          const discPrice = prod?.masterVariant?.prices[0]?.discounted?.value?.centAmount;
          return (
            <CatalogItem
              key={ind}
              id={id}
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
