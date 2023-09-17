import React from 'react';
import Cart from '../components/Cart/Cart';
import { useAppSelector } from '../store/hooks';
import { Empty, Typography } from 'antd';
import emptyCart from '../assets/empty-cart.svg';
import { Link } from 'react-router-dom';
import { RouterPath } from '../models/RouterPath';

const CartPage = () => {
  const items = useAppSelector((state) => state.cart.cart?.lineItems);
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
