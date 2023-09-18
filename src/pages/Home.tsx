import React from 'react';
import { Link } from 'react-router-dom';
import { RouterPath } from '../models/RouterPath';
import { Typography } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

const promoDesc: React.CSSProperties = {
  margin: 0,
  marginBottom: '40px',
};

const swiperSlideStyle: React.CSSProperties = {
  background: 'none',
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
        our product selection to ensure that each item meets our high standards of performance and durability. Not only
        do we offer top-notch products, but we also provide excellent customer service.
      </Paragraph>
      <Paragraph>
        Shopping at Hypershop is not just about buying the latest technology; it's about experiencing convenience and
        efficiency. With our user-friendly interface and secure payment options, you can browse and purchase your
        favorite gadgets with ease. Whether you're a tech enthusiast or simply looking for a reliable device, Hypershop
        is your go-to destination. So, why wait? Start exploring our extensive collection today and discover the endless
        possibilities that technology has to offer. Join our community of satisfied customers and let us be your trusted
        partner in the world of tech.
        <Text strong>
          Thank you for choosing Hypershop. We look forward to serving you and providing an exceptional shopping
          experience.
        </Text>
      </Paragraph>
      <Title level={2}>Promocodes only for you!</Title>

      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide style={swiperSlideStyle}>
          <Typography>
            <Title level={2}>PROMO5</Title>
            <Paragraph style={promoDesc}>for 5%</Paragraph>
          </Typography>
        </SwiperSlide>
        <SwiperSlide style={swiperSlideStyle}>
          <Typography>
            <Title level={2}>PROMO10</Title>
            <Paragraph style={promoDesc}>for 10%</Paragraph>
          </Typography>
        </SwiperSlide>
        <SwiperSlide style={swiperSlideStyle}>
          <Typography>
            <Title level={2}>PROMO15</Title>
            <Paragraph style={promoDesc}>for 15%</Paragraph>
          </Typography>
        </SwiperSlide>
        <SwiperSlide style={swiperSlideStyle}>
          <Typography>
            <Title level={2}>PROMO20</Title>
            <Paragraph style={promoDesc}>for 20%</Paragraph>
          </Typography>
        </SwiperSlide>
      </Swiper>
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
