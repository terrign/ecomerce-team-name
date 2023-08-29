import React from 'react';
import { Col } from 'antd';
import { Card } from 'antd';

type CatalogItem = {
  name: string;
  description: string;
  image: string;
  price: number;
  discPrice: number;
  load: boolean;
};

export const CatalogItem = (props: CatalogItem) => {
  return (
    <Col flex={3} span={8}>
      <Card
        loading={props.load}
        bordered={false}
        hoverable
        style={{ maxWidth: 240, height: '100%' }}
        cover={
          <div style={{ height: 300, display: 'flex' }}>
            <img alt="example" src={props.image} style={{ margin: 'auto', width: '100%', height: 'auto' }} />
          </div>
        }
      >
        <p>{props.name}</p>
        <p>{props.description}</p>
        <p>{props.price / 100}$</p>
        <p>{props.discPrice / 100}$</p>
      </Card>
    </Col>
  );
};
