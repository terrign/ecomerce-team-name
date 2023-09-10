import { Cart } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CartState {
  cart: Cart;
}

const initialState: CartState = {
  cart: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    set: (state: CartState, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
    delete: (state: CartState) => {
      state.cart = null;
    },
  },
});

export const { actions, reducer } = cartSlice;
