import { Drawer, Form } from 'antd';
import React from 'react';
import SearchFilter from './Search';
import { Slider } from 'antd';
import { SliderMarks } from 'antd/es/slider';
// import { useSearchParams } from 'react-router-dom';

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
  // const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams);
  // console.log(setSearchParams);

  const onClose = () => {
    setOpen(() => false);
  };
  return (
    <Drawer placement="right" onClose={onClose} open={open} title={<SearchFilter callback={setOpen} />}>
      <Form>
        <Form.Item label="Price" valuePropName="price">
          <Slider range marks={marks} max={3000} defaultValue={[50, 2500]} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default FilterPanel;
