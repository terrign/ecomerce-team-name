import { Form, Input, Modal, Select } from 'antd';
import React, { useContext } from 'react';
import AddressFormContext, { AddressFormMode } from '../../../context/AddressFormContext';
import { ADDRESS_TYPES } from '../../../constants/forms/address-form/address-types';
import { getNameRules, getTypeRules } from '../../../constants/forms/address-form/rules';
import { getRandomKey } from '../../../helpers/getRandomReactKey';
import getAddressModalFormStaticFields from '../../../helpers/forms/getAddressModalStaticFields';
import { FORM_ITEM_LAYOUT } from '../../../constants/forms/antd-form-layouts';
const { Option } = Select;

interface AddressModalFormProps {
  type: 'reg' | 'profile';
}

const RegistrationAddressModalForm = (props: AddressModalFormProps) => {
  const context = useContext(AddressFormContext);

  const onOk = () => {
    context.addressForm.submit();
  };

  const onSubmitRegistration = () => {
    if (context.addressFormMode === AddressFormMode.EDIT) {
      const index = context.addressItemIndex;
      context.addresses.edit(index, context.addressForm.getFieldsValue());
    } else {
      context.addresses.add(context.addressForm.getFieldsValue());
    }
    context.setModalOpen(false);
  };

  const onSubmitProfile = () => {
    if (context.addressFormMode === AddressFormMode.NEW || context.addressFormMode === AddressFormMode.COPY) {
      context.addresses.add();
    } else {
      context.addresses.editUserProfile(context.currentAddress);
    }
  };

  const onCancel = () => {
    context.setModalOpen(false);
    context.addressForm.resetFields();
  };

  return (
    <Modal open={context.modalOpen} onOk={onOk} onCancel={onCancel} closeIcon={null}>
      <Form
        {...FORM_ITEM_LAYOUT}
        style={{ padding: '10px 20px 0 0' }}
        form={context.addressForm}
        name="addressForm"
        autoComplete="off"
        onFinish={props.type === 'reg' ? onSubmitRegistration : onSubmitProfile}
      >
        <Form.Item
          label="Address name"
          name="key"
          tooltip="Unique address name"
          rules={props.type === 'reg' && getNameRules(context)}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Address type" name="types" rules={props.type === 'reg' && getTypeRules(context)}>
          <Select mode="multiple" placeholder="Select address type">
            {ADDRESS_TYPES.map((a) => (
              <Option value={a} key={getRandomKey(a)}>
                {a}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {getAddressModalFormStaticFields()}
      </Form>
    </Modal>
  );
};

export default RegistrationAddressModalForm;
