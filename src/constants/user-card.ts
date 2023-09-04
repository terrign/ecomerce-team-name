import changeEmail from '../helpers/ApiClient/customerUpdateRequests.ts/changeEmail';
import setDateOfBirth from '../helpers/ApiClient/customerUpdateRequests.ts/setDateOfBirth';
import setFirstName from '../helpers/ApiClient/customerUpdateRequests.ts/setFirstName';
import setLastName from '../helpers/ApiClient/customerUpdateRequests.ts/setLastName';
import {
  BIRTH_DATE_INPUT_RULES,
  EMAIL_INPUT_RULES,
  FIRST_NAME_INPUT_RULES,
  LAST_NAME_INPUT_RULES,
} from './forms/registration-form/rules';

export const USER_CARD_TYPE_MAP = {
  email: { title: 'E-mail', rules: EMAIL_INPUT_RULES, action: changeEmail },
  dateOfBirth: { title: 'Birth date', rules: BIRTH_DATE_INPUT_RULES, action: setDateOfBirth },
  firstName: { title: 'First name', rules: FIRST_NAME_INPUT_RULES, action: setFirstName },
  lastName: { title: 'Last name', rules: LAST_NAME_INPUT_RULES, action: setLastName },
};
