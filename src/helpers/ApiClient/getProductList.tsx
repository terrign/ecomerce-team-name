import { QueryArgs } from '../../models/Catalog';
import getApiClient from './getApiClient';

const getProductList = (queryArgs: QueryArgs) => {
  return getApiClient()
    .productProjections()
    .search()
    .get({
      queryArgs: { ...queryArgs },
    })
    .execute();
};

export default getProductList;
