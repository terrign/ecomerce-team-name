import React from 'react';
import { Button, Dropdown, MenuProps, Table } from 'antd';
import { AddressType } from '../../../constants/forms/address-form/address-types';
import { useAppSelector } from '../../../store/hooks';
import { MinusCircleOutlined, CopyOutlined, SettingFilled, EditOutlined } from '@ant-design/icons';
import AddressTypesList from './AddressTypesList';
import { tableProps } from '../../../constants/userAddressTableProps';
import { UserAddressesColumnDataType } from '../../../models/UserProfileTypes';
const { Column } = Table;
import './UserAddresses.css';

const UserAddresses = () => {
  const customer = useAppSelector((state) => state.customer?.info);
  const addresses = customer?.addresses;
  const shippingIds = customer?.shippingAddressIds;
  const shippingDefault = customer?.defaultShippingAddressId;
  const billingIds = customer?.billingAddressIds;
  const billingDefault = customer?.defaultBillingAddressId;

  const getAddressTypes = (id: string) => {
    const result = [];
    if (id === billingDefault) {
      result.push(AddressType.BILLING_DEFAULT);
    }
    if (id === shippingDefault) {
      result.push(AddressType.SHIPPING_DEFAULT);
    }
    if (shippingIds.includes(id)) {
      result.push(AddressType.SHIPPING);
    }
    if (billingIds.includes(id)) {
      result.push(AddressType.BILLING);
    }
    return result;
  };

  const actionItems: MenuProps['items'] = [
    {
      key: 'edit',
      label: 'Edit',
      icon: <EditOutlined />,
    },
    {
      key: 'copy',
      label: 'Copy',
      icon: <CopyOutlined />,
    },
    {
      key: 'delete',
      label: 'Delete',
      danger: true,
      icon: <MinusCircleOutlined />,
    },
  ];

  const getTableData = (): UserAddressesColumnDataType[] =>
    addresses.reduce((acc, a) => {
      return [
        ...acc,
        {
          key: a.id,
          name: a.key,
          country: a.country,
          city: a.city,
          streetName: a.streetName,
          building: a.building,
          apartment: a.apartment,
          postalCode: a.postalCode,
          addressType: getAddressTypes(a.id),
        },
      ];
    }, []);

  return (
    <Table dataSource={getTableData()} {...tableProps} className="user-addresses__table">
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Country" dataIndex="country" key="country" />
      <Column title="City" dataIndex="city" key="city" />
      <Column title="Street" dataIndex="streetName" key="streetName" />
      <Column title="Building" dataIndex="building" key="building" />
      <Column title="Apt" dataIndex="apartment" key="apartment" />
      <Column title="Zip" dataIndex="postalCode" key="postalCode" />
      <Column
        title="Type"
        dataIndex="addresTypes"
        key="addresTypes"
        width={300}
        render={(_, record: UserAddressesColumnDataType) => {
          return AddressTypesList(record.addressType);
        }}
      ></Column>
      <Column
        fixed="right"
        key="action"
        width={32}
        className="user-addresses_last-column"
        render={() => {
          return (
            <Dropdown menu={{ items: actionItems }} placement="topRight" arrow={true}>
              <Button icon={<SettingFilled />}></Button>
            </Dropdown>
          );
        }}
      />
    </Table>
  );
};

export default UserAddresses;
