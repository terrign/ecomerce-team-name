import { LineItem } from '@commercetools/platform-sdk';

export interface CartItemData {
  id: string;
  imgSrc: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  productKey: string;
}

export interface LineItemsReducer {
  (items: LineItem[]): CartItemData[];
}

export interface ItemControlsProps {
  productId: string;
  quantity: number;
}
