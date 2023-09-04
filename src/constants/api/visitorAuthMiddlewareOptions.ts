import { PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { AUTH_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY } from '../env';

export const visitorAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
  host: AUTH_URL,
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    user: {
      username: 'anonymous@user.com',
      password: 'q9gvqkua',
    },
  },
  scopes: [`manage_project:${PROJECT_KEY}`],
  fetch,
};
