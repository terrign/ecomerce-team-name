import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import getPasswordRoot from './roots/passwordRoot';
import getExistingTokenRoot from './roots/existingTokenRoot';
import visitorRoot from './roots/visitorRoot';
import { store } from '../../store/store';

function getApiClient() {
  const token = store.getState().auth.token;
  return function getRoot(email?: string, password?: string): ByProjectKeyRequestBuilder {
    if (email && password) {
      return getPasswordRoot(email, password);
    }
    if (!token) {
      return visitorRoot;
    }
    return getExistingTokenRoot(token);
  };
}

export default getApiClient;
