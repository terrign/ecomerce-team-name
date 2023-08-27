import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ArgsProps, NoticeType } from 'antd/es/message/interface';

export type AlertState = { message: string; type: NoticeType; duration: number };
const initialState: ArgsProps = { content: '', type: 'error' };
export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    show: (state: ArgsProps, action: PayloadAction<ArgsProps>) => {
      state.content = action.payload.content;
      state.type = action.payload.type;
    },
    success: (state: ArgsProps, action: PayloadAction<ArgsProps['content']>) => {
      state.content = action.payload;
      state.type = 'success';
    },
    error: (state: ArgsProps, action: PayloadAction<ArgsProps['content']>) => {
      state.content = action.payload;
      state.type = 'error';
    },
    clear: (state: ArgsProps) => {
      state.content = '';
    },
  },
});

export const { actions, reducer } = alertSlice;
