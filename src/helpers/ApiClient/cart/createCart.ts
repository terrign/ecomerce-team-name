import { UserType } from '../../../store/auth.slice';
import { store } from '../../../store/store';
import getApiClient from '../getApiClient';

const createCart = () => {
  const userType = store.getState().auth.userType;
  const clientParam = userType === UserType.CUSTOMER ? undefined : 'anon';
  return getApiClient(clientParam)
    .me()
    .carts()
    .post({ body: { currency: 'USD' } })
    .execute();
};

export default createCart;
