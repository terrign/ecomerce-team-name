import { Drawer, Form, Select } from 'antd';
import React from 'react';
import SearchFilter from './Search';
const { Option } = Select;

interface FilterPanelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const FilterPanel = ({ open, setOpen }: FilterPanelProps) => {
  const onClose = () => {
    setOpen(() => false);
  };
  return (
    <Drawer placement="right" onClose={onClose} open={open} title={<SearchFilter callback={setOpen} />}>

      <Form>
        <Form.Item label="Name " style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Select style={{ width: 100 }}>
            <Option value="asc" allowClear>
              A-Z
            </Option>
            <Option value="desc">Z-A</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Price " style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Select style={{ width: 100 }} allowClear>
            <Option value="asc">Cheap first</Option>
            <Option value="desc">Expensive first</Option>
          </Select>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default FilterPanel;
