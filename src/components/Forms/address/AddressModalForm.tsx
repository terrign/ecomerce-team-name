import { Form, Input, Modal, Select } from 'antd';
import { COUNTRIES, CountryInfo } from '../../../constants/forms/address-form/countries';
import React, { useContext } from 'react';
import { useState } from 'react';
import RegFormContext, { AddressFormMode } from '../../../context/RegistrationFormContext';
import { ADDRESS_TYPES } from '../../../constants/forms/address-form/address-types';
import { FORM_ITEM_LAYOUT } from '../../../constants/forms/antd-form-layouts';
import {
  CITY_INPUT_RULES,
  COUNTRY_INPUT_RULES,
  STREET_INPUT_RULES,
  ZIP_INPUT_RULES,
  getNameRules,
  getTypeRules,
} from '../../../constants/forms/address-form/rules';
import { getRandomKey } from '../../../helpers/getRandomReactKey';
const { Option } = Select;

const AddressModalForm = () => {
  const [zipTooltip, setZipTootip] = useState('');
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

  const zipToolTipUpdatedOnCountryChange = (value: string) => {
    const countryObject: CountryInfo = COUNTRIES.find((a) => a.Country === value);
    let toolTipString = '';
    if (countryObject.Format) {
      toolTipString += `Format: ${countryObject.Format}`;
    }
    if (toolTipString.length === 0) {
      toolTipString = 'No information on ZIP codes of the selected country';
    }
    setZipTootip(toolTipString);
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
        <Form.Item name="country" label="Country" rules={COUNTRY_INPUT_RULES}>
          <Select showSearch onChange={zipToolTipUpdatedOnCountryChange}>
            {COUNTRIES.map((a) => (
              <Option value={a.Country} key={a.ISO}>
                {a.Country}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="city" label="City" rules={CITY_INPUT_RULES}>
          <Input />
        </Form.Item>

        <Form.Item name="streetName" label="Street" rules={STREET_INPUT_RULES}>
          <Input />
        </Form.Item>

        <Form.Item name="building" label="Building">
          <Input />
        </Form.Item>

        <Form.Item name="apartment" label="Apartment/Suite">
          <Input />
        </Form.Item>

        <Form.Item
          name="postalCode"
          label="Postal code"
          rules={ZIP_INPUT_RULES}
          dependencies={['country']}
          tooltip={zipTooltip}
          validateFirst
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddressModalForm;
