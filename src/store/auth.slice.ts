import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookie from '../utils/Cookie';
import tokenCache from '../helpers/ApiClient/tokenCache';
import { TokenStore } from '@commercetools/sdk-client-v2';

const NO_EXPIRATION = 99999999999;

export enum UserType {
  VISITOR,
  ANON,
  CUSTOMER,
}

export type AuthState = {
  tokenStore: TokenStore;
  remember?: boolean;
  userType: UserType;
};

const initialState = () => {
  const authInitState: AuthState = {
    tokenStore: {
      token: Cookie.get('token'),
      refreshToken: Cookie.get('refreshToken'),
      expirationTime: NO_EXPIRATION,
    },
    userType: +Cookie.get('userType'),
  };
  return authInitState;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<AuthState['remember']>) => {
      state.tokenStore = tokenCache.get();
      state.userType = UserType.CUSTOMER;
      state.remember = action.payload ?? false;
      if (state.remember) {
        Cookie.set('token', state.tokenStore.token);
        Cookie.set('refreshToken', state.tokenStore.refreshToken);
        Cookie.set('userType', `${state.userType}`);
      } else {
        Cookie.delete('token');
        Cookie.delete('refreshToken');
        Cookie.delete('userType');
      }
    },
    logout: (state: AuthState) => {
      state.tokenStore = { token: null, expirationTime: null, refreshToken: null };
      state.userType = UserType.VISITOR;
      state.remember = false;
      Cookie.delete('token');
      Cookie.delete('refreshToken');
      Cookie.delete('userType');
      tokenCache.set({ token: null, expirationTime: null, refreshToken: null });
    },
    initAuthState: (state: AuthState) => {
      state.tokenStore = {
        token: Cookie.get('token'),
        expirationTime: NO_EXPIRATION,
        refreshToken: Cookie.get('refreshToken'),
      };
      state.remember = true;
      state.userType = +Cookie.get('userType');
    },
    initAuthStateWithRefresh: (state: AuthState) => {
      state.tokenStore = tokenCache.get();
      Cookie.set('token', state.tokenStore.token);
      state.remember = true;
      state.userType = +Cookie.get('userType');
    },
    anonRootCreated: (state: AuthState) => {
      state.tokenStore = tokenCache.get();
      state.userType = UserType.ANON;
      Cookie.set('token', state.tokenStore.token);
      Cookie.set('refreshToken', state.tokenStore.refreshToken);
      Cookie.set('userType', String(UserType.ANON));
    },
  },
});

export const { actions, reducer } = authSlice;
