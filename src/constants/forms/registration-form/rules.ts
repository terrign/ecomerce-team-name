import { Rule } from 'antd/es/form';
import { DatePickerValue } from '../../../models/DatePickerValue';

const MIN_CUSTOMER_AGE = 13;

const VALID_PASSWORD_MATCHER = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //8 symbols min, 1 uppercase, 1 lowercase, 1 number

const isOldEnough = (date: DatePickerValue | null) =>
  date && new Date(date.$y + MIN_CUSTOMER_AGE, date.$M, date.$D) < new Date();

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
    message: 'Please confirm your password',
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(`Passwords don't match`));
    },
  }),
];

export {
  CONFIRM_PASSWORD_INPUT_RULES,
  PASSWORD_INPUT_RULES,
  BIRTH_DATE_INPUT_RULES,
  LAST_NAME_INPUT_RULES,
  FIRST_NAME_INPUT_RULES,
  EMAIL_INPUT_RULES,
  VALID_PASSWORD_MATCHER,
};
