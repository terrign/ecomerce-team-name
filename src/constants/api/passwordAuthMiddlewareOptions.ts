import { PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { AUTH_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY } from '../env';
import myTokenCache from '../../helpers/ApiClient/TokenStore';

const getPasswordAuthOptions = (email: string, password: string): PasswordAuthMiddlewareOptions => {
  return {
    host: AUTH_URL,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      user: {
        username: email,
        password: password,
      },
    },
    scopes: [`manage_project:${PROJECT_KEY}`],
    tokenCache: myTokenCache,
    fetch,
  };
};

export default getPasswordAuthOptions;
