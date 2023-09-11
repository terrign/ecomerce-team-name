import { Cart } from '@commercetools/platform-sdk';
import { store } from '../../../store/store';
import getApiClient from '../getApiClient';
import createCart from './createCart';
import { cartSlice } from '../../../store/cart.slice';
import { alertSlice } from '../../../store/alert.slice';
import { UserType, authSlice } from '../../../store/auth.slice';

const addLineItem = async (productId: string) => {
  const cart: Cart = store.getState().cart.cart;
  const userType = store.getState().auth.userType;
  if (!cart) {
    try {
      const res = await createCart();
      store.dispatch(cartSlice.actions.set(res.body));
      if (userType !== UserType.CUSTOMER) {
        store.dispatch(authSlice.actions.anonRootCreated());
      }
    } catch (e) {
      store.dispatch(alertSlice.actions.error(e.message));
    }
  }
  try {
    const res = await getApiClient()
      .me()
      .carts()
      .withId({ ID: store.getState().cart.cart.id })
      .post({
        body: {
          version: store.getState().cart.cart.version,
          actions: [
            {
              action: 'addLineItem',
              productId: productId,
              quantity: 1,
            },
          ],
        },
      })
      .execute();
    store.dispatch(cartSlice.actions.set(res.body));
    return res;
  } catch (e) {
    store.dispatch(alertSlice.actions.error(e.message));
  }
};

export default addLineItem;
