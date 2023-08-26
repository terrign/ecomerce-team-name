import getApiClient from './getApiClient';

export function loginRequest(email: string, password: string) {
  return getApiClient({ email, password }).me().login().post({ body: { email, password } }).execute();
}
