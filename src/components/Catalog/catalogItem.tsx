import React from 'react';
import { Skeleton, Card } from 'antd';
import './catalogItem.css';

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
    <Card
      loading={props.load}
      bordered={false}
      hoverable
      style={{ maxWidth: 240, minWidth: 200, height: '100%' }}
      cover={
        <Skeleton loading={props.load}>
          <div style={{ minHeight: 150, display: 'flex' }}>
            <img alt="example" src={props.image} style={{ margin: 'auto', maxWidth: 130, maxHeight: 150 }} />
          </div>
        </Skeleton>
      }
    >
      <div className="card-container">
        <p className="card-title">{props.name}</p>
        <p className="card-description">{props.description}</p>
        <p className={`card-price ${props.discPrice && 'crossed'}`}>{props.price / 100}$</p>
        {props.discPrice && <p className="card-price">{props.discPrice / 100}$</p>}
      </div>
    </Card>
  );
};
