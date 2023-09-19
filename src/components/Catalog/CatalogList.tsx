import { Breadcrumb, Button, Pagination, Select, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import getBreadItems from './getBreadItems';
import FilterPanel from './FilterPanel';
import { CatalogItem } from './CatalogItem';
import './CatalogList.css';
import getProductList from '../../helpers/ApiClient/getProductList';
import useCategoryTree from '../../hooks/useCategoryTree';
import { useAppDispatch } from '../../store/hooks';
import { alertSlice } from '../../store/alert.slice';
import { CATALOG_ITEMS_PER_PAGE } from '../../constants/general';
import { productsQueryAdapter } from '../../helpers/productsQueryAdapter';
import { ProductProjection } from '@commercetools/platform-sdk';
import getProductAttributes from '../../helpers/getProductsAttributes';
const { Option } = Select;

const CatalogList = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const categoryTree = useCategoryTree();
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [load, setLoading] = useState(true);
  const [search, setSearch] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [brands, setBrands] = useState<Array<string>>();
  const [colors, setColors] = useState<Array<string>>();

  const getProducts = async () => {
    setLoading(() => true);
    try {
      const res = await getProductList(productsQueryAdapter(params, Object.fromEntries(search), categoryTree));
      const data = res.body.results;
      setProducts(() => data);
      setLoading(() => false);
      const filterOptions = getProductAttributes(res.body.facets);
      setBrands(() => filterOptions.brands);
      setColors(() => filterOptions.colors);
      setTotalPages(Math.ceil(res.body.total / res.body.limit));
    } catch (e) {
      dispatch(alertSlice.actions.error('Something went wrong. Please reload the page'));
    }
  };
  useEffect(() => {
    getProducts();
    window.scrollTo(0, 0);
  }, [search, params]);

  const addPageParam = (page: number) => {
    setSearch((prev) => {
      prev.set('page', String(page));
      return prev;
    });
  };

  const addSortParam = (value: string) => {
    if (value) {
      setSearch((prev) => {
        prev.set('sort', String(value));
        return prev;
      });
    }
  };

  const deleteSort = () => {
    setSearch((prev) => {
      prev.delete('sort');
      return prev;
    });
  };

  return (
    <>
      <Breadcrumb items={getBreadItems(params)} style={{ marginBottom: 10 }} />
      <div className="catalog__filters">
        <Space.Compact style={{ margin: '0 auto' }}>
          <Select
            style={{ width: 100 }}
            placeholder="Sort"
            onChange={(value) => addSortParam(value)}
            value={search.get('sort')}
            allowClear
            onClear={() => deleteSort()}
          >
            <Option value="priceasc">Price ↓</Option>
            <Option value="pricedesc">Price ↑</Option>
            <Option value="nameasc">Name ↓</Option>
            <Option value="namedesc">Name ↑</Option>
          </Select>
          <Button onClick={() => setFilterOpen((prev) => !prev)} style={{ width: 141 }}>
            Filters
          </Button>
        </Space.Compact>
      </div>

      <FilterPanel open={filterOpen} setOpen={setFilterOpen} brands={brands} colors={colors} />

      <>
        <div className="catalog-container">
          {products.map((prod) => {
            const props = {
              id: prod?.id,
              name: prod?.name?.en,
              description: prod?.metaDescription?.en,
              image: prod?.masterVariant?.images[0].url,
              price: prod?.masterVariant?.prices[0]?.value?.centAmount,
              discPrice: prod?.masterVariant?.prices[0]?.discounted?.value?.centAmount,
            };
            return <CatalogItem {...props} load={load} key={prod?.id} />;
          })}
        </div>
        {products?.length > 0 && (
          <Pagination
            size="small"
            total={totalPages * CATALOG_ITEMS_PER_PAGE}
            onChange={(page) => addPageParam(page)}
            current={+search.get('page') || 1}
          />
        )}
      </>
    </>
  );
};

export default CatalogList;
