import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { categoriesSlice } from './categories.slice';
import getApiClient from '../helpers/ApiClient/getApiClient';

const initCategoryState = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    getApiClient()
      .categories()
      .get()
      .execute()
      .then((res) => {
        dispatch(categoriesSlice.actions.set(res.body.results));
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
};

export default initCategoryState;
