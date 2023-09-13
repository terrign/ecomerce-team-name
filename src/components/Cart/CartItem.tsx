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
    <List.Item>
      <div className="cart-item__image">
        <Image src={props.imgSrc} preview={{ mask: null }} />
      </div>
      <List.Item.Meta
        title={<Link to={`${RouterPath.PRODUCT}/${props.productKey}`}>{props.name}</Link>}
        description={`${props.price}$`}
      />
      <div className="cart-item__tail">
        <div className="cart-item__controls">
          <CartItemControls {...itemControlsProps}></CartItemControls>
        </div>
        <Typography.Text className="cart-item__total-price">{`${props.totalPrice}$`}</Typography.Text>
      </div>
    </List.Item>
  );
};

export default CartItem;
