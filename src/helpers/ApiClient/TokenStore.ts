import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';
import LocalStorage from '../../utils/LocalStorage';

let store: TokenStore = {
  token: null,
  expirationTime: null,
  refreshToken: null,
};

const myTokenCache: TokenCache = {
  get() {
    return store;
  },

  set(newStore: TokenStore) {
    LocalStorage.set('token', newStore.token);
    store = newStore;
  },
};

export default myTokenCache;
