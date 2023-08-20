import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ANONYMOUS_USER } from '../constants/UserMenus';

export type AuthState = {
  token: string | null;
  username: string;
  remember?: boolean;
};

const initialState = () => {
  const auth = { token: null as string, username: ANONYMOUS_USER };
  document.cookie.split('; ').forEach((item) => {
    const [key, valueDecoded] = item.split('=');
    const value = decodeURIComponent(valueDecoded);
    if (key in auth) Object.assign(auth, { [key]: value });
  });
  return { token: auth.token, username: auth.username } as AuthState;
};

const setAuthCookie = (token: AuthState['token'], username: AuthState['username']) => {
  document.cookie = `token=${encodeURIComponent(token)}`;
  document.cookie = `username=${encodeURIComponent(username)}`;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<AuthState>) => {
      state.token = action.payload ? action.payload.token : 'anytoken';
      state.username = action.payload.username || 'User Name';
      state.remember = action.payload.remember ?? true;
      if (state.remember) setAuthCookie(state.token ?? '', state.username ?? '');
    },
    logout: (state: AuthState) => {
      state.token = null;
      state.username = ANONYMOUS_USER;
      setAuthCookie(state.token ?? '', state.username ?? '');
    },
  },
});

export const { actions, reducer } = authSlice;
