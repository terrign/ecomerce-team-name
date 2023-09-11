import { Category } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type CategoriesState = {
  items: Category[];
};

const initialState: CategoriesState = {
  items: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    set: (state: CategoriesState, action: PayloadAction<Category[]>) => {
      state.items = action.payload;
    },
  },
});

export const { actions, reducer } = categoriesSlice;
