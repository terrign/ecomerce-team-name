import React from 'react';
import { Col } from 'antd';
import { Card } from 'antd';

type CatalogItem = {
  name: string;
  description: string;
  image: string;
  price: number;
  discPrice: number;
};

// const gridStyleDesc: React.CSSProperties = {
//   width: '100%',
//   minHeight: 100,
// };
// const gridStylePrice: React.CSSProperties = {
//   height: 20,
// };

// const { Meta } = Card;

export const CatalogItem = (props: CatalogItem) => {
  return (
    <Col flex={3} span={8}>
      <Card
        bordered={false}
        hoverable
        // loading={true}
        style={{ maxWidth: 240, height: '100%' }}
        cover={
          <div style={{ height: 300, display: 'flex' }}>
            <img alt="example" src={props.image} style={{ margin: 'auto', width: '100%', height: 'auto' }} />
          </div>
        }
      >
        {/* <Card.Grid style={gridStyleDesc} hoverable={false}>
          <Meta title= description={props.description} />
        </Card.Grid> */}
        <p>{props.name}</p>
        <p>{props.description}</p>
        <p>{props.price / 100}$</p>
        <p>{props.discPrice / 100}$</p>
      </Card>
    </Col>
  );
};
