import { Button, List, Popconfirm, Typography } from 'antd';
import React from 'react';
import { useAppSelector } from '../../store/hooks';
import clearCart from '../../helpers/ApiClient/cart/clearCart';
import lineItemsReducer from '../../helpers/reduceLineItems';
import CartItem from './CartItem';
import './Cart.css';

const Cart = () => {
  const cart = useAppSelector((state) => state.cart.cart);
  const items = lineItemsReducer(cart?.lineItems);

  const onClear = () => {
    clearCart();
  };

  return (
    <>
      <div className="cart-wrapper">
        <List
          dataSource={items}
          renderItem={(itemData) => <CartItem {...itemData}></CartItem>}
          footer={
            cart?.lineItems.length > 0 && (
              <div className="cart-footer">
                <Popconfirm
                  title="Clear cart"
                  description="All items will be removed. Are you sure?"
                  onConfirm={onClear}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" danger>
                    Clear cart
                  </Button>
                </Popconfirm>

                <Typography.Title style={{ fontSize: '1.5rem', textAlign: 'end' }}>
                  Total: {cart?.totalPrice.centAmount / 100}$
                </Typography.Title>
              </div>
            )
          }
        ></List>
      </div>
    </>
  );
};

export default Cart;
