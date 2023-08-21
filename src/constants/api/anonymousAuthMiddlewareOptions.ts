import { AnonymousAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import myTokenCache from '../../helpers/ApiClient/TokenStore';
import { AUTH_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY } from '../env';

export const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: AUTH_URL,
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  tokenCache: myTokenCache,
  fetch,
};
