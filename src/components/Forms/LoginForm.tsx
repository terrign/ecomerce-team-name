import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { FORM_STYLE } from '../../constants/formStyle';
import { EMAIL_INPUT_RULES, PASSWORD_INPUT_RULES } from '../../constants/RegistrationFormConst';

const LoginForm: React.FC = () => {
  const onFinish = () => {};
  // const [form] = Form.useForm();

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{ ...FORM_STYLE, maxWidth: 300 }}
    >
      <Form.Item name="email" rules={EMAIL_INPUT_RULES}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={PASSWORD_INPUT_RULES} hasFeedback>
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="" style={{ float: 'right' }}>
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
