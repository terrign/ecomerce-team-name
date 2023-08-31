import { Form, Input, Modal, Select } from 'antd';
import React, { useContext } from 'react';
import RegFormContext, { AddressFormMode } from '../../../context/RegistrationFormContext';
import { ADDRESS_TYPES } from '../../../constants/forms/address-form/address-types';
import { FORM_ITEM_LAYOUT } from '../../../constants/forms/antd-form-layouts';
import { getNameRules, getTypeRules } from '../../../constants/forms/address-form/rules';
import { getRandomKey } from '../../../helpers/getRandomReactKey';
import getAddressModalFormStaticFields from '../../../helpers/forms/getAddressModalStaticFields';
const { Option } = Select;

const RegistrationAddressModalForm = () => {
  const context = useContext(RegFormContext);

  const onOk = () => {
    context.addressForm.submit();
  };

  const onSubmit = () => {
    if (context.addressFormMode === AddressFormMode.EDIT) {
      const index = context.addressItemIndex;
      context.addresses.edit(index, context.addressForm.getFieldsValue());
    } else {
      context.addresses.add(context.addressForm.getFieldsValue());
    }
    context.setModalOpen(false);
  };

  const onCancel = () => {
    context.setModalOpen(false);
    context.addressForm.resetFields();
  };

  return (
    <Modal
      open={context.modalOpen}
      onOk={onOk}
      onCancel={() => {
        onCancel();
      }}
      closeIcon={null}
    >
      <Form
        {...FORM_ITEM_LAYOUT}
        style={{ padding: '10px 20px 0 0' }}
        form={context.addressForm}
        name="addressForm"
        autoComplete="off"
        onFinish={onSubmit}
      >
        <Form.Item label="Address name" name="key" tooltip="Unique address name" rules={getNameRules(context)}>
          <Input />
        </Form.Item>
        <Form.Item label="Address type" name="types" rules={getTypeRules(context)}>
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
