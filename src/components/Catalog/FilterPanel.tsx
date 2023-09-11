import { Button, Drawer, Form, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import SearchFilter from './Search';
import { Slider } from 'antd';
import { SliderMarks } from 'antd/es/slider';
import { useSearchParams } from 'react-router-dom';
import getProductAttributes from '../../helpers/ApiClient/getAttributes';

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
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [form] = Form.useForm();
  const getParams = () => Object.fromEntries(search);
  const onClose = () => {
    setOpen(() => false);
  };
  useEffect(() => {
    getProductAttributes(setBrands, setColors);
  }, []);

  const onFinish = () => {
    const values = form.getFieldsValue();
    const newParams = { ...getParams() };
    if (values.color) newParams.color = values.color;
    if (values.brand) newParams.brand = values.brand;
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
            {brands.map((brand) => {
              return <Option value={brand}>{brand}</Option>;
            })}
            {/* <Option value="Apple">Apple</Option>
            <Option value="Acer">Acer</Option>
            <Option value="AMD">AMD</Option>
            <Option value="Dreame">Dreame</Option>
            <Option value="Google">Google</Option>
            <Option value="Intel">Intel</Option>
            <Option value="Karcher">Karcher</Option>
            <Option value="Kingston">Kingston</Option>
            <Option value="LG">LG</Option>
            <Option value="Honor">Honor</Option>
            <Option value="HP">HP</Option>
            <Option value="Huawei">Huawei</Option>
            <Option value="Lenovo">Lenovo</Option>
            <Option value="Poco">Poco</Option>
            <Option value="Samsung">Samsung</Option>
            <Option value="Xiaomi">Xiaomi</Option> */}
          </Select>
        </Form.Item>
        <Form.Item label="Color" name="color">
          <Select allowClear>
            {colors.map((color) => {
              return <Option value={color}>{color}</Option>;
            })}
            {/* <Option value="black">Black</Option>
            <Option value="blue">Blue</Option>
            <Option value="gray">Gray</Option>
            <Option value="silver">Silver</Option>
            <Option value="white">White</Option>
            <Option value="yellow">Yellow</Option> */}
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
