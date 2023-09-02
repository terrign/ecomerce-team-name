import React, { useState, useEffect, CSSProperties, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Skeleton, Carousel, Image, Space, Card } from 'antd';
import getProduct, { ProductDetails } from '../helpers/ApiClient/products/productById';
import { RouterPath } from '../models/RouterPath';
import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import './Product.css';
import emptyImage from '../assets/empty.png';
import ArrowButton from '../components/Product/ArrowButton';
import { CarouselRef } from 'antd/es/carousel';

const Product = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef<CarouselRef>();
  const [preview, setPreview] = useState(false);
  const [previewGroup, setPreviewGroup] = useState(false);
  const [result, setResult] = useState<ProductDetails>({
    key: '',
    name: '',
    description: '',
    variants: [],
    attributes: [],
    error: '',
  });

  async function fetchProduct(): Promise<void> {
    setLoading(true);
    setResult(await getProduct(params.productId));
    setLoading(false);
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (!previewGroup) {
      document.querySelectorAll<HTMLElement>('.ant-image-preview-close').forEach((node) => node.click());
    }
    carouselRef.current.goTo(current, false);
  }, [preview, previewGroup]);

  if (result.error) return <Navigate to={RouterPath.ERROR_404} />;
  if (loading) return <Skeleton active />;

  // console.log('Result', result);
  const sliderImageSize = '300px';
  const previewImageSize = '800px';
  const carouselStyle: CSSProperties = {
    width: '100%',
    textAlign: 'center',
  };
  const afterChange = (currentSlide: number) => setCurrent(currentSlide);
  const previewToolbarRender = () => false;
  const previewOnVisibleChange = (value: boolean) => {
    setPreview(value);
    setPreviewGroup(value);
  };
  const previewGroupOnChange = (current: number) => setCurrent(current);
  const previewImageRender = () => {
    return (
      <Image.PreviewGroup
        key={`preview-group`}
        preview={{
          visible: previewGroup,
          current: current,
          toolbarRender: (_, { transform: { scale }, actions: { onZoomOut, onZoomIn } }) => (
            <Space size={12}>
              <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
              <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
            </Space>
          ),
          onChange: previewGroupOnChange,
          onVisibleChange(open) {
            setPreviewGroup(open);
            setPreview(open);
          },
        }}
      >
        {result.variants.map(({ url }, index) => (
          <Image
            key={`preview-img-${index}`}
            src={url}
            fallback={emptyImage}
            preview={{
              visible: preview,
            }}
            rootClassName="root-block-preview"
            height={previewImageSize}
          />
        ))}
      </Image.PreviewGroup>
    );
  };
  return (
    <Card title={result.name}>
      <Carousel
        variableWidth={false}
        centerMode={true}
        draggable={true}
        arrows={true}
        prevArrow={<ArrowButton type={'left'} />}
        nextArrow={<ArrowButton type={'right'} />}
        initialSlide={current}
        slidesToShow={1}
        infinite={false}
        vertical={false}
        rows={1}
        style={carouselStyle}
        afterChange={afterChange}
        ref={carouselRef}
      >
        {result.variants.map(({ url }, index) => (
          <Image
            key={`slider-img-${index}`}
            src={url}
            height={sliderImageSize}
            fallback={emptyImage}
            preview={{
              toolbarRender: previewToolbarRender,
              onVisibleChange: previewOnVisibleChange,
              imageRender: previewImageRender,
            }}
          />
        ))}
      </Carousel>
      <p>{result.description}</p>
      <Space align={'start'} wrap direction={'horizontal'} style={{ display: 'flex' }}>
        {result.attributes.map(({ name, label }, index) => {
          return (
            <Card key={`card-${name}-${index}`} title={name} size="small">
              <div key={`div-${name}-${index}`}>{label}</div>
            </Card>
          );
        })}
      </Space>
    </Card>
  );
};
export default Product;
