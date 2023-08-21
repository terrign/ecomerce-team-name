import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ANONYMOUS_USER } from '../constants/userMenus';
import { Cookie } from '../utils/Cookie';

export type AuthState = {
  token: string | null;
  username: string;
  remember?: boolean;
};
const cookie = new Cookie();

const initialState = () => {
  const auth = { token: null as string, username: ANONYMOUS_USER };
  auth.token = cookie.get('token');
  auth.username = auth.token ? 'User Name' : ANONYMOUS_USER;
  return { token: auth.token, username: auth.username } as AuthState;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<AuthState>) => {
      state.token = action.payload ? action.payload.token : 'anytoken';
      state.username = action.payload.username || 'User Name';
      state.remember = action.payload.remember ?? false;
      if (state.remember) cookie.set('token', state.token ?? '');
    },
    logout: (state: AuthState) => {
      state.token = null;
      state.username = ANONYMOUS_USER;
      cookie.delete('token');
    },
  },
});

export const { actions, reducer } = authSlice;
