import { CustomerSignin } from '@commercetools/platform-sdk';
import getApiClient from './getApiClient';

export function loginRequest(email: string, password: string) {
  const body: CustomerSignin = {
    email: email,
    password: password,
    anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
    updateProductData: true,
  };
  return getApiClient({ email, password })
    .me()
    .login()
    .post({
      body,
    })
    .execute();
}
