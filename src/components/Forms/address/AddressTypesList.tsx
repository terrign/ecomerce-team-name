import React from 'react';
import { Typography } from 'antd';
import { AddressType } from '../../../constants/forms/address-form/address-types';
import { getRandomKey } from '../../../helpers/getRandomReactKey';
import { AddressModalFormProps } from '../../../models/AddressFormTypes';
const { Text } = Typography;

const AddressTypesList = (addressType: AddressType[], formType: AddressModalFormProps['type']) => {
  const itemList = addressType?.map((t) => {
    let className = 'address-item__type-mark';
    if (t === AddressType.SHIPPING_DEFAULT || t === AddressType.BILLING_DEFAULT) {
      className += ' address-item__type-mark_default';
    }
    return (
      <Text key={getRandomKey(t)} className={className}>
        {t}
      </Text>
    );
  });
  return <div className={formType === 'reg' ? 'address-item__flex' : 'user-addresses__types-list'}>{itemList}</div>;
};

export default AddressTypesList;
