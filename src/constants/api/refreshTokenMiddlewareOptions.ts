import { RefreshAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { AUTH_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY } from '../env';
import tokenCache from '../../helpers/ApiClient/tokenCache';

const getRefreshTokenOptions = (refreshToken: string): RefreshAuthMiddlewareOptions => {
  return {
    host: AUTH_URL,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    },
    refreshToken,
    tokenCache: tokenCache,
    fetch,
  };
};

export default getRefreshTokenOptions;
