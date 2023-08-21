import { Button } from 'antd';
import React from 'react';
import myTokenCache from '../TokenStore';
import apiClient from '../Client';
import Cookie from '../../../utils/Cookie';

const Test = () => {
  const handler = async () => {
    console.log('cache', myTokenCache.get().token);
    console.log(Cookie.get('token'));
    apiClient
      .getRoot()
      .me()
      .get()
      .execute()
      .then((res) => {
        console.log('response', res);
      });
  };
  return <Button onClick={handler}></Button>;
};

export default Test;
