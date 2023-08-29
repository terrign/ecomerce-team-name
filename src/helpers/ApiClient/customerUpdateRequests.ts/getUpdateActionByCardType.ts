import { UserInfoCardType } from '../../../models/UserInfoCardType';
import changeEmail from './changeEmail';
import setDateOfBirth from './setDateOfBirth';
import setFirstName from './setFirstName';
import setLastName from './setLastName';

function getUpdateActionByCardType(type: UserInfoCardType) {
  switch (type) {
    case 'email':
      return changeEmail;
    case 'dateOfBirth':
      return setDateOfBirth;
    case 'firstName':
      return setFirstName;
    case 'lastName':
      return setLastName;
  }
}

export default getUpdateActionByCardType;
