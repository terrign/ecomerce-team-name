import React from 'react';
import { Typography } from 'antd';
import { AddressType } from '../../../constants/forms/address-form/address-types';
import { getRandomKey } from '../../../helpers/getRandomReactKey';
const { Text } = Typography;
const AddressTypesList = (addressType: AddressType[]) => {
  return (
    <div className="user-addresses__types-list">
      {addressType?.map((t) => {
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
  );
};

export default AddressTypesList;
