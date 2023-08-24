import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, message } from 'antd';
import {
  BIRTH_DATE_INPUT_RULES,
  CONFIRM_PASSWORD_INPUT_RULES,
  EMAIL_INPUT_RULES,
  FIRST_NAME_INPUT_RULES,
  LAST_NAME_INPUT_RULES,
  PASSWORD_INPUT_RULES,
} from '../../constants/forms/registration-form/rules';
import { FORM_STYLE } from '../../constants/forms/form-style';
import FormAddressControlledList from './address/AddressFormControlledList';
import RegistrationFormContext, { AddressFormMode, RegFormContext } from '../../context/RegistrationFormContext';
import { AddressFormValues } from '../../models/AddressFormValues';
import AddressModalForm from './address/AddressModalForm';
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../constants/forms/antd-form-layouts';
import { PlusOutlined } from '@ant-design/icons';
import registrationRequestAdapter from '../../helpers/registrationRequestAdapter';
import { UserFormData } from '../../models/apiDrafts';
import { NavLink, useNavigate } from 'react-router-dom';
import { RouterPath } from '../../models/RouterPath';
import { useAppDispatch } from '../../store/hooks';
import { authSlice } from '../../store/auth.slice';
import { loginRequest } from '../../helpers/ApiClient/loginRequest';
import getApiClient from '../../helpers/ApiClient/Client';
import { alertSlice } from '../../store/alert.slice';

const RegistrationForm = () => {
  const [registrationForm] = Form.useForm();
  const [addressForm] = Form.useForm();
  const [addresses, setAddresses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [addressItemIndex, setAddressItemIndex] = useState(undefined);
  const [addressFormMode, setAddressFormMode] = useState(AddressFormMode.NEW);
  const [messageApi, contextHolder] = message.useMessage();
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addressesContext: RegFormContext['addresses'] = {
    items: addresses,
    remove: (i: number) => {
      setAddresses((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)]);
    },
    add: (address) => {
      setAddresses((prev) => [...prev, address]);
    },
    edit: (i: number, values: AddressFormValues) => {
      setAddresses((prev) => prev.map((address, index) => (index === i ? values : address)));
    },
  };

  const onAddAddress = () => {
    setModalOpen(true);
    addressForm.resetFields();
  };
  const onFinish = async () => {
    setSubmitDisabled(true);
    const { email, lastName, firstName, password, dateOfBirth }: UserFormData = registrationForm.getFieldsValue();
    const userData = { email, lastName, firstName, password, dateOfBirth };
    const body = registrationRequestAdapter(addresses, userData);
    try {
      await getApiClient().me().signup().post({ body: body }).execute();
      await loginRequest(email, password);
      dispatch(alertSlice.actions.success('User created'));
      dispatch(authSlice.actions.login({ username: `${firstName} ${lastName}`, remember: false }));
      navigate(RouterPath.HOME);
    } catch (e) {
      messageApi
        .open({
          content: e.message,
          type: 'error',
        })
        .then(() => setSubmitDisabled(false));
    }
  };
  return (
    <RegistrationFormContext.Provider
      value={{
        addresses: addressesContext,
        modalOpen,
        setModalOpen,
        addressForm,
        addressFormMode,
        setAddressFormMode,
        addressItemIndex,
        setAddressItemIndex,
      }}
    >
      {contextHolder}
      <Form
        {...FORM_ITEM_LAYOUT}
        form={registrationForm}
        name="registrationForm"
        onFinish={onFinish}
        style={FORM_STYLE}
        scrollToFirstError
      >
        <Form.Item name="email" label="E-mail" rules={EMAIL_INPUT_RULES}>
          <Input />
        </Form.Item>

        <Form.Item name="firstName" label="First Name" rules={FIRST_NAME_INPUT_RULES}>
          <Input />
        </Form.Item>

        <Form.Item name="lastName" label="Last Name" rules={LAST_NAME_INPUT_RULES}>
          <Input />
        </Form.Item>

        <Form.Item name="dateOfBirth" label="Birth Date" rules={BIRTH_DATE_INPUT_RULES} validateFirst>
          <DatePicker />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={PASSWORD_INPUT_RULES} hasFeedback validateFirst>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={CONFIRM_PASSWORD_INPUT_RULES}
        >
          <Input.Password />
        </Form.Item>
        <FormAddressControlledList />
        <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
          <Button type="dashed" block icon={<PlusOutlined />} onClick={onAddAddress}>
            Add Address
          </Button>
        </Form.Item>

        <AddressModalForm></AddressModalForm>
        <Form.Item {...TAIL_FORM_ITEM_LAYOUT} rules={[]}>
          <Button type="primary" htmlType="submit" disabled={submitDisabled}>
            Register
          </Button>
          <div style={{ display: 'inline-block', marginLeft: 5, placeSelf: 'end' }}>
            Or <NavLink to={RouterPath.LOGIN}>login now!</NavLink>
          </div>
        </Form.Item>
      </Form>
    </RegistrationFormContext.Provider>
  );
};
export default RegistrationForm;
