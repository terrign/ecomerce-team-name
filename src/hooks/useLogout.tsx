import { useNavigate } from 'react-router-dom';
import { authSlice } from '../store/auth.slice';
import { cartSlice } from '../store/cart.slice';
import { customerSlice } from '../store/customer.slice';
import { useAppDispatch } from '../store/hooks';
import { RouterPath } from '../models/RouterPath';

const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(authSlice.actions.logout());
    dispatch(customerSlice.actions.delete());
    dispatch(cartSlice.actions.delete());
    navigate(RouterPath.HOME);
  };

  return logout;
};

export default useLogout;
