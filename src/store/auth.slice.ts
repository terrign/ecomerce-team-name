import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ANONYMOUS_USER } from '../constants/UserMenus';

export type AuthState = { token: string | null; username: string };
const initialState: AuthState = { token: null, username: ANONYMOUS_USER };
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<AuthState>) => {
      state.token = action.payload ? action.payload.token : 'anytoken';
      state.username = 'User Name';
    },
    logout: (state: AuthState) => {
      state.token = null;
      state.username = ANONYMOUS_USER;
    },
  },
});

export const { actions, reducer } = authSlice;
