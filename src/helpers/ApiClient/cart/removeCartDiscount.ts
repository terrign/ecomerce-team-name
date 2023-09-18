import getApiClient from '../getApiClient';
import { store } from '../../../store/store';
import { cartSlice } from '../../../store/cart.slice';

export const removeCartDiscount = async () => {
  const cart = store.getState().cart.cart;
  const resp = await getApiClient()
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: 'removeDiscountCode',
            discountCode: {
              typeId: cart.discountCodes[0].discountCode.typeId,
              id: cart.discountCodes[0].discountCode.id,
            },
          },
        ],
      },
    })
    .execute();
  store.dispatch(cartSlice.actions.set(resp.body));
};
