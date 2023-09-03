import { Drawer, Form } from 'antd';
import React from 'react';
import SearchFilter from './Search';

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
      <Form></Form>
    </Drawer>
  );
};

export default FilterPanel;
