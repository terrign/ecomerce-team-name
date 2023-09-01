import { createSlice } from '@reduxjs/toolkit';
import { Category } from '@commercetools/platform-sdk';

type CategoryState = {
  categories: Array<Category>;
};

const initialState = () => {
  const categoryInitState: CategoryState = {
    categories: null,
  };
  return categoryInitState;
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    set: (state: CategoryState, action) => {
      state.categories = action.payload;
    },
  },
});

export const { actions, reducer } = categorySlice;
