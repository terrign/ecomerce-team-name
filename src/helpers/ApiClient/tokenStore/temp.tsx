import { Button } from 'antd';
import React from 'react';
import myTokenCache from '../TokenStore';
import Cookie from '../../../utils/Cookie';
import getApiClient from '../Client';

const Test = () => {
  const handler = async () => {
    console.log('cache', myTokenCache.get().token);
    console.log(Cookie.get('token'));
    getApiClient()()
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
