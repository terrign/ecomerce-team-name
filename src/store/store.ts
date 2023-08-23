import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer } from './auth.slice';
import { reducer as userMenuReducer } from './userMenu.slice';
import { reducer as alertReducer } from './alert.slice';

const reducers = combineReducers({
  auth: authReducer,
  userMenu: userMenuReducer,
  alert: alertReducer,
});

export const store = configureStore({
  reducer: reducers,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
