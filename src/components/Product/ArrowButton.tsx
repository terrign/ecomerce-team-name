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
  if (type === 'left' && currentSlide < 1) color = 'gray';
  if (type === 'right' && currentSlide + 1 >= slideCount) color = 'gray';
  const arrowStyle = { fontSize: '30px', color: color };

  const arrow =
    type === 'left' ? <LeftCircleOutlined style={arrowStyle} /> : <RightCircleOutlined style={arrowStyle} />;

  return (
    <div {...props}>
      <Button {...props} icon={arrow} />
    </div>
  );
};

export default ArrowButton;
