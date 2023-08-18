import { createSlice } from '@reduxjs/toolkit';

export type UserMenuState = { visible: boolean };
const initialState: UserMenuState = { visible: false };
export const userMenuSlice = createSlice({
  name: 'userMenu',
  initialState,
  reducers: {
    show: (state: UserMenuState) => {
      state.visible = true;
    },
    hide: (state: UserMenuState) => {
      state.visible = false;
    },
    toggle: (state: UserMenuState) => {
      state.visible = !state.visible;
    },
  },
});

export const { actions, reducer } = userMenuSlice;
