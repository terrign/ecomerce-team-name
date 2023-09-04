import { MinusCircleOutlined, CopyOutlined, EditOutlined } from '@ant-design/icons';
import React from 'react';

const StaticActionItems = () => {
  return {
    edit: {
      key: 'edit',
      label: 'Edit',
      icon: <EditOutlined />,
    },
    copy: {
      key: 'copy',
      label: 'Copy',
      icon: <CopyOutlined />,
    },
    delete: {
      key: 'delete',
      label: 'Delete',
      danger: true,
      icon: <MinusCircleOutlined />,
    },
  };
};

export default StaticActionItems;
