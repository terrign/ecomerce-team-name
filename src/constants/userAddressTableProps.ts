import { TableProps } from 'antd';
import { UserAddressesColumnDataType } from '../models/UserProfileTypes';

export const tableProps: TableProps<UserAddressesColumnDataType> = {
  loading: false,
  size: 'small',
  title: null,
  showHeader: true,
  footer: null,
  scroll: {
    x: '500px',
  },
  tableLayout: 'auto',
  pagination: false,
};
