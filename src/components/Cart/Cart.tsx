import { Button, List, Popconfirm, Typography, Input, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import clearCart from '../../helpers/ApiClient/cart/clearCart';
import lineItemsReducer from '../../helpers/reduceLineItems';
import CartItem from './CartItem';
import getApiClient from '../../helpers/ApiClient/getApiClient';
import './Cart.css';
import { store } from '../../store/store';
import { cartSlice } from '../../store/cart.slice';
import { alertSlice } from '../../store/alert.slice';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const items = lineItemsReducer(cart?.lineItems);
  const [form] = Form.useForm();
  const [priceNoDiscount, setPriceNoDiscount] = useState(null);
  const isDiscounted = cart.discountCodes.length > 0;

  const onClear = () => {
    clearCart();
  };

  const countPriceNoDiscount = () => {
    return (
      cart.lineItems.reduce((prev, curr) => {
        if (curr.variant.prices[0].discounted) {
          return prev + curr.variant.prices[0].discounted.value.centAmount;
        }
        return prev + curr.variant.prices[0].value.centAmount;
      }, 0) / 100
    );
  };

  const onFinish = async () => {
    const code = form.getFieldsValue().promocode;
    if (cart.discountCodes.length === 0) {
      const resp = await getApiClient()
        .me()
        .carts()
        .withId({ ID: cart.id })
        .post({
          body: {
            version: cart.version,
            actions: [
              {
                action: 'addDiscountCode',
                code,
              },
            ],
          },
        })
        .execute();
      setPriceNoDiscount(countPriceNoDiscount());
      store.dispatch(cartSlice.actions.set(resp.body));
    } else {
      dispatch(alertSlice.actions.error('Sorry, promocode already used'));
    }
  };

  useEffect(() => {
    if (isDiscounted) {
      setPriceNoDiscount(countPriceNoDiscount());
    }
  }, [cart]);

  return (
    <>
      <div className="cart-wrapper">
        <Form layout="inline" onFinish={onFinish} form={form}>
          <Form.Item name={'promocode'}>
            <Input placeholder="Enter your promocode" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

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
                  {priceNoDiscount && <p style={{ textDecoration: 'line-through' }}>{priceNoDiscount}$</p>}
                  Total: {cart.totalPrice.centAmount / 100}$
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
