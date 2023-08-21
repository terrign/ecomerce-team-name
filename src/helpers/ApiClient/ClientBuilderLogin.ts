import apiClient from './Client';

export function loginRequest(email: string, password: string) {
  return apiClient.getRoot(email, password).me().login().post({ body: { email, password } }).execute();
}
