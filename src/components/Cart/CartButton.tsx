import './CartButton.css';
import { Button, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import addLineItem from '../../helpers/ApiClient/cart/addLineItem';
import removeLineItem from '../../helpers/ApiClient/cart/removeLineItem';
import { useAppSelector } from '../../store/hooks';

interface CartButtonProps {
  id: string;
}

const CartButton = (props: CartButtonProps) => {
  const { id } = props;
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const current = useAppSelector((state) => {
    const { quantity = 0 } = Object([...state.cart.cart.lineItems].filter(({ productId }) => productId === id)[0]);
    return quantity;
  });
  const actionClass = loading ? 'cart-product-action-await' : 'cart-product-action';
  useEffect(() => setCount(current), []);

  const addItem = async () => {
    if (loading) return;
    setLoading(true);
    await addLineItem(id).then(() => {
      setCount(count + 1);
      setLoading(false);
    });
    setLoading(false);
  };

  const removeItem = async () => {
    if (loading) return;
    setLoading(true);
    await removeLineItem(id).then(() => {
      setCount(count - 1);
      setLoading(false);
    });
    setLoading(false);
  };

  if (count < 1)
    return (
      <Button onClick={addItem} type="primary">
        Add To Cart
      </Button>
    );

  return (
    <div className="cart-button">
      <div>
        <div onClick={removeItem} className={actionClass}>
          -
        </div>
        Quantity
        <span className="cart-product-counter">{loading ? <Spin size="small" /> : count}</span>
        <div onClick={addItem} className={actionClass}>
          +
        </div>
      </div>
    </div>
  );
};

export default CartButton;
