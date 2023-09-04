import { MyCustomerUpdate } from '@commercetools/platform-sdk';
import getApiClient from '../getApiClient';

function setFirstName(version: number, value: string) {
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: 'setFirstName',
        firstName: value,
      },
    ],
  };

  return getApiClient().me().post({ body }).execute();
}

export default setFirstName;
