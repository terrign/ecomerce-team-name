import React from 'react';
import cartImg from '../../assets/cart.svg';
import './CartIcon.css';
import { Link } from 'react-router-dom';
import { RouterPath } from '../../models/RouterPath';
import { useAppSelector } from '../../store/hooks';
const CartIcon = () => {
  const itemsCount = useAppSelector((state) => state.cart.cart?.lineItems.reduce((acc, a) => acc + +a.quantity, 0));
  return (
    <Link to={RouterPath.CART}>
      <div className="header__cart-icon">
        <img src={cartImg} style={{ display: 'block', height: 32, width: 32 }}></img>
        {itemsCount > 0 && <span className="cart-icon__counter">{itemsCount}</span>}
      </div>
    </Link>
  );
};

export default CartIcon;
