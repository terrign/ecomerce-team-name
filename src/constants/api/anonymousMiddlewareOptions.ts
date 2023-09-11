import { AnonymousAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { AUTH_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY } from '../env';
import tokenCache from '../../helpers/ApiClient/tokenCache';

const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: AUTH_URL,
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  scopes: [`manage_project:${PROJECT_KEY}`],
  tokenCache: tokenCache,
  fetch,
};

export default anonymousAuthMiddlewareOptions;
