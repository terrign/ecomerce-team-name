import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Skeleton, Space, Card, Modal } from 'antd';
import getProduct, { ProductDetails } from '../helpers/ApiClient/products/productById';
import { RouterPath } from '../models/RouterPath';
import './Product.css';
import Slider from '../components/Product/Slider';

// Import Swiper styles
import { actions as productSliderActions } from '../store/productSlider.slice';
import { useAppDispatch /* , useAppSelector */ } from '../store/hooks';

const Product = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProductDetails>({
    key: '',
    name: '',
    description: '',
    discount: false,
    variants: [],
    attributes: [],
    error: '',
  });
  const sliderNames = ['slider', 'slider-modal'];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => setIsModalOpen(false);

  async function fetchProduct(): Promise<void> {
    setLoading(true);
    setResult(await getProduct(params.productId));
    setLoading(false);
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    console.log('in');
    if (isModalOpen) dispatch(productSliderActions.syncSliders({ nameFrom: sliderNames[0], nameTo: sliderNames[1] }));
    else dispatch(productSliderActions.syncSliders({ nameFrom: sliderNames[1], nameTo: sliderNames[0] }));
  }, [isModalOpen]);

  if (result.error) return <Navigate to={RouterPath.ERROR_404} />;
  if (loading) return <Skeleton active />;

  return (
    <>
      <Modal getContainer={false} footer={null} centered={true} open={isModalOpen} onCancel={handleCancel}>
        <Slider name={sliderNames[1]} urls={result.variants.map(({ url }) => url)} onClick={() => {}} />
      </Modal>

      <Card title={result.name}>
        <Slider name={sliderNames[0]} urls={result.variants.map(({ url }) => url)} onClick={showModal} />

        <p>{result.description}</p>
        <Space align={'start'} wrap direction={'horizontal'} style={{ display: 'flex' }}>
          {result.attributes.map(({ key, name, label }, index) => {
            const style = result.discount && key === 'product-price' ? { textDecoration: 'line-through' } : {};
            return (
              <Card key={`card-${name}-${index}`} title={name} size="small">
                <div key={`div-${name}-${index}`} style={style}>
                  {label}
                </div>
              </Card>
            );
          })}
        </Space>
      </Card>
    </>
  );
};
export default Product;
