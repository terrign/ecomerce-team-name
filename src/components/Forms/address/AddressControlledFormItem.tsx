import React, { useContext } from 'react';
import { Button, Form, Typography } from 'antd';
import { MinusCircleOutlined, CopyOutlined, EditOutlined } from '@ant-design/icons';
import { getRandomKey } from '../../../helpers/getRandomReactKey';
import './AddressControlledFormItem.css';
import RegistrationFormContext, { AddressFormMode } from '../../../context/RegistrationFormContext';
const { Text } = Typography;

const AddressControlledFormItem = ({ index }: { index: number }) => {
  const context = useContext(RegistrationFormContext);
  const values = context.addresses.items[index];

  const addressString = `${values.building ? values.building + ' ' : ''}${values.street}${
    values.apartment ? ', Apt ' + values.apartment : ''
  }, ${values.city} ${values.zip}, ${values.country}`;

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
    // context.addressForm.validateFields();
  };

  return (
    <Form.Item label={values.key || `Address ${index + 1}`} name={`${values.key}${Math.random().toFixed(0)}`}>
      <Typography>
        <pre style={{ padding: 3, margin: 0 }}>{addressString}</pre>
        <div className="markers-container">
          {values.types.map((t) => {
            let style = {};
            if (t === 'Default Billing Address' || t === 'Default Shipping Address') {
              style = { backgroundColor: 'rgb(6, 124, 198, 0.3)' };
            }
            return (
              <Text key={getRandomKey(t)} style={style} className="address-type-mark">
                {t}
              </Text>
            );
          })}
        </div>
        <div className="address-item__buttons-container">
          <Button style={{ flexGrow: 1 }} type="dashed" icon={<MinusCircleOutlined />} onClick={onAddressRemove}>
            Remove Address
          </Button>
          <Button style={{ flexGrow: 1 }} type="dashed" icon={<CopyOutlined />} onClick={onAddressCopy}>
            Copy Address
          </Button>
          <Button style={{ flexGrow: 1 }} type="dashed" icon={<EditOutlined />} onClick={onAddressEdit}>
            Edit Address
          </Button>
        </div>
      </Typography>
    </Form.Item>
  );
};

export default AddressControlledFormItem;
