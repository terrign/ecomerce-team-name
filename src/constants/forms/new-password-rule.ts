import { Rule } from 'antd/es/form';

export const NEW_PASSWORD_INPUT_RULE: Rule = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue('currentPassword') === value) {
      return Promise.reject(new Error(`New password is the same as current`));
    }
    return Promise.resolve();
  },
});
