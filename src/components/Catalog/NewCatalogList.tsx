import { Breadcrumb, Button, Select, Space, theme } from 'antd';
import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useBreadItems from './getBreadItems';
import FilterPanel from './FilterPanel';
const { Option } = Select;

const CatalogList = () => {
  const params = useParams();
  const [search, setSearch] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const { token } = theme.useToken();
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    height: 600,
    padding: 48,
    overflow: 'hidden',
    textAlign: 'center',
    background: token.colorFillAlter,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
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

  console.log(params, Object.fromEntries(search));

  return (
    <>
      <Breadcrumb items={useBreadItems(params)} style={{ marginBottom: 10 }} />
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
            onChange={(value) => addSortParam(value, 'name')}
            value={search.get('name')}
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
      </div>
    </>
  );
};

export default CatalogList;
