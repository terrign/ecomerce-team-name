import { MyCustomerUpdate } from '@commercetools/platform-sdk';
import getApiClient from '../getApiClient';

function setLastName(version: number, value: string) {
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: 'setLastName',
        lastName: value,
      },
    ],
  };

  return getApiClient().me().post({ body }).execute();
}

export default setLastName;
