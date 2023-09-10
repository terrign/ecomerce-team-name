import getApiClient from '../getApiClient';

const getMyCart = (refresh?: 'refresh') => {
  return getApiClient(refresh).me().activeCart().get().execute();
};

export default getMyCart;
