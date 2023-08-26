import React, { PropsWithChildren } from 'react';
import { Layout } from 'antd';
import Header from '../Header/Header';
const { Content } = Layout;

const ContentLayout = (props: PropsWithChildren) => {
  return (
    <Layout>
      <Header />
      <Content className="site-layout-background">{props.children}</Content>
    </Layout>
  );
};

export default ContentLayout;
