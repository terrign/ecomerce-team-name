import React from 'react';
import { Col } from 'antd';
import { Card } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

type CatalogItem = {
  name: string;
  description: string;
  image: string;
};

const gridStyle: React.CSSProperties = {
  width: '100%',
  height: 150,
  // textAlign: ',
};
const { Meta } = Card;

export const CatalogItem = (props: CatalogItem) => {
  return (
    <Col flex={3}>
      <Card
        hoverable
        style={{ maxWidth: 240, height: '100%' }}
        cover={<img alt="example" src={props.image} style={{ height: 200 }} />}
        actions={[<EllipsisOutlined key="ellipsis" title="detail" label="more" />]}
      >
        <Card.Grid style={gridStyle} hoverable={false}>
          <Meta title={props.name} description={props.description} />
        </Card.Grid>
      </Card>
    </Col>
  );
};
