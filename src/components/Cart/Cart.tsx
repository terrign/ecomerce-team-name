import { Button, List, Popconfirm, Typography, Select, Form } from 'antd';
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
import { removeCartDiscount } from '../../helpers/ApiClient/cart/removeCartDiscount';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const items = lineItemsReducer(cart?.lineItems);
  const [form] = Form.useForm();
  const [priceNoDiscount, setPriceNoDiscount] = useState(null);
  const [isDiscounted, setIsDiscounted] = useState(cart.discountCodes.length > 0);

  const onClear = () => {
    clearCart();
  };

  const countPriceNoDiscount = () => {
    return (
      cart.lineItems.reduce((prev, curr) => {
        if (curr.variant.prices[0].discounted) {
          return prev + curr.variant.prices[0].discounted.value.centAmount * curr.quantity;
        }
        return prev + curr.variant.prices[0].value.centAmount * curr.quantity;
      }, 0) / 100
    );
  };

  const removeDiscount = async () => {
    removeCartDiscount();
    setIsDiscounted(false);
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
      setIsDiscounted(true);
    } else {
      dispatch(alertSlice.actions.error('Sorry, promocode already used'));
    }
  };

  useEffect(() => {
    if (isDiscounted) {
      setPriceNoDiscount(countPriceNoDiscount());
    }
  }, [cart.totalPrice]);

  return (
    <>
      <div className="cart-wrapper">
        <Form style={{ marginBottom: 20 }} layout="inline" onFinish={onFinish} form={form}>
          <Form.Item style={{ marginBottom: 5 }} name={'promocode'}>
            <Select
              allowClear
              onClear={removeDiscount}
              placeholder="Your promo here"
              optionFilterProp="children"
              options={[
                {
                  value: 'PROMO5',
                  label: 'PROMO5',
                },
                {
                  value: 'PROMO10',
                  label: 'PROMO10',
                },
                {
                  value: 'PROMO15',
                  label: 'PROMO15',
                },
                {
                  value: 'PROMO20',
                  label: 'PROMO20',
                },
              ]}
            />
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
                  {isDiscounted && <p style={{ textDecoration: 'line-through' }}>{priceNoDiscount}$</p>}
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
