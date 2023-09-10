import { Button } from 'antd';
import React from 'react';
import getApiClient from '../../helpers/ApiClient/getApiClient';

import addLineItem from '../../helpers/ApiClient/cart/addLineItem';

const Cart = () => {
  const onClick = async () => {
    const res = await addLineItem('21ef990f-4cda-4884-97c1-ff9fd55f8ea4');
    console.log(res);
  };
  const addItem2 = async () => {
    const res = await addLineItem('85368c2e-f667-4e20-8941-1e6a71a956e2');
    console.log(res);
  };
  const onMe = async () => {
    const res = await getApiClient().me().carts().get().execute();
    console.log(res);
  };

  return (
    <>
      <Button onClick={onClick}>addItem1</Button>
      <Button onClick={addItem2}>addItem2</Button>
      <Button onClick={onMe}>Me</Button>
    </>
  );
};

export default Cart;
