import React from 'react';
import { Skeleton, Card } from 'antd';
import './CatalogItem.css';
import { Link } from 'react-router-dom';
import { RouterPath } from '../../models/RouterPath';
import Meta from 'antd/es/card/Meta';

type CatalogItem = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  discPrice: number;
  load: boolean;
};

export const CatalogItem = (props: CatalogItem) => {
  return (
    <Link to={`${RouterPath.PRODUCT}/${props.id}`}>
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
        <Meta style={{ marginBottom: 10, minHeight: 130 }} title={props.name} description={props.description} />
        <div className="card-container">
          <div className="price-container">
            <p className={`card-price ${props.discPrice && 'crossed'}`}>{props.price / 100}$</p>
            {props.discPrice && <p className="card-price">{props.discPrice / 100}$</p>}
          </div>
        </div>
      </Card>
    </Link>
  );
};
