import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import getApiClient from '../helpers/ApiClient/getApiClient';
import { authSlice } from './auth.slice';
import { ANONYMOUS_USER } from '../constants/general';
import { customerSlice } from './customer.slice';

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
          dispatch(customerSlice.actions.set(res.body));
        })
        .catch(() => {
          getApiClient('refresh')
            .me()
            .get()
            .execute()
            .then((res) => {
              dispatch(authSlice.actions.initAuthStateWithRefresh(`${res.body.firstName} ${res.body.lastName}`));
              dispatch(customerSlice.actions.set(res.body));
            })
            .catch(() => dispatch(authSlice.actions.logout()));
        });
    }
  }, []);
};

export default initAuthState;
