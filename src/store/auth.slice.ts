import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ANONYMOUS_USER } from '../constants/UserMenus';
import Cookie from '../utils/Cookie';
import tokenCache from '../helpers/ApiClient/tokenCache';
import { TokenStore } from '@commercetools/sdk-client-v2';

const NO_EXPIRATION = 99999999999;

export type AuthState = {
  tokenStore: TokenStore;
  username: string;
  remember?: boolean;
};

const initialState = () => {
  const authInitState: AuthState = {
    tokenStore: {
      token: Cookie.get('token'),
      refreshToken: Cookie.get('refreshToken'),
      expirationTime: NO_EXPIRATION,
    },
    username: ANONYMOUS_USER,
  };
  return authInitState;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<Omit<AuthState, 'tokenStore'>>) => {
      state.tokenStore = tokenCache.get();
      state.username = action.payload.username;
      state.remember = action.payload.remember ?? false;
      if (state.remember) {
        Cookie.set('token', state.tokenStore.token);
        Cookie.set('refreshToken', state.tokenStore.refreshToken);
      } else {
        Cookie.delete('token');
        Cookie.delete('refreshToken');
      }
    },
    logout: (state: AuthState) => {
      state.tokenStore = { token: null, expirationTime: null, refreshToken: null };
      state.username = ANONYMOUS_USER;
      state.remember = false;
      Cookie.delete('token');
      Cookie.delete('refreshToken');
      tokenCache.set({ token: null, expirationTime: null, refreshToken: null });
    },
    initAuthState: (state: AuthState, action: PayloadAction<string>) => {
      state.tokenStore = {
        token: Cookie.get('token'),
        expirationTime: NO_EXPIRATION,
        refreshToken: Cookie.get('refreshToken'),
      };
      state.remember = true;
      state.username = action.payload;
    },
    initAuthStateWithRefresh: (state: AuthState, action: PayloadAction<string>) => {
      state.tokenStore = tokenCache.get();
      state.remember = true;
      state.username = action.payload;
    },
  },
});

export const { actions, reducer } = authSlice;
