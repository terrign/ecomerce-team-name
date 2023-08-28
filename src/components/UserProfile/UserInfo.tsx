import React from 'react';
import { Col, Row } from 'antd';
import UserCard from './UserCard';

const UserInfo = () => {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Row gutter={[16, 16]}>
        <Col lg={12} span={24}>
          <UserCard type="email"></UserCard>
        </Col>
        <Col lg={12} span={24}>
          <UserCard type="dateOfBirth"></UserCard>
        </Col>
        <Col lg={12} span={24}>
          <UserCard type="firstName"></UserCard>
        </Col>
        <Col lg={12} span={24}>
          <UserCard type="lastName"></UserCard>
        </Col>
      </Row>
    </div>
  );
};

export default UserInfo;
