import React from 'react';
type ProductProps = { id?: string };

const Product = ({ id }: ProductProps) => {
  return <div>Product #{id}</div>;
};

export default Product;
