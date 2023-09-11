import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer } from './auth.slice';
import { reducer as userMenuReducer } from './userMenu.slice';
import { reducer as alertReducer } from './alert.slice';
import { reducer as productSliderReducer } from './productSlider.slice';
import { reducer as customerReducer } from './customer.slice';
import { reducer as categoriesReducer } from './categories.slice';

const reducers = combineReducers({
  auth: authReducer,
  userMenu: userMenuReducer,
  alert: alertReducer,
  productSlider: productSliderReducer,
  customer: customerReducer,
  categories: categoriesReducer,
});

export const store = configureStore({
  reducer: reducers,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
