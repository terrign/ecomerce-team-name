import { QueryArgs } from '../../models/Catalog';
import getApiClient from './getApiClient';

const getProductList = (queryArgs?: QueryArgs) => {
  return getApiClient()
    .productProjections()
    .search()
    .get({
      queryArgs: { ...queryArgs, facet: ['variants.attributes.brand', 'variants.attributes.color'] },
    })
    .execute();
};

export default getProductList;
