import { MyCustomerUpdate } from '@commercetools/platform-sdk';
import getApiClient from '../../getApiClient';

function removeAddress(version: number, value: string) {
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: 'removeAddress',
        addressId: value,
      },
    ],
  };

  return getApiClient().me().post({ body }).execute();
}

export default removeAddress;
