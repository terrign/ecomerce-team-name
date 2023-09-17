import { Image, List, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { RouterPath } from '../../models/RouterPath';
import { CartItemData, ItemControlsProps } from '../../models/Cart';
import CartItemControls from './CartItemControls';

const CartItem = (props: CartItemData) => {
  const itemControlsProps: ItemControlsProps = {
    productId: props.id,
    quantity: props.quantity,
  };

  return (
    <List.Item key={props.id}>
      <div className="cart-item__image">
        <Image src={props.imgSrc} preview={{ mask: null }} />
      </div>
      <List.Item.Meta
        title={<Link to={`${RouterPath.PRODUCT}/${props.id}`}>{props.name}</Link>}
        description={`${props.price}$`}
      />
      <div className="cart-item__tail">
        <CartItemControls {...itemControlsProps}></CartItemControls>

        <Typography.Text className="cart-item__total-price">{`${props.totalPrice}$`}</Typography.Text>
      </div>
    </List.Item>
  );
};

export default CartItem;
