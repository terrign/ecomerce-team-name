import { alertSlice } from '../../../store/alert.slice';
import { cartSlice } from '../../../store/cart.slice';
import { store } from '../../../store/store';
import getApiClient from '../getApiClient';

const clearCart = async () => {
  const cart = store.getState().cart.cart;
  if (cart) {
    try {
      const res = getApiClient()
        .me()
        .carts()
        .withId({ ID: cart.id })
        .delete({ queryArgs: { version: cart.version } })
        .execute();
      store.dispatch(cartSlice.actions.delete());
      return res;
    } catch (e) {
      store.dispatch(alertSlice.actions.error(e.message));
    }
  }
};

export default clearCart;
