import { Breadcrumb, Button, Pagination, Select, Space } from 'antd';
import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import getBreadItems from './getBreadItems';
import FilterPanel from './FilterPanel';
import { CatalogItem } from './CatalogItem';
import './CatalogList.css';
import getProductList from '../../helpers/ApiClient/getProducts';
import useCategoryTree from '../../hooks/useCategoryTree';
import { useAppDispatch } from '../../store/hooks';
import { alertSlice } from '../../store/alert.slice';
import { CATALOG_ITEMS_PER_PAGE } from '../../constants/general';
import { productsQueryAdapter } from '../../helpers/productsQueryAdapter';
const { Option } = Select;

const CatalogList = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const categoryTree = useCategoryTree();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);
  const [load, setLoading] = useState(true);
  const [search, setSearch] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const categoryQuery = useParams().category;
  const subCategoryQuery = useParams().subCategory;

  const getProducts = async () => {
    setLoading(() => true);
    try {
      const res = await getProductList(productsQueryAdapter(page, params, Object.fromEntries(search), categoryTree));
      const data = res.body.results;
      setProducts(() => data);
      setLoading(() => false);
      setTotalPages(Math.ceil(res.body.total / res.body.limit));
    } catch (e) {
      console.error(e.message);
      dispatch(alertSlice.actions.error('Something went wrong. Please reload the page'));
    }
  };

  useEffect(() => {
    getProducts();
  }, [page, search, categoryQuery, subCategoryQuery]);

  useEffect(() => {
    setPage(1);
  }, [categoryQuery, subCategoryQuery]);

  const onChangePage = (currPage: number) => {
    setPage(() => currPage);
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
            onClear={() => deleteParam('name.en')}
          >
            <Option value="asc">Name ↓</Option>
            <Option value="desc">Name ↑</Option>
          </Select>
        </Space>
        <Button onClick={() => setFilterOpen((prev) => !prev)} style={{ width: 208 }}>
          Filters
        </Button>
      </Space>

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
        <Pagination size="small" total={totalPages * CATALOG_ITEMS_PER_PAGE} onChange={onChangePage} current={page} />
      </Fragment>
    </>
  );
};

export default CatalogList;
