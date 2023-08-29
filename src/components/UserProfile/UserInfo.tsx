import React, { useState } from 'react';
import { Col, Form, Row, Switch } from 'antd';
import UserCard from './UserCard';

const UserInfo = () => {
  const [formsEnabled, setFormsEnabled] = useState(false);
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Form.Item label="Edit:" colon={false} style={{ margin: '10px' }}>
        <Switch checked={formsEnabled} onChange={(value) => setFormsEnabled(value)}></Switch>
      </Form.Item>

      <Row gutter={[16, 16]}>
        <Col lg={12} span={24}>
          <UserCard type="email" formEnabled={formsEnabled}></UserCard>
        </Col>
        <Col lg={12} span={24}>
          <UserCard type="dateOfBirth" formEnabled={formsEnabled}></UserCard>
        </Col>
        <Col lg={12} span={24}>
          <UserCard type="firstName" formEnabled={formsEnabled}></UserCard>
        </Col>
        <Col lg={12} span={24}>
          <UserCard type="lastName" formEnabled={formsEnabled}></UserCard>
        </Col>
      </Row>
    </div>
  );
};

export default UserInfo;
