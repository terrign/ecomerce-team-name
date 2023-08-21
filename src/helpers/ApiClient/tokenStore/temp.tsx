import { Button } from 'antd';
import React from 'react';
import existingRoot from '../roots/existingTokenRoot';
import myTokenCache from '../TokenStore';

const Test = () => {
  const handler = async () => {
    const client = existingRoot;
    client
      .me()
      .get()
      .execute()
      .then((res) => {
        console.log(res);
        console.log(cache.get());
      });

    const cache = myTokenCache;
    console.log(cache.get());
  };
  return <Button onClick={handler}></Button>;
};

export default Test;
