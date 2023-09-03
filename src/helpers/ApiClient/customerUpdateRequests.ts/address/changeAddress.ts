import { BaseAddress, Customer, MyCustomerUpdate, ClientResponse } from '@commercetools/platform-sdk';
import getApiClient from '../../getApiClient';
import { UserAddressesColumnDataType } from '../../../../models/AddressFormTypes';
import { AddressType } from '../../../../constants/forms/address-form/address-types';

export interface AddAddressTypeOptions {
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
  isBilling: boolean;
  isShipping: boolean;
}

interface AddAddress {
  (
    version: number,
    value: BaseAddress,
    options: AddAddressTypeOptions,
    currentAddress: UserAddressesColumnDataType
  ): Promise<ClientResponse<Customer>>;
}

const changeAddress: AddAddress = (version, newAddress, options, currentAddress) => {
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: 'changeAddress',
        address: newAddress,
        addressId: currentAddress.id,
      },
    ],
  };
  if (options.isDefaultBilling) {
    body.actions.push({
      action: 'setDefaultBillingAddress',
      addressId: currentAddress.id,
    });
  }
  if (options.isDefaultShipping) {
    body.actions.push({
      action: 'setDefaultShippingAddress',
      addressId: currentAddress.id,
    });
  }
  if (options.isShipping && !options.isDefaultShipping) {
    body.actions.push({
      action: 'addShippingAddressId',
      addressId: currentAddress.id,
    });
  }
  if (options.isBilling && !options.isDefaultBilling) {
    body.actions.push({
      action: 'addBillingAddressId',
      addressId: currentAddress.id,
    });
  }

  if (!options.isShipping && !options.isDefaultShipping && currentAddress.types.includes(AddressType.SHIPPING)) {
    body.actions.push({
      action: 'removeShippingAddressId',
      addressId: currentAddress.id,
    });
  }

  if (!options.isBilling && !options.isDefaultBilling && currentAddress.types.includes(AddressType.BILLING)) {
    body.actions.push({
      action: 'removeBillingAddressId',
      addressId: currentAddress.id,
    });
  }

  if (!options.isDefaultShipping && currentAddress.types.includes(AddressType.SHIPPING_DEFAULT)) {
    body.actions.push({
      action: 'setDefaultShippingAddress',
      addressId: null,
    });
  }

  if (!options.isDefaultBilling && currentAddress.types.includes(AddressType.BILLING_DEFAULT)) {
    body.actions.push({
      action: 'setDefaultBillingAddress',
      addressId: null,
    });
  }

  return getApiClient().me().post({ body }).execute();
};

export default changeAddress;
