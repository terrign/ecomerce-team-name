import { Rule } from 'antd/es/form';
import { COUNTRIES } from './countries';
import { AddressFormMode, RegFormContext } from '../../../context/RegistrationFormContext';
import { AddressType } from './address-types';
import getAddressTypeRule from '../../../helpers/getAddressTypeRule';
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
      if (value.match(COUNTRIES.find((a) => a.Country === countryInputValue).Regex)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(`Entered zip does not match format of the selected country`));
    },
  }),
];
const getNameRules = (context: RegFormContext): Rule[] => {
  return [
    () => ({
      validator(_, value) {
        if (value === '') {
          return Promise.resolve();
        }
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
  ];
};

const getTypeRules = (context: RegFormContext): Rule[] => {
  return [
    getAddressTypeRule(context, AddressType.BILLING_DEFAULT),
    getAddressTypeRule(context, AddressType.SHIPPING_DEFAULT),
  ];
};

const ADDRESS_TYPE_STRING =
  'You can choose address types now or later, but only 1 Default Shipping and 1 Default Billing addresses can be set';

export {
  ZIP_INPUT_RULES,
  STREET_INPUT_RULES,
  CITY_INPUT_RULES,
  COUNTRY_INPUT_RULES,
  ADDRESS_TYPE_STRING,
  getNameRules,
  getTypeRules,
};
