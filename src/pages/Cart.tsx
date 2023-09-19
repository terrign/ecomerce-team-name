import React, { useEffect } from 'react';
import Cart from '../components/Cart/Cart';
import { useAppSelector } from '../store/hooks';
import { Empty, Typography } from 'antd';
import emptyCart from '../assets/empty-cart.svg';
import { Link } from 'react-router-dom';
import { RouterPath } from '../models/RouterPath';
import { removeCartDiscount } from '../helpers/ApiClient/cart/removeCartDiscount';

const CartPage = () => {
  const cart = useAppSelector((state) => state.cart.cart);
  const items = useAppSelector((state) => state.cart.cart?.lineItems);
  useEffect(() => {
    if (items?.length === 0 && cart.discountCodes.length > 0) {
      removeCartDiscount();
    }
  }, [items]);
  return items?.length > 0 ? (
    <Cart />
  ) : (
    <Empty
      image={<img src={emptyCart}></img>}
      description={
        <Typography.Paragraph strong style={{ fontSize: '1.2rem' }}>
          Your cart is empty. <Link to={RouterPath.CATALOG}>Continue shopping</Link>
        </Typography.Paragraph>
      }
    ></Empty>
  );
};

export default CartPage;
