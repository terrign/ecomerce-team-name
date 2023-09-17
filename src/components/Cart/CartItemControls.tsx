import { Button, Spin, Typography } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import addLineItem from '../../helpers/ApiClient/cart/addLineItem';
import removeLineItem from '../../helpers/ApiClient/cart/removeLineItem';
import { ItemControlsProps } from '../../models/Cart';

const CartItemControls = (props: ItemControlsProps) => {
  const [loading, setLoading] = useState(false);
  const onRemove = () => {
    setLoading(() => true);
    removeLineItem(props.productId).then(() => setLoading(() => false));
  };
  const onAdd = () => {
    setLoading(() => true);
    addLineItem(props.productId).then(() => setLoading(() => false));
  };
  return (
    <div className="cart-item__controls">
      {loading && <Spin size="small" style={{ margin: '0 auto' }}></Spin>}
      {!loading && (
        <>
          <Button icon={<MinusOutlined />} type="text" onClick={onRemove} />
          <Typography.Text strong>{props.quantity}</Typography.Text>
          <Button icon={<PlusOutlined />} type="text" onClick={onAdd} />
        </>
      )}
    </div>
  );
};

export default CartItemControls;
