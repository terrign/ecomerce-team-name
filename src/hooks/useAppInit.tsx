import { Cart, ClientResponse, Customer } from '@commercetools/platform-sdk';
import getApiClient from '../helpers/ApiClient/getApiClient';
import { UserType, authSlice } from '../store/auth.slice';
import { cartSlice } from '../store/cart.slice';
import { categoriesSlice } from '../store/categories.slice';
import { customerSlice } from '../store/customer.slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import useLogout from './useLogout';
import getMyCart from '../helpers/ApiClient/cart/getMyCart';

const useAppInit = () => {
  const userType = useAppSelector((state) => state.auth.userType);
  const dispatch = useAppDispatch();
  const logout = useLogout();

  const initStore = (cartRes: ClientResponse<Cart>, customerRes?: ClientResponse<Customer>, refresh?: boolean) => {
    refresh ? dispatch(authSlice.actions.initAuthStateWithRefresh()) : dispatch(authSlice.actions.initAuthState());
    if (customerRes) {
      dispatch(customerSlice.actions.set(customerRes.body));
    }
    dispatch(cartSlice.actions.set(cartRes.body));
  };

  const init = async () => {
    if (userType === UserType.CUSTOMER) {
      try {
        const customerRes = await getApiClient().me().get().execute();
        const cartRes = await getMyCart();
        initStore(cartRes, customerRes);
      } catch {
        try {
          const customerRes = await getApiClient('refresh').me().get().execute();
          const cartRes = await getMyCart();
          initStore(cartRes, customerRes, true);
        } catch {
          logout();
        }
      }
    } else if (userType === UserType.ANON) {
      try {
        const cartRes = await getMyCart();
        initStore(cartRes);
      } catch {
        try {
          const cartRes = await getMyCart('refresh');
          initStore(cartRes, undefined, true);
        } catch {
          logout();
        }
      }
    }
    const categoryRes = await getApiClient().categories().get().execute();
    dispatch(categoriesSlice.actions.set(categoryRes.body.results));
  };
  return init;
};

export default useAppInit;
