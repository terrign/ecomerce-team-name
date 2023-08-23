import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ANONYMOUS_USER } from '../constants/UserMenus';
import Cookie from '../utils/Cookie';
import tokenCache from '../helpers/ApiClient/tokenCache';

export type AuthState = {
  token: string | null;
  username: string;
  remember?: boolean;
};

export type UserState = {
  username: string;
};

// const initialState = () => {
//   const auth = { token: null as string, username: ANONYMOUS_USER };
//   auth.token = Cookie.get('token');
//   auth.username = auth.token ? 'User Name' : ANONYMOUS_USER;
//   return { token: auth.token, username: auth.username } as AuthState;
// };

const initialState = () => {
  const auth = { token: Cookie.get('token'), username: ANONYMOUS_USER };
  return auth as AuthState;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<AuthState>) => {
      // state.token = action.payload ? action.payload.token : 'anytoken';
      state.token = action.payload.token; //action.payload ? action.payload.token : state.token;
      state.username = action.payload.username; //|| 'User Name';
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
    updateUserName: (state: UserState, action: PayloadAction<UserState>) => {
      state.username = action.payload.username || 'User Name';
    },
  },
});

export const { actions, reducer } = authSlice;
