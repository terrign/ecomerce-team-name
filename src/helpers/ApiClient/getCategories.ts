import { Category } from '@commercetools/platform-sdk';
import { SetStateAction } from 'react';
import getApiClient from './getApiClient';

const getCategories = async (callbackFn: { (value: SetStateAction<unknown[]>): void; (arg0: Category[]): void }) => {
  const resp = await getApiClient().categories().get().execute();
  const categoriesData = resp.body.results;
  callbackFn(categoriesData);
};

export default getCategories;
