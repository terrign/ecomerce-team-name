import { LineItem } from '@commercetools/platform-sdk';
import { CartItemData, LineItemsReducer } from '../models/Cart';

const lineItemsReducer: LineItemsReducer = (items) =>
  items?.reduce((acc, a: LineItem) => {
    const item: CartItemData = {
      id: a.productId,
      imgSrc: a.variant.images[0].url,
      name: a.name.en,
      price: a.price.discounted ? a.price.discounted.value.centAmount / 100 : a.price.value.centAmount / 100,
      totalPrice: a.totalPrice.centAmount / 100,
      quantity: a.quantity,
      productKey: a.productKey,
    };
    return [...acc, item];
  }, []);

export default lineItemsReducer;
