import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RouterComponent, RouterPath } from '../models/RouterPath';
export type Route = string;
export type RouteAction = { route: string; component: Route };
export type RoutesState = { routes: { [key: string]: Route } };
const initialState: RoutesState = {
  routes: {
    [RouterPath.OTHER]: RouterComponent.PAGE404,
    [RouterPath.HOME]: RouterComponent.MAIN,
    [RouterPath.LOGIN]: RouterComponent.LOGIN,
    [RouterPath.REG]: RouterComponent.REG,
    [RouterPath.PRODUCT]: RouterComponent.PRODUCT,
  },
};

export const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    loggedOut: (state: RoutesState) => {
      Object.assign(state.routes, {
        [RouterPath.REG]: RouterComponent.REG,
        [RouterPath.LOGIN]: RouterComponent.LOGIN,
      });
    },
    logged: (state: RoutesState) => {
      Object.assign(state.routes, {
        [RouterPath.REG]: RouterComponent.MAIN,
        [RouterPath.LOGIN]: RouterComponent.MAIN,
      });
    },
    add: (state: RoutesState, action: PayloadAction<RouteAction>) => {
      Object.assign(state.routes, {
        [action.payload.route]: action.payload.route,
      });
    },

    delete: (state: RoutesState, action: PayloadAction<RouteAction>) => {
      delete state.routes[`${action.payload.route}`];
    },
  },
});

export const { actions, reducer } = routesSlice;
