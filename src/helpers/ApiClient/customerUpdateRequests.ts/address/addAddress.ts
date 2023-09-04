import { BaseAddress, Customer, MyCustomerUpdate, ClientResponse } from '@commercetools/platform-sdk';
import getApiClient from '../../getApiClient';

export interface AddAddressTypeOptions {
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
  isBilling: boolean;
  isShipping: boolean;
}

interface AddAddress {
  (version: number, value: BaseAddress, options: AddAddressTypeOptions): Promise<ClientResponse<Customer>>;
}

const addAddress: AddAddress = (version, value, options) => {
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: 'addAddress',
        address: value,
      },
    ],
  };
  if (options.isDefaultBilling) {
    body.actions.push({
      action: 'setDefaultBillingAddress',
      addressKey: value.key,
    });
  }
  if (options.isDefaultShipping) {
    body.actions.push({
      action: 'setDefaultShippingAddress',
      addressKey: value.key,
    });
  }
  if (options.isShipping && !options.isDefaultShipping) {
    body.actions.push({
      action: 'addShippingAddressId',
      addressKey: value.key,
    });
  }
  if (options.isBilling && !options.isDefaultBilling) {
    body.actions.push({
      action: 'addBillingAddressId',
      addressKey: value.key,
    });
  }

  return getApiClient().me().post({ body }).execute();
};

export default addAddress;
