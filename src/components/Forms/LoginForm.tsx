import React, { useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, Button, message } from 'antd';
import { FORM_STYLE } from '../../constants/formStyle';
import { EMAIL_INPUT_RULES, PASSWORD_INPUT_RULES } from '../../constants/RegistrationFormConst';
import { authApiRoot } from '../../helpers/ApiClient/ClientBuilderLogin';
import { PROJECT_KEY } from '../../constants/EnvConst';
import { useAppDispatch } from '../../store/hooks';
import { authSlice } from '../../store/auth.slice';

const LoginForm: React.FC = () => {
  const onFinish = () => {};
  // const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  // const logged: boolean = useAppSelector((state) => state.auth.token > '') ?? false;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userCheck, setUserCheck] = useState({ status: true, message: '' });
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Successfull login',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Incorrect email or password',
    });
  };

  const onChangeEmail = (event: SyntheticEvent) => {
    setEmail((event.target as HTMLInputElement).value);
  };

  const onChangePassword = (event: SyntheticEvent) => {
    setPassword((event.target as HTMLInputElement).value);
  };

  const login = async () => {
    setUserCheck({ status: true, message: '' });
    try {
      const resp = await authApiRoot(email, password)
        .withProjectKey({ projectKey: PROJECT_KEY })
        .me()
        .login()
        .post({ body: { email: email, password: password } })
        .execute();
      console.log(resp);
      success();
      setTimeout(() => {
        navigate('/');
      }, 1500);
      dispatch(authSlice.actions.login());
    } catch (err) {
      setUserCheck({ status: false, message: err.message });
      error();
      console.log(err.message);
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{ ...FORM_STYLE, maxWidth: 300 }}
      onSubmitCapture={login}
    >
      {contextHolder}
      <Form.Item name="email" rules={EMAIL_INPUT_RULES}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" onChange={onChangeEmail} />
      </Form.Item>
      <Form.Item name="password" rules={PASSWORD_INPUT_RULES} hasFeedback>
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          onChange={onChangePassword}
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

      <Form.Item validateStatus={`${userCheck ? 'warning' : 'error'}`}>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
