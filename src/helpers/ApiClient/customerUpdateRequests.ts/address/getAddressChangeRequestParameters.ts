import { BaseAddress } from '@commercetools/platform-sdk';
import { AddressType } from '../../../../constants/forms/address-form/address-types';
import { AddAddressTypeOptions } from './addAddress';
import { UserAddressesColumnDataType } from '../../../../models/AddressFormTypes';
import { FormInstance } from 'antd';

const getAddressChangeRequestParameters = (form: FormInstance): [BaseAddress, AddAddressTypeOptions] => {
  const a: UserAddressesColumnDataType = form.getFieldsValue();
  const address: BaseAddress = {
    key: a.key,
    country: a.country,
    city: a.city,
    streetName: a.streetName,
    building: a.building,
    apartment: a.apartment,
    postalCode: a.postalCode,
  };
  const typeOptions: AddAddressTypeOptions = {
    isDefaultBilling: a.types?.includes(AddressType.BILLING_DEFAULT),
    isDefaultShipping: a.types?.includes(AddressType.SHIPPING_DEFAULT),
    isBilling: a.types?.includes(AddressType.BILLING),
    isShipping: a.types?.includes(AddressType.SHIPPING),
  };
  return [address, typeOptions];
};

export default getAddressChangeRequestParameters;
