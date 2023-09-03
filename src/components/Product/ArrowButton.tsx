import React from 'react';
import { PropsWithChildren } from 'react';
import { Button } from 'antd';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';

export interface ArrowProps {
  type: 'left' | 'right';
  currentSlide?: number;
  slideCount?: number;
}
export interface CustomArrowProps extends PropsWithChildren, ArrowProps {}
const ArrowButton = (allProps: CustomArrowProps) => {
  const { type, currentSlide, slideCount, ...props } = allProps;
  let color = 'black';
  if (type === 'left' && currentSlide < 1) color = 'lightgray';
  if (type === 'right' && currentSlide + 1 >= slideCount) color = 'lightgray';
  const arrowStyle1 = { fontSize: '30px', color: color, marginLeft: '26px' };
  const arrowStyle2 = { fontSize: '30px', color: color, marginLeft: '-50px' };

  const arrow =
    type === 'left' ? <LeftCircleOutlined style={arrowStyle1} /> : <RightCircleOutlined style={arrowStyle2} />;

  return (
    <div {...props} style={{ position: 'absolute', zIndex: 100 }}>
      <Button {...props} icon={arrow} />
    </div>
  );
};

export default ArrowButton;
