import { MyCustomerChangePassword } from '@commercetools/platform-sdk';
import getApiClient from '../getApiClient';

const changePassword = (currentPassword: string, newPassword: string, version: number) => {
  const body: MyCustomerChangePassword = {
    version,
    currentPassword,
    newPassword,
  };

  return getApiClient().me().password().post({ body }).execute();
};

export default changePassword;
