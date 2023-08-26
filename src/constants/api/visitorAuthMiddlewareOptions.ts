import { PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { AUTH_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY } from '../env';

export const visitorAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
  host: AUTH_URL,
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    user: {
      username: 'johndoe@example.com',
      password: 'secret123',
    },
  },
  scopes: [`manage_project:${PROJECT_KEY}`],
  fetch,
};
