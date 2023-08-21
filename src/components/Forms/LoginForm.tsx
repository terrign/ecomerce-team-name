import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, Button, message } from 'antd';
import { loginRequest } from '../../helpers/ApiClient/ClientBuilderLogin';
import { useAppDispatch } from '../../store/hooks';
import { authSlice } from '../../store/auth.slice';
import { FORM_STYLE } from '../../constants/forms/form-style';
import { EMAIL_INPUT_RULES, PASSWORD_INPUT_RULES } from '../../constants/forms/registration-form/rules';
import { MESSAGE_DURATION } from '../../constants/general';
import { RouterPath } from '../../models/RouterPath';
import { UserFormData } from '../../models/apiDrafts';
import myTokenCache from '../../helpers/ApiClient/TokenStore';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loginForm] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const success = () =>
    messageApi.open({
      duration: MESSAGE_DURATION,
      type: 'success',
      content: 'Successfull login',
    });

  const error = (message: string) =>
    messageApi.open({
      duration: MESSAGE_DURATION,
      type: 'error',
      content: message,
    });

  const login = async () => {
    const { email, password, remember }: UserFormData = loginForm.getFieldsValue();
    try {
      const resp = await loginRequest(email, password);
      // success().then(() => navigate(RouterPath.HOME));
      await success();
      dispatch(
        authSlice.actions.login({
          token: myTokenCache.get().token,
          username: `${resp.body.customer.firstName} ${resp.body.customer.lastName}`,
          remember,
        })
      );
      navigate(RouterPath.HOME);
    } catch (err) {
      error(err.message);
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
