import { Customer } from '@commercetools/platform-sdk';
import { UserAddressesColumnDataType } from '../models/AddressFormTypes';
import { COUNTRIES } from '../constants/forms/address-form/countries';
import { AddressType } from '../constants/forms/address-form/address-types';

function getTableData(customer: Customer): UserAddressesColumnDataType[] {
  const getAddressTypes = (addressId: string) => {
    const result = [];
    if (addressId === customer.defaultBillingAddressId) {
      result.push(AddressType.BILLING_DEFAULT);
    }
    if (addressId === customer.defaultShippingAddressId) {
      result.push(AddressType.SHIPPING_DEFAULT);
    }
    if (customer.shippingAddressIds.includes(addressId)) {
      result.push(AddressType.SHIPPING);
    }
    if (customer.billingAddressIds.includes(addressId)) {
      result.push(AddressType.BILLING);
    }
    return result;
  };
  return customer.addresses.reduce((acc, a) => {
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

export default getTableData;
