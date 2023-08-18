import React from 'react';
import { Avatar, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { UserMenu } from './UserMenu';
import { UserTitle } from './UserTitle';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { actions as userMenuActions } from '../store/userMenu.slice';

const UserAvatar = () => {
  const dispatch = useAppDispatch();
  const logged: boolean = useAppSelector((state) => state.auth.token > '') ?? false;
  const visible: boolean = useAppSelector((state) => state.userMenu.visible);
  const styleLogged = logged ? 'logged' : '';
  const onClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    dispatch(userMenuActions.toggle());
  };

  return (
    <Popover placement="bottomRight" title={UserTitle} content={UserMenu} trigger={['click']} open={visible}>
      <Avatar onClick={onClick} className={`logo ${styleLogged}`} icon={<UserOutlined />} />
    </Popover>
  );
};

export default UserAvatar;
