import { Button, Drawer, Form, Select, Space } from 'antd';
import React from 'react';
import SearchFilter from './Search';
import { Slider } from 'antd';
import { SliderMarks } from 'antd/es/slider';
import { useSearchParams } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';

const { Option } = Select;

const marks: SliderMarks = {
  0: '0$',
  1000: '1000$',
  2000: '2000$',
  3000: '3000$',
};

interface FilterPanelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const FilterPanel = ({ open, setOpen }: FilterPanelProps) => {
  const [search, setSearch] = useSearchParams();
  const [form] = Form.useForm();
  const getParams = () => Object.fromEntries(search);
  const onClose = () => {
    setOpen(() => false);
  };
  setSearch;

  const onFinish = () => {
    const values = form.getFieldsValue();
    const newParams = { ...getParams() };
    if (values.color) newParams.color = values.color;
    if (values.brand) newParams.brand = values.brand;
    if (values.price.some((a: number) => a) && values.price) {
      newParams.priceFrom = values.price[0];
      newParams.priceTo = values.price[1];
    }
    setSearch(newParams);
  };

  const getFormInitValues = () => {
    const values = {
      color: getParams().color,
      brand: getParams().brand,
    };
    return values;
  };

  getFormInitValues;

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
      form.setFieldsValue({ color: undefined, brand: undefined, price: [0, 3000] });
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
        initialValues={{
          color: getParams().color,
          brand: getParams().brand,
          price: [getParams().priceFrom, getParams().priceTo],
        }}
      >
        <Form.Item label="Price" name="price">
          <Slider range marks={marks} max={3000} />
        </Form.Item>
        <Form.Item label="Brand" name="brand">
          <Select>
            <Option value="Apple">Apple</Option>
            <Option value="Acer">Acer</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Color" name="color">
          <Select>
            <Option value="black">Black</Option>
            <Option value="silver">Silver</Option>
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
