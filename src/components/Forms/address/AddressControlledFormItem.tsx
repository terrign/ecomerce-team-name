import React, { useContext } from 'react';
import { Button, Form, Typography } from 'antd';
import { MinusCircleOutlined, CopyOutlined, EditOutlined } from '@ant-design/icons';
import { getRandomKey } from '../../../helpers/getRandomReactKey';
import './AddressControlledFormItem.css';
import RegistrationFormContext, { AddressFormMode } from '../../../context/AddressFormContext';
import { AddressType } from '../../../constants/forms/address-form/address-types';
import { COUNTRIES } from '../../../constants/forms/address-form/countries';
const { Text } = Typography;

const AddressControlledFormItem = ({ index }: { index: number }) => {
  const context = useContext(RegistrationFormContext);
  const values = context.addresses.items[index];

  const addressString = `${values.building ? values.building + ' ' : ''}${values.streetName}${
    values.apartment ? ', Apt ' + values.apartment : ''
  }, ${values.city} ${values.postalCode}, ${COUNTRIES.find((a) => a.ISO === values.country).Country}`;

  const onAddressEdit = () => {
    context.setAddressItemIndex(() => index);
    context.setModalOpen(() => true);
    context.addressForm.setFieldsValue(values);
    context.setAddressFormMode(() => AddressFormMode.EDIT);
  };

  const onAddressRemove = () => {
    context.addresses.remove(index);
  };

  const onAddressCopy = () => {
    context.setAddressItemIndex(() => index);
    context.addressForm.setFieldsValue(values);
    context.setAddressFormMode(() => AddressFormMode.COPY);
    context.setModalOpen(() => true);
  };

  return (
    <Form.Item label={values.key || `Address ${index + 1}`} name={`${values.key}${Math.random().toFixed(0)}`}>
      <Typography>
        <pre style={{ padding: 3, margin: 0 }}>{addressString}</pre>
        <div className="address-item__flex">
          {values.types.map((t) => {
            let className = 'address-item__type-mark';
            if (t === AddressType.SHIPPING_DEFAULT || t === AddressType.BILLING_DEFAULT) {
              className += ' address-item__type-mark_default';
            }
            return (
              <Text key={getRandomKey(t)} className={className}>
                {t}
              </Text>
            );
          })}
        </div>
        <div className="address-item__flex">
          <Button type="dashed" icon={<MinusCircleOutlined />} onClick={onAddressRemove}>
            Remove Address
          </Button>
          <Button type="dashed" icon={<CopyOutlined />} onClick={onAddressCopy}>
            Copy Address
          </Button>
          <Button type="dashed" icon={<EditOutlined />} onClick={onAddressEdit}>
            Edit Address
          </Button>
        </div>
      </Typography>
    </Form.Item>
  );
};

export default AddressControlledFormItem;
