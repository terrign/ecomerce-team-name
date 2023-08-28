import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, Button, message } from 'antd';
import { loginRequest } from '../../helpers/ApiClient/loginRequest';
import { useAppDispatch } from '../../store/hooks';
import { authSlice } from '../../store/auth.slice';
import { FORM_STYLE } from '../../constants/forms/form-style';
import { EMAIL_INPUT_RULES, PASSWORD_INPUT_RULES } from '../../constants/forms/registration-form/rules';
import { RouterPath } from '../../models/RouterPath';
import { UserFormData } from '../../models/apiDrafts';
import { alertSlice } from '../../store/alert.slice';
import { customerSlice } from '../../store/customer.slice';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loginForm] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const error = (message: string) =>
    messageApi.open({
      type: 'error',
      content: message,
    });

  const login = async () => {
    setSubmitDisabled(true);
    const { email, password, remember }: UserFormData = loginForm.getFieldsValue();
    try {
      const resp = await loginRequest(email, password);
      dispatch(alertSlice.actions.success('Successfull login'));
      dispatch(
        authSlice.actions.login({
          username: `${resp.body.customer.firstName} ${resp.body.customer.lastName}`,
          remember,
        })
      );
      dispatch(customerSlice.actions.set(resp.body.customer));
      navigate(RouterPath.HOME);
    } catch (err) {
      error(err.message).then(() => setSubmitDisabled(false));
    }
  };

  return (
    <Form
      form={loginForm}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={login}
      style={{ ...FORM_STYLE, maxWidth: 300 }}
    >
      {contextHolder}
      <Form.Item name="email" rules={EMAIL_INPUT_RULES}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={PASSWORD_INPUT_RULES} hasFeedback validateFirst>
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
      </Form.Item>

      <Form.Item>
        <Button
          style={{ width: '100%' }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
          disabled={submitDisabled}
        >
          Log in
        </Button>
        Or <NavLink to={RouterPath.REG}>register now!</NavLink>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
