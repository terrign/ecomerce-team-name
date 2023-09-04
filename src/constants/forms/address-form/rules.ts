import { Rule } from 'antd/es/form';
import { COUNTRIES } from './countries';
import { AddressFormMode, AddressFormContextType } from '../../../context/AddressFormContext';
import { AddressType } from './address-types';
import getAddressTypeRule from '../../../helpers/forms/getAddressTypeRule';
import { VALID_NAME_MATHCER } from '../registration-form/rules';

const VALID_CITY_MATCHER = VALID_NAME_MATHCER;

const COUNTRY_INPUT_RULES: Rule[] = [
  {
    required: true,
    message: 'Please select your country',
  },
];

const CITY_INPUT_RULES: Rule[] = [
  {
    required: true,
    message: 'Please enter your city',
  },
  {
    pattern: VALID_CITY_MATCHER,
    message: 'City must contain atleast 1 letter, must not contain numbers and special characters',
  },
];

const STREET_INPUT_RULES: Rule[] = [
  {
    required: true,
    message: 'Please enter your street',
  },
];

const ZIP_INPUT_RULES: Rule[] = [
  {
    required: true,
    message: 'Please enter your postal code',
  },
  ({ getFieldValue }) => ({
    validator(_, value: string) {
      const countryInputValue = getFieldValue('country');
      if (!countryInputValue) {
        return Promise.resolve();
      }
      if (value.match(COUNTRIES.find((a) => a.ISO === countryInputValue).Regex)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(`Entered zip does not match format of the selected country`));
    },
  }),
];
const getNameRules = (context: AddressFormContextType): Rule[] => {
  return [
    () => ({
      validator(_, value) {
        if (context.addressFormMode === AddressFormMode.EDIT) {
          const addressNamesExcludingCurrent = context.addresses.items.reduce(
            (acc, a, i) => (i === context.addressItemIndex ? acc : [...acc, a.key]),
            []
          );
          return addressNamesExcludingCurrent.includes(value)
            ? Promise.reject(new Error('Address name must be unique'))
            : Promise.resolve();
        }
        const addressNames = context.addresses.items.reduce((acc, a) => [...acc, a.key], []);
        if (!addressNames.includes(value)) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Address name must be unique'));
      },
    }),
    {
      required: true,
      message: 'Please enter address name',
    },
  ];
};

const getTypeRules = (context: AddressFormContextType): Rule[] => {
  return [
    getAddressTypeRule(context, AddressType.BILLING_DEFAULT),
    getAddressTypeRule(context, AddressType.SHIPPING_DEFAULT),
    {
      required: true,
      message: 'Please select address type',
    },
  ];
};

export { ZIP_INPUT_RULES, STREET_INPUT_RULES, CITY_INPUT_RULES, COUNTRY_INPUT_RULES, getNameRules, getTypeRules };
