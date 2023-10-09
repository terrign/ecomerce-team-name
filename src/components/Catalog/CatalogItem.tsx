import React from 'react';
import { Skeleton, Card } from 'antd';
import './CatalogItem.css';
import { Link, useNavigate } from 'react-router-dom';
import { RouterPath } from '../../models/RouterPath';
import Meta from 'antd/es/card/Meta';
import CartButton from '../Cart/CartButton';

type CatalogItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  discPrice: number;
  load: boolean;
};

export const CatalogItem = (props: CatalogItem) => {
  const nav = useNavigate();
  console.log(props);
  return (
    <Card
      loading={props.load}
      bordered={false}
      hoverable
      onClick={(event) => {
        if ((event.target as HTMLElement).classList.contains('ant-card-body')) {
          nav(`${RouterPath.PRODUCT}/${props.id}`);
        }
      }}
      className="card"
      // style={{ maxWidth: 240, minWidth: 200, height: '100%' }}
      cover={
        <Link to={`${RouterPath.PRODUCT}/${props.id}`}>
          <Skeleton loading={props.load}>
            <div style={{ minHeight: 150, display: 'flex' }}>
              <img alt="example" src={props.image} style={{ margin: 'auto', maxWidth: 130, maxHeight: 150 }} />
            </div>
          </Skeleton>
        </Link>
      }
    >
      <Link to={`${RouterPath.PRODUCT}/${props.id}`}>
        <Meta style={{ marginBottom: 10, minHeight: 130 }} title={props.name} description={props.description} />
        <div className="card-container">
          <div className="price-container">
            <p className={`card-price ${props.discPrice && 'crossed'}`}>{props.price / 100}$</p>
            {props.discPrice && <p className="card-price">{props.discPrice / 100}$</p>}
          </div>
        </div>
      </Link>
      <CartButton productId={props.id} />
    </Card>
  );
};
