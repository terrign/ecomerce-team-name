import { Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import {
  CITY_INPUT_RULES,
  COUNTRY_INPUT_RULES,
  STREET_INPUT_RULES,
  ZIP_INPUT_RULES,
} from '../../constants/forms/address-form/rules';
import { COUNTRIES, CountryInfo } from '../../constants/forms/address-form/countries';
const { Option } = Select;

const getAddressModalFormStaticFields = () => {
  const [zipTooltip, setZipTootip] = useState('');
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
    <>
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
    </>
  );
};

export default getAddressModalFormStaticFields;
