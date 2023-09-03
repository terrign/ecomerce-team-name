import { Breadcrumb, Button, Pagination, Select, Space, theme } from 'antd';
import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import getBreadItems from './getBreadItems';
import FilterPanel from './FilterPanel';
import { useAppSelector } from '../../store/hooks';
import getApiClient from '../../helpers/ApiClient/getApiClient';
import { Category } from '@commercetools/platform-sdk';
import { CatalogItem } from './CatalogItem';
import './CatalogList.css';
import { URLSearchParams } from 'url';
const { Option } = Select;

const PROD_LIMIT = 10;

type queryArgs = {
  limit: number;
  offset: number;
  filter?: string;
  sort?: Array<string>;
};

const CatalogList = () => {
  const params = useParams();
  const categories = useAppSelector((state) => state.categories.items);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);
  const [load, setLoading] = useState(true);
  const [search, setSearch] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const { token } = theme.useToken();
  const categoryQuery = useParams().category;
  const subCategoryQuery = useParams().subCategory;
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    minHeight: 600,
    padding: 10,
    overflow: 'hidden',
    textAlign: 'center',
    background: token.colorFillAlter,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const getCategoryId = (categoryName: string, categoriesArr: Array<Category>) => {
    return categoriesArr.find((cat) => cat.slug.en === categoryName).id;
  };

  const getProducts = async (categoryName?: string, subCategoryName?: string, sort?: URLSearchParams) => {
    setLoading(true);
    try {
      const queryArgs: queryArgs = {
        limit: PROD_LIMIT,
        offset: PROD_LIMIT * (page - 1),
      };
      if (subCategoryName) {
        queryArgs.filter = `categories.id: subtree("${getCategoryId(subCategoryName, categories)}")`;
      }
      if (!subCategoryName && categoryName) {
        queryArgs.filter = `categories.id: subtree("${getCategoryId(categoryName, categories)}")`;
      }
      if (sort) {
        queryArgs.sort = Array.from(search).map((val) => {
          return `${val[0]} ${val[1]}`;
        });
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
    getProducts(categoryQuery, subCategoryQuery, search);
  }, [categoryQuery, subCategoryQuery, search, page]);

  useEffect(() => {
    setPage(1);
  }, [categoryQuery, subCategoryQuery]);

  const onChangePage = (currPage: number) => {
    setPage(currPage);
    console.log(categoryQuery);
  };

  const addSortParam = (value: string, paramName: string) => {
    const serchParams = Object.fromEntries(search);
    if (value === 'asc') {
      setSearch({ ...serchParams, [paramName]: 'asc' });
    }
    if (value === 'desc') {
      setSearch({ ...serchParams, [paramName]: 'desc' });
    }
  };

  const deleteParam = (paramName: string) => {
    setSearch((params) => {
      params.delete(paramName);
      return params;
    });
  };

  console.log(
    Array.from(search).map((val) => {
      return `${val[0]} ${val[1]}`;
    })
  );

  return (
    <>
      <Breadcrumb items={getBreadItems(params)} style={{ marginBottom: 10 }} />
      <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap' }}>
        <Space style={{ margin: '0 auto' }}>
          <Select
            style={{ width: 100 }}
            placeholder="Price"
            onChange={(value) => addSortParam(value, 'price')}
            value={search.get('price')}
            allowClear
            onClear={() => deleteParam('price')}
          >
            <Option value="asc">Price ↓</Option>
            <Option value="desc">Price ↑</Option>
          </Select>
          <Select
            style={{ width: 100 }}
            placeholder="Name"
            onChange={(value) => addSortParam(value, 'name.en')}
            value={search.get('name.en')}
            allowClear
            onClear={() => deleteParam('name')}
          >
            <Option value="asc">Name ↓</Option>
            <Option value="desc">Name ↑</Option>
          </Select>
        </Space>
        <Button onClick={() => setFilterOpen((prev) => !prev)} style={{ width: 208 }}>
          Filters
        </Button>
      </Space>
      <div style={containerStyle}>
        <FilterPanel open={filterOpen} setOpen={setFilterOpen} />
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
      </div>
    </>
  );
};

export default CatalogList;
