import React, { useState } from 'react';
import { Button, Col, Form, Row, Switch } from 'antd';
import UserCard from './UserCard';
import ChangePasswordModalForm from './ChangePasswordModalForm';

const UserInfo = () => {
  const [formsEnabled, setFormsEnabled] = useState(false);
  const [passwordFormOpen, setPasswordFormOpen] = useState(false);
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
        <Col span={24}>
          <Button type="primary" onClick={() => setPasswordFormOpen(() => true)}>
            Change Password
          </Button>
        </Col>
      </Row>
      <ChangePasswordModalForm open={passwordFormOpen} setOpen={setPasswordFormOpen} />
    </div>
  );
};

export default UserInfo;
