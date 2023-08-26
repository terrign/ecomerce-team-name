import React, { PropsWithChildren } from 'react';
import { Layout } from 'antd';
import Header from '../Header/Header';
const { Content } = Layout;

const ContentLayout = (props: PropsWithChildren) => {
  return (
    <Layout>
      <Header />
      <Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          padding: 24,
        }}
      >
        {props.children}
      </Content>
    </Layout>
  );
};

export default ContentLayout;
