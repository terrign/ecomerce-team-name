import React, { useEffect } from 'react';
import { Menu, MenuProps } from 'antd';
import { ITEMS_ANONYMOUS_USER, ITEMS_LOGGED_USER } from '../constants/UserMenus';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { actions as userMenuActions } from '../store/userMenu.slice';
import { actions as authActions, authSlice } from '../store/auth.slice';
import { RouterPath } from '../models/RouterPath';
import { useNavigate } from 'react-router-dom';
import getApiClient from '../helpers/ApiClient/Client';

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logged: boolean = useAppSelector((state) => state.auth.token > '') ?? false;
  const isLogged = useAppSelector((state) => (state.auth.token ? true : false));
  const menuItems = logged ? ITEMS_LOGGED_USER : ITEMS_ANONYMOUS_USER;
  useEffect(() => {
    if (isLogged) {
      getApiClient()()
        .me()
        .get()
        .execute()
        .then((res) => {
          console.log(res);
          dispatch(
            authSlice.actions.updateUserName({
              username: `${res.body.firstName} ${res.body.lastName}`,
            })
          );
        })
        .catch(() => {
          dispatch(authSlice.actions.logout);
        });
    }
  }, [isLogged]);
  const onClick = ({ key }: Parameters<MenuProps['onClick']>[0]) => {
    dispatch(userMenuActions.toggle());
    if (RouterPath.LOGOUT === key) {
      dispatch(authActions.logout());
      navigate(RouterPath.HOME);
    }
  };

  return (
    <Menu onClick={onClick} openKeys={['sub1']} theme="light" items={menuItems} mode="inline" selectedKeys={null} />
  );
};

export default UserMenu;
