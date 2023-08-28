import { Customer } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CustomerState {
  info: Customer | undefined;
}

const initialState: CustomerState = { info: undefined };

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    set: (state: CustomerState, action: PayloadAction<Customer>) => {
      state.info = action.payload;
    },
    delete: (state: CustomerState) => {
      state.info = undefined;
    },
  },
});
export const { actions, reducer } = customerSlice;
