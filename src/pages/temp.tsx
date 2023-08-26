import { Button } from 'antd';
import React from 'react';
import getApiClient from '../helpers/ApiClient/getApiClient';

const Test = () => {
  const handler = async () => {
    getApiClient()
      .products()
      .withKey({ key: 'PRODUCTKEY' })
      .get()
      .execute()
      .then((res) => {
        console.log(res);
      });
  };
  return <Button onClick={handler}></Button>;
};

export default Test;
