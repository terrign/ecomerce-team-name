import React, { useState } from 'react';
import { AutoComplete, Button, Form, Input, DatePicker, Select, Divider } from 'antd';
import {
  BIRTH_DATE_INPUT_RULES,
  CITY_INPUT_RULES,
  CONFIRM_PASSWORD_INPUT_RULES,
  COUNTRY_INPUT_RULES,
  EMAIL_INPUT_RULES,
  FIRST_NAME_INPUT_RULES,
  FORM_DIVIDER_ITEM_LAYOUT,
  FORM_ITEM_LAYOUT,
  LAST_NAME_INPUT_RULES,
  PASSWORD_INPUT_RULES,
  STREET_INPUT_RULES,
  TAIL_FORM_ITEM_LAYOUT,
  ZIP_INPUT_RULES,
} from '../../constants/RegistrationFormConst';
import { COUNTRIES, CountryInfo } from '../../constants/Countries';
import { FORM_STYLE } from '../../constants/formStyle';
const { Option } = Select;

const RegistrationFormNew: React.FC = () => {
  const [form] = Form.useForm();
  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);
  const [zipTooltip, setZipTootip] = useState('');
  const emailOptions = autoCompleteResult.map((email) => ({
    label: email,
    value: email,
  }));

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

  const onFinish = () => {};
  const onEmailchange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net', '.ru', '.by'].map((email) => `${value}${email}`));
    }
  };

  return (
    <Form {...FORM_ITEM_LAYOUT} form={form} name="register" onFinish={onFinish} style={FORM_STYLE} scrollToFirstError>
      <Form.Item name="email" label="E-mail" rules={EMAIL_INPUT_RULES}>
        <AutoComplete options={emailOptions} onChange={onEmailchange} placeholder="email">
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item name="firstName" label="First Name" rules={FIRST_NAME_INPUT_RULES}>
        <Input />
      </Form.Item>

      <Form.Item name="lastName" label="Last Name" rules={LAST_NAME_INPUT_RULES}>
        <Input />
      </Form.Item>

      <Form.Item name="birthDate" label="Birth Date" rules={BIRTH_DATE_INPUT_RULES} validateFirst>
        <DatePicker />
      </Form.Item>

      <Form.Item name="password" label="Password" rules={PASSWORD_INPUT_RULES} hasFeedback>
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
      <Form.Item {...FORM_DIVIDER_ITEM_LAYOUT} tooltip="TOLLTEXT">
        <Divider>Billing address</Divider>
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

      <Form.Item name="street" label="Street" rules={STREET_INPUT_RULES}>
        <Input />
      </Form.Item>

      <Form.Item
        name="zip"
        label="Postal Code"
        rules={ZIP_INPUT_RULES}
        dependencies={['country']}
        tooltip={zipTooltip}
        validateFirst
      >
        <Input />
      </Form.Item>

      <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RegistrationFormNew;
