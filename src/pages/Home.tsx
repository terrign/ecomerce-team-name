import React from 'react';
import { Link } from 'react-router-dom';
import { RouterPath } from '../models/RouterPath';
import { Typography, Carousel } from 'antd';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  promocode: string;
  discount: string;
  description: string;
}

const data: DataType[] = [
  {
    key: '1',
    promocode: 'KURWA',
    discount: '5%',
    description: 'Discount 5% for all purchase',
  },
  {
    key: '2',
    promocode: 'PROMO',
    discount: '10%',
    description: 'Discount 5% for all purchase',
  },
  {
    key: '3',
    promocode: 'PROMO15',
    discount: '15%',
    description: 'Discount 5% for all purchase',
  },
  {
    key: '1',
    promocode: 'KURWA',
    discount: '20%',
    description: 'Discount 5% for all purchase',
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: 'Promocode',
    dataIndex: 'promocode',
    key: 'promocode',
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    key: 'discount',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
];

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '70px',
  color: 'rgb(0, 21, 41)',
  lineHeight: '70px',
  textAlign: 'center',
  background: 'rgb(200, 200, 200)',
};

const pStyle: React.CSSProperties = {
  margin: 0,
  height: '60px',
  color: 'rgb(0, 21, 41)',
  textAlign: 'center',
  background: 'rgb(200, 200, 200)',
};

const { Title, Paragraph, Text } = Typography;
const Home = () => {
  return (
    <Typography>
      <Title>Welcome to HYPERSHOP</Title>
      <Paragraph>
        Hello everyone! Welcome to Hypershop, your ultimate online destination for all your tech needs. At Hypershop, we
        pride ourselves on offering a wide range of cutting-edge gadgets and electronics that are sure to enhance your
        everyday life. From smartphones and laptops to smart home devices and gaming consoles, we have it all. What sets
        us apart from other online stores is our commitment to quality and customer satisfaction. We carefully curate
        curate our product selection to ensure that each item meets our high standards of performance and durability.
        Not only do we offer top-notch products, but we also provide excellent customer service. Our team of
        knowledgeable and friendly experts is always ready to assist you with any questions or concerns you may have.
      </Paragraph>
      <Paragraph>
        Shopping at Hypershop is not just about buying the latest technology; it's about experiencing convenience and
        efficiency. With our user-friendly interface and secure payment options, you can browse and purchase your
        favorite gadgets with ease. We understand that technology is constantly evolving, which is why we stay
        up-to-date with the latest trends and innovations. Whether you're a tech enthusiast or simply looking for a
        reliable device, Hypershop is your go-to destination. So, why wait? Start exploring our extensive collection
        today and discover the endless possibilities that technology has to offer. Join our community of satisfied
        customers and let us be your trusted partner in the world of tech.{' '}
        <Text strong>
          Thank you for choosing Hypershop. We look forward to serving you and providing an exceptional shopping
          experience.
        </Text>
      </Paragraph>
      <Title level={2}>Promocodes only for you!</Title>
      <Carousel>
        <div>
          <h3 style={contentStyle}>KURWA</h3>
          <p style={pStyle}>for 5%</p>
        </div>
        <div>
          <h3 style={contentStyle}>PROMO</h3>
          <p style={pStyle}>for 10%</p>
        </div>
        <div>
          <h3 style={contentStyle}>PROMO15</h3>
          <p style={pStyle}>for 15%</p>
        </div>
        <div>
          <h3 style={contentStyle}>OOOKURWA</h3>
          <p style={pStyle}>for 20%</p>
        </div>
      </Carousel>
      <Table columns={columns} dataSource={data} pagination={false} />
      <Title level={2}>Main links</Title>
      <ul>
        <li>
          <Link to={RouterPath.CATALOG}>Catalog</Link>
        </li>
        <li>
          <Link to={RouterPath.REG}>Registration</Link>
        </li>
        <li>
          <Link to={RouterPath.LOGIN}>Login</Link>
        </li>
      </ul>
    </Typography>
  );
};

export default Home;
