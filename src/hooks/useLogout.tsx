import { authSlice } from '../store/auth.slice';
import { cartSlice } from '../store/cart.slice';
import { customerSlice } from '../store/customer.slice';
import { useAppDispatch } from '../store/hooks';

const useLogout = () => {
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(authSlice.actions.logout());
    dispatch(customerSlice.actions.delete());
    dispatch(cartSlice.actions.delete());
  };

  return logout;
};

export default useLogout;
