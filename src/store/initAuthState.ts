import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import getApiClient from '../helpers/ApiClient/Client';
import { ANONYMOUS_USER } from '../constants/UserMenus';
import { authSlice } from './auth.slice';

const initAuthState = () => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (authState.tokenStore.token && authState.username === ANONYMOUS_USER) {
      getApiClient()
        .me()
        .get()
        .execute()
        .then((res) => {
          dispatch(authSlice.actions.initAuthState(`${res.body.firstName} ${res.body.lastName}`));
        })
        .catch(() => {
          getApiClient('refresh')
            .me()
            .get()
            .execute()
            .then((res) => {
              dispatch(authSlice.actions.initAuthStateWithRefresh(`${res.body.firstName} ${res.body.lastName}`));
            })
            .catch(() => dispatch(authSlice.actions.logout()));
        });
    }
  }, []);
};

export default initAuthState;
