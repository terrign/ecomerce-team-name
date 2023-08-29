import { MyCustomerUpdate } from '@commercetools/platform-sdk';
import getApiClient from '../getApiClient';

function changeEmail(version: number, value: string) {
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: 'changeEmail',
        email: value,
      },
    ],
  };

  return getApiClient().me().post({ body }).execute();
}

export default changeEmail;
