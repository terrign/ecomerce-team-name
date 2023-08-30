import React from 'react';
import { Col, Skeleton, Card } from 'antd';

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
          <Skeleton loading={props.load}>
            <div style={{ minHeight: 150, display: 'flex' }}>
              <img alt="example" src={props.image} style={{ margin: 'auto', maxWidth: 130, maxHeight: 150 }} />
            </div>
          </Skeleton>
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
