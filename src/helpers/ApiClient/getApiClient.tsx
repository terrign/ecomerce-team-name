import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import getPasswordRoot from './roots/passwordRoot';
import getExistingTokenRoot from './roots/existingTokenRoot';
import visitorRoot from './roots/visitorRoot';
import { store } from '../../store/store';
import getRefreshTokenRoot from './roots/refreshTokenRoot';

interface Creds {
  email: string;
  password: string;
}

function getApiClient(params?: Creds | 'refresh'): ByProjectKeyRequestBuilder {
  const tokenStore = store.getState().auth.tokenStore;
  if (params === 'refresh') {
    return getRefreshTokenRoot(tokenStore.refreshToken);
  }
  if (params) {
    return getPasswordRoot(params.email, params.password);
  }
  if (!tokenStore.token) {
    return visitorRoot;
  }
  return getExistingTokenRoot(tokenStore.token);
}

export default getApiClient;
