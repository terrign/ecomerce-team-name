import { Button } from 'antd';
import React from 'react';
import addLineItem from '../../helpers/ApiClient/cart/addLineItem';
import getMyCart from '../../helpers/ApiClient/cart/getMyCart';
import removeLineItem from '../../helpers/ApiClient/cart/removeLineItem';
import { useAppSelector } from '../../store/hooks';

const Cart = () => {
  const productsInCart = useAppSelector((state) =>
    state.cart.cart.lineItems.map((a) => {
      return <pre key={a.productId}>{`${a.name.en}: ${a.quantity}`}</pre>;
    })
  );
  const addItem1 = async () => {
    const res = await addLineItem('21ef990f-4cda-4884-97c1-ff9fd55f8ea4');
    console.log(res);
  };
  const addItem2 = async () => {
    const res = await addLineItem('85368c2e-f667-4e20-8941-1e6a71a956e2');
    console.log(res);
  };
  const removeItem1 = async () => {
    const res = await removeLineItem('21ef990f-4cda-4884-97c1-ff9fd55f8ea4');
    console.log(res);
  };
  const removeItem2 = async () => {
    const res = await removeLineItem('85368c2e-f667-4e20-8941-1e6a71a956e2');
    console.log(res);
  };
  const onMe = async () => {
    const res = await getMyCart();
    console.log(res.body);
  };

  return (
    <>
      <Button onClick={addItem1}>addItem1</Button>
      <Button onClick={addItem2}>addItem2</Button>
      <Button onClick={removeItem1}>removeItem1</Button>
      <Button onClick={removeItem2}>removeItem2</Button>
      <Button onClick={onMe}>Carts</Button>
      {productsInCart}
    </>
  );
};

export default Cart;
