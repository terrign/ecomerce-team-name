import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, MenuProps, Table, Form } from 'antd';
import { AddressType } from '../../../constants/forms/address-form/address-types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { MinusCircleOutlined, CopyOutlined, SettingFilled, EditOutlined } from '@ant-design/icons';
import AddressTypesList from './AddressTypesList';
import { tableProps } from '../../../constants/userAddressTableProps';
const { Column } = Table;
import './UserAddresses.css';
import AddressFormContext, { AddressFormMode } from '../../../context/AddressFormContext';
import { UserAddressesColumnDataType } from '../../../models/AddressFormTypes';
import RegistrationAddressModalForm from '../../Forms/address/RegistrationAddressModalForm';
import removeAddress from '../../../helpers/ApiClient/customerUpdateRequests.ts/address/removeAddress';
import { customerSlice } from '../../../store/customer.slice';
import { alertSlice } from '../../../store/alert.slice';
import addAddress from '../../../helpers/ApiClient/customerUpdateRequests.ts/address/addAddress';
import { COUNTRIES } from '../../../constants/forms/address-form/countries';
import changeAddress from '../../../helpers/ApiClient/customerUpdateRequests.ts/address/changeAddress';
import getAddressChangeRequestParameters from '../../../helpers/ApiClient/customerUpdateRequests.ts/address/getAddressChangeRequestParameters';

const UserAddresses = () => {
  const customer = useAppSelector((state) => state.customer?.info);
  const addresses = customer?.addresses;
  const shippingIds = customer?.shippingAddressIds;
  const shippingDefault = customer?.defaultShippingAddressId;
  const billingIds = customer?.billingAddressIds;
  const billingDefault = customer?.defaultBillingAddressId;
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState(AddressFormMode.NEW);
  const [form] = Form.useForm();
  const [currentAddress, setcurrentAddress] = useState<UserAddressesColumnDataType>();
  const context = useContext(AddressFormContext);
  const dispatch = useAppDispatch();

  const contextInit = {
    ...context,
    addressForm: form,
    modalOpen,
    addressFormMode: mode,
    setModalOpen: setModalOpen,
    setAddressFormMode: setMode,
    currentAddress,
    setcurrentAddress,
  };

  useEffect(() => {
    context.addresses.items = getTableData();
    context.addresses.add = addAddressHandler;
  }, [customer]);

  function getAddressTypes(id: string) {
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
  }
  function getTableData(): UserAddressesColumnDataType[] {
    return addresses.reduce((acc, a) => {
      return [
        ...acc,
        {
          key: a.key,
          id: a.id,
          name: a.key,
          country: COUNTRIES.find((o) => a.country === o.ISO).Country,
          city: a.city,
          streetName: a.streetName,
          building: a.building,
          apartment: a.apartment,
          postalCode: a.postalCode,
          types: getAddressTypes(a.id),
        },
      ];
    }, []);
  }

  const getActionItems = (record: UserAddressesColumnDataType): MenuProps['items'] => {
    return [
      {
        key: 'edit',
        label: 'Edit',
        icon: <EditOutlined />,
        onClick: () => {
          setMode(() => AddressFormMode.EDIT);
          setcurrentAddress(() => record);
          form.setFieldsValue({ ...record, country: COUNTRIES.find((a) => a.Country === record.country).ISO });
          context.addresses.editUserProfile = editAddressHandler;
          setModalOpen(() => true);
        },
      },
      {
        key: 'copy',
        label: 'Copy',
        icon: <CopyOutlined />,
        onClick: () => {
          setMode(() => AddressFormMode.COPY);
          form.setFieldsValue({ ...record, country: COUNTRIES.find((a) => a.Country === record.country).ISO });
          setModalOpen(() => true);
        },
      },
      {
        key: 'delete',
        label: 'Delete',
        danger: true,
        icon: <MinusCircleOutlined />,
        onClick: () => removeAddressHandler(record.id),
      },
    ];
  };

  const removeAddressHandler = async (id: string) => {
    const res = await removeAddress(customer.version, id);
    dispatch(customerSlice.actions.set(res.body));
    dispatch(alertSlice.actions.success('Address has been removed!'));
  };

  async function editAddressHandler(currentAddress: UserAddressesColumnDataType) {
    const [address, typeOptions] = getAddressChangeRequestParameters(form);
    try {
      const res = await changeAddress(customer.version, address, typeOptions, currentAddress);
      dispatch(customerSlice.actions.set(res.body));
      dispatch(alertSlice.actions.success('Address successfully changed!'));
      setModalOpen(() => false);
    } catch (e) {
      const message = e.message.match(`The given address with 'key`) ? 'Address name already in use' : e.message;
      dispatch(alertSlice.actions.error(message));
    }
  }

  async function addAddressHandler() {
    const [address, typeOptions] = getAddressChangeRequestParameters(form);
    try {
      const res = await addAddress(customer.version, address, typeOptions);
      dispatch(customerSlice.actions.set(res.body));
      dispatch(alertSlice.actions.success('Address successfully added!'));
      setModalOpen(() => false);
    } catch (e) {
      const message = e.message.match(`The given address with 'key`) ? 'Address name already in use' : e.message;
      dispatch(alertSlice.actions.error(message));
    }
  }

  return (
    <AddressFormContext.Provider value={contextInit}>
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
          dataIndex="addressTypes"
          key="addressTypes"
          width={getTableData().length === 0 ? 100 : 300}
          render={(_, record: UserAddressesColumnDataType) => AddressTypesList(record.types)}
        ></Column>
        <Column
          fixed="right"
          key="action"
          width={32}
          className="user-addresses_last-column"
          render={(_, record: UserAddressesColumnDataType) => {
            return (
              <Dropdown menu={{ items: getActionItems(record) }} placement="topRight" arrow={true} trigger={['click']}>
                <Button icon={<SettingFilled />}></Button>
              </Dropdown>
            );
          }}
        />
      </Table>
      <RegistrationAddressModalForm type="profile"></RegistrationAddressModalForm>
      <Button
        type="primary"
        style={{ marginTop: 10 }}
        onClick={() => {
          form.resetFields();
          setMode(AddressFormMode.NEW);
          setModalOpen(() => true);
        }}
      >
        Add address
      </Button>
    </AddressFormContext.Provider>
  );
};

export default UserAddresses;
