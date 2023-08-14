import { Rule } from 'antd/es/form';
import { DatePickerValue } from '../models/DatePickerValue';
import { COUNTRIES } from './Countries';

const MIN_CUSTOMER_AGE = 13;

const VALID_PASSWORD_MATCHER = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //8 symbols min, 1 uppercase, 1 lowercase, 1 number
const VALID_CITY_MATCHER = /^[a-zA-ZА-Яа-я]{1,}$/;
const isOldEnough = (date: DatePickerValue | null) =>
  date && new Date(date.$y + MIN_CUSTOMER_AGE, date.$M, date.$D) < new Date();

const FORM_ITEM_LAYOUT = {
  labelCol: {
    sm: { span: 8 },
    xs: { span: 24 },
  },
  wrapperCol: {
    sm: { span: 16 },
    xs: { span: 24 },
  },
};

const TAIL_FORM_ITEM_LAYOUT = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const FORM_DIVIDER_ITEM_LAYOUT = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const EMAIL_INPUT_RULES: Rule[] = [
  {
    type: 'email',
    message: 'Please enter valid E-mail',
  },
  {
    required: true,
    message: 'Please enter your E-mail!',
  },
];

const FIRST_NAME_INPUT_RULES: Rule[] = [{ required: true, message: 'Please enter your First Name' }];

const LAST_NAME_INPUT_RULES: Rule[] = [{ required: true, message: 'Please enter your Last Name' }];

const BIRTH_DATE_INPUT_RULES: Rule[] = [
  {
    required: true,
    message: 'Please enter your Birth Date',
  },
  () => ({
    validator(_, value) {
      if (isOldEnough(value)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('You must be atleast 13 years old'));
    },
  }),
];

const PASSWORD_INPUT_RULES: Rule[] = [
  {
    required: true,
    message: 'Please enter your password',
  },
  {
    pattern: VALID_PASSWORD_MATCHER,
    message:
      'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  },
];

const CONFIRM_PASSWORD_INPUT_RULES: Rule[] = [
  {
    required: true,
    message: 'Please confirm your password!',
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The new password that you entered do not match!'));
    },
  }),
];

const COUNTRY_INPUT_RULES: Rule[] = [
  {
    required: true,
    message: 'Please select your country!',
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
export {
  FORM_DIVIDER_ITEM_LAYOUT,
  ZIP_INPUT_RULES,
  STREET_INPUT_RULES,
  CITY_INPUT_RULES,
  COUNTRY_INPUT_RULES,
  CONFIRM_PASSWORD_INPUT_RULES,
  PASSWORD_INPUT_RULES,
  BIRTH_DATE_INPUT_RULES,
  LAST_NAME_INPUT_RULES,
  FIRST_NAME_INPUT_RULES,
  EMAIL_INPUT_RULES,
  VALID_PASSWORD_MATCHER,
  TAIL_FORM_ITEM_LAYOUT,
  FORM_ITEM_LAYOUT,
};
