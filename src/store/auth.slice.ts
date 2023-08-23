import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ANONYMOUS_USER } from '../constants/UserMenus';
import Cookie from '../utils/Cookie';
import tokenCache from '../helpers/ApiClient/tokenCache';

export type AuthState = {
  token: string | null;
  username: string;
  remember?: boolean;
};

const initialState = () => {
  const auth = { token: Cookie.get('token'), username: ANONYMOUS_USER };
  return auth as AuthState;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<Omit<AuthState, 'token'>>) => {
      state.token = tokenCache.get().token;
      state.username = action.payload.username;
      state.remember = action.payload.remember ?? false;
      if (state.remember) {
        Cookie.set('token', state.token ?? '');
      } else Cookie.delete('token');
    },
    logout: (state: AuthState) => {
      state.token = null;
      state.username = ANONYMOUS_USER;
      state.remember = false;
      Cookie.delete('token');
      tokenCache.set({ token: null, expirationTime: null, refreshToken: null });
    },
    updateUserName: (state: AuthState, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { actions, reducer } = authSlice;
