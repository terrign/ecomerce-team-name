import { alertSlice } from '../../../store/alert.slice';
import { cartSlice } from '../../../store/cart.slice';
import { store } from '../../../store/store';
import getApiClient from '../getApiClient';

const removeLineItem = async (productId: string) => {
  const cart = store.getState().cart.cart;
  const lineItemId = cart.lineItems.find((a) => a.productId === productId).id;
  try {
    const res = await getApiClient()
      .me()
      .carts()
      .withId({ ID: cart.id })
      .post({
        body: {
          version: cart.version,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId,
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

export default removeLineItem;
