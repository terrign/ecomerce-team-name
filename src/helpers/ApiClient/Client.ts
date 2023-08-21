import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import getPasswordRoot from './roots/passwordRoot';
import getExistingTokenRoot from './roots/existingTokenRoot';
import visitorRoot from './roots/visitorRoot';
import Cookie from '../../utils/Cookie';

class ApiClientPicker {
  getRoot(email?: string, password?: string): ByProjectKeyRequestBuilder {
    if (email && password) {
      console.log('passwordRootUsed');
      return getPasswordRoot(email, password);
    }
    console.log(Cookie.get('token'));
    if (!Cookie.get('token')) {
      console.log('visitorRootUsed');
      return visitorRoot;
    }
    console.log('existingTokenRootUsed');
    return getExistingTokenRoot();
  }
}

const apiClient = new ApiClientPicker();

export default apiClient;
