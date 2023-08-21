import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';
import Cookie from '../../utils/Cookie';

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
    store = newStore;
    Cookie.set('token', newStore.token);
    return;
  },
};

export default myTokenCache;
