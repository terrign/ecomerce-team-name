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

function ApiClient() {
  const tokenStore = store.getState().auth.tokenStore;
  return function getRoot(params?: Creds | 'refresh'): ByProjectKeyRequestBuilder {
    if (params === 'refresh') {
      console.log('refresshToken');
      return getRefreshTokenRoot(tokenStore.refreshToken);
    }
    if (params) {
      console.log('passwordToken');
      return getPasswordRoot(params.email, params.password);
    }
    if (!tokenStore.token) {
      console.log('visitorToken');
      return visitorRoot;
    }
    console.log('existingToken');
    return getExistingTokenRoot(tokenStore.token);
  };
}

const getApiClient = ApiClient();

export default getApiClient;
