import React, { useState, useEffect } from 'react';
import { PropsWithChildren } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { actions as productSliderActions } from '../../store/productSlider.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

// import required modules
import { Navigation, Keyboard, Pagination } from 'swiper/modules';
import { theme } from 'antd';

export interface SliderProps {
  urls: string[];
  name: string;
  onClick: () => void;
}

export interface CustomArrowProps extends PropsWithChildren, SliderProps {}
const Slider = (allProps: CustomArrowProps) => {
  const { urls, name, onClick } = allProps;
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.productSlider[name] ?? 0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const bgColor = theme.useToken().token.colorBgContainer;

  useEffect(() => {
    setCurrentIndex(current);
  }, [current]);

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(currentIndex);
      dispatch(productSliderActions.setSlider({ name, index: currentIndex }));
    }
  }, [currentIndex]);

  return (
    <Swiper
      onSwiper={(swiper: SwiperClass) => setSwiper(swiper)}
      navigation={true}
      className={`swiper-${name}`}
      slidesPerView={1}
      spaceBetween={30}
      keyboard={{
        enabled: true,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Keyboard, Pagination, Navigation]}
      initialSlide={currentIndex}
      onRealIndexChange={(element) => setCurrentIndex(element.activeIndex)}
    >
      {urls.map((url, index) => {
        return (
          <SwiperSlide key={`slider-${index}`}>
            <div key={`slider-div-${index}`} className={`swiper-${name}-wrap`} style={{ backgroundColor: bgColor }}>
              <img key={`preview-img-${index}`} src={url} onClick={onClick} className={`swiper-${name}-img`} />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
