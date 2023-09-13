import { Button, Drawer, Form, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import SearchFilter from './Search';
import { Slider } from 'antd';
import { SliderMarks } from 'antd/es/slider';
import { useParams, useSearchParams } from 'react-router-dom';
import getProductAttributes from '../../helpers/ApiClient/getAttributes';
import useCategoryTree from '../../hooks/useCategoryTree';

const { Option } = Select;

const marks: SliderMarks = {
  0: '0$',
  1000: '1000$',
  2000: '2000$',
  3000: '3000$',
};

interface ParamValues {
  [key: string]: string | string[] | undefined;
}

interface FilterPanelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const FilterPanel = ({ open, setOpen }: FilterPanelProps) => {
  const [search, setSearch] = useSearchParams();
  const category = useParams().category;
  const subCategory = useParams().subCategory;
  const categories = useCategoryTree();
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [form] = Form.useForm();
  const getParams = () => Object.fromEntries(search);
  const onClose = () => {
    setOpen(() => false);
  };
  useEffect(() => {
    getProductAttributes(setBrands, setColors, categories, category, subCategory);
  }, [category, subCategory]);
  const onFinish = () => {
    const values = form.getFieldsValue();
    const newParams = { ...getParams() };
    if (values.color) newParams.color = values.color;
    else {
      delete newParams.color;
    }
    if (values.brand) newParams.brand = values.brand;
    else {
      delete newParams.brand;
    }
    if (values.price) {
      newParams.priceFrom = values.price[0];
      newParams.priceTo = values.price[1];
    }
    setSearch(newParams);
    setOpen(() => false);
  };

  const getFormInitValues = () => {
    const params = getParams();
    const values: ParamValues = {
      color: getParams().color,
      brand: getParams().brand,
      price: undefined,
    };
    if (params.priceTo && params.priceFrom) {
      values.price = [params.priceFrom, params.priceTo];
    }
    return values;
  };

  const resetFilters = () => {
    setSearch((params) => {
      for (const key in form.getFieldsValue()) {
        if (key === 'price') {
          params.delete('priceTo');
          params.delete('priceFrom');
        } else {
          params.delete(key);
        }
      }
      form.setFieldsValue({ color: undefined, brand: undefined, price: undefined });
      setOpen(() => false);
      return params;
    });
  };
  return (
    <Drawer placement="right" onClose={onClose} open={open} title={<SearchFilter callback={setOpen} />}>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        form={form}
        onFinish={onFinish}
        initialValues={getFormInitValues()}
      >
        <Form.Item label="Price" name="price">
          <Slider range marks={marks} max={3000} />
        </Form.Item>
        <Form.Item label="Brand" name="brand">
          <Select allowClear>
            {brands.map((brand, ind) => {
              return (
                <Option key={ind} value={brand}>
                  {brand}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Color" name="color">
          <Select allowClear>
            {colors.map((color, ind) => {
              return (
                <Option key={ind} value={color}>
                  {color}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={() => form.submit()}>
              Apply
            </Button>
            <Button onClick={() => resetFilters()}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default FilterPanel;
