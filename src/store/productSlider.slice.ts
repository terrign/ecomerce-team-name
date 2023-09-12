import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ProductSliderState = {
  [name: string]: number;
};
export type ProductSliderSetAction = {
  name: string;
  index: number;
};
export type ProductSliderSyncAction = {
  nameFrom: string;
  nameTo: string;
};
const initialState: ProductSliderState = {};
export const productSliderSlice = createSlice({
  name: 'productSlider',
  initialState,
  reducers: {
    resetSliders: (state: ProductSliderState) => {
      Object.keys(state).forEach((key) => delete state[key]);
    },
    setSlider: (state: ProductSliderState, action: PayloadAction<ProductSliderSetAction>) => {
      state[action.payload.name] = action.payload.index;
    },
    syncSliders: (state: ProductSliderState, action: PayloadAction<ProductSliderSyncAction>) => {
      state[action.payload.nameTo] = state[action.payload.nameFrom];
    },
  },
});

export const { actions, reducer } = productSliderSlice;
