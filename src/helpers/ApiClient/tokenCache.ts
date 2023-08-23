import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

let store: TokenStore = {
  token: null,
  expirationTime: null,
  refreshToken: null,
};

const tokenCache: TokenCache = {
  get() {
    return store;
  },

  set(newStore: TokenStore) {
    store = newStore;
    return;
  },
};

export default tokenCache;
