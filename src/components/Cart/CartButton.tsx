import './CartButton.css';
import { Button, Spin, Typography, theme } from 'antd';
import React, { useState } from 'react';
import addLineItem from '../../helpers/ApiClient/cart/addLineItem';
import CartItemControls from './CartItemControls';
import { useAppSelector } from '../../store/hooks';

interface CartButtonProps {
  productId: string;
}

const CartButton = ({ productId }: CartButtonProps) => {
  const [loading, setLoading] = useState(false);
  const quantity = useAppSelector(
    (state) => state.cart.cart?.lineItems?.find((a) => a.productId === productId)?.quantity
  );
  theme;

  const token = theme.useToken().token;

  const onAdd = () => {
    setLoading(() => true);
    addLineItem(productId).then(() => setLoading(() => false));
  };

  const borderColor = token.colorBorder;
  const borderWidth = token.lineWidth;
  const borderRadius = token.borderRadius;
  const borderStyle = 'solid';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 192,
        height: 36,
      }}
      onClick={(event) => (event.bubbles = false)}
    >
      {loading && <Spin size="small" style={{ margin: '0 auto' }}></Spin>}
      {!loading && quantity && (
        <div
          style={{
            width: 192,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 36,
            padding: '5px 0px 5px 10px',
            borderColor: borderColor,
            borderWidth,
            borderRadius,
            borderStyle,
          }}
        >
          <Typography.Text strong>In cart:</Typography.Text>
          <CartItemControls productId={productId} quantity={quantity} />
        </div>
      )}
      {!loading && !quantity && (
        <Button onClick={onAdd} type="primary" style={{ minWidth: 192, height: 36 }}>
          Add To Cart
        </Button>
      )}
    </div>
  );
};

export default CartButton;
