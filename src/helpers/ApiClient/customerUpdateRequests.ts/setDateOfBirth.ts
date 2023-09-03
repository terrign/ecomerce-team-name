import { MyCustomerUpdate } from '@commercetools/platform-sdk';
import getApiClient from '../getApiClient';

function setDateOfBirth(version: number, value: string) {
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: 'setDateOfBirth',
        dateOfBirth: value,
      },
    ],
  };

  return getApiClient().me().post({ body }).execute();
}

export default setDateOfBirth;
