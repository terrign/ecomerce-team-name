import { Form, Input, Modal } from 'antd';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { PASSWORD_INPUT_RULES, getConfirmPasswoordInputRules } from '../../../constants/forms/registration-form/rules';
import { PASSWORD_FORM_ITEM_LAYOUT } from '../../../constants/forms/antd-form-layouts';
import changePassword from '../../../helpers/ApiClient/customerUpdateRequests.ts/changePassword';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { alertSlice } from '../../../store/alert.slice';
import { loginRequest } from '../../../helpers/ApiClient/loginRequest';
import { authSlice } from '../../../store/auth.slice';
import { customerSlice } from '../../../store/customer.slice';
import tokenCache from '../../../helpers/ApiClient/tokenCache';
import { NEW_PASSWORD_INPUT_RULE } from '../../../constants/forms/new-password-rule';

const ChangePasswordModalForm = (props: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
  const [form] = useForm();
  const { open, setOpen } = props;
  const customer = useAppSelector((state) => state.customer.info);
  const remember = useAppSelector((state) => state.auth.remember);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const dispatch = useAppDispatch();
  const onFinish = async () => {
    setSubmitDisabled(() => true);
    const { currentPassword, newPassword } = form.getFieldsValue();
    try {
      await changePassword(currentPassword, newPassword, customer?.version);
      tokenCache.set({ token: null, refreshToken: null, expirationTime: null });
      const resp = await loginRequest(customer?.email, newPassword);
      dispatch(alertSlice.actions.success('Password successfully changed!'));
      dispatch(
        authSlice.actions.login({
          username: `${resp.body.customer.firstName} ${resp.body.customer.lastName}`,
          remember: remember,
        })
      );
      dispatch(customerSlice.actions.set(resp.body.customer));
      setOpen(() => false);
      form.resetFields();
      setSubmitDisabled(() => false);
    } catch (e) {
      dispatch(alertSlice.actions.error(e.message));
      setSubmitDisabled(() => false);
    }
  };
  const onCancel = () => {
    form.resetFields();
    setOpen(() => false);
  };
  const onOk = () => form.submit();
  return (
    <Modal
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      closeIcon={null}
      okText="Submit"
      okButtonProps={{ disabled: submitDisabled }}
    >
      <Form {...PASSWORD_FORM_ITEM_LAYOUT} form={form} name="changePasswordForm" autoComplete="off" onFinish={onFinish}>
        <Form.Item name="currentPassword" label="Current password" rules={PASSWORD_INPUT_RULES} hasFeedback>
          <Input.Password></Input.Password>
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New password"
          rules={[...PASSWORD_INPUT_RULES, NEW_PASSWORD_INPUT_RULE]}
          hasFeedback
          dependencies={['currentPassword']}
          validateFirst
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm new password"
          dependencies={['newPassword']}
          hasFeedback
          rules={getConfirmPasswoordInputRules('newPassword')}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModalForm;
