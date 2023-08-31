import { Rule } from 'antd/es/form';
import { AddressType } from '../../constants/forms/address-form/address-types';
import { AddressFormMode, RegFormContext } from '../../context/RegistrationFormContext';

const getAddressTypeRule = (context: RegFormContext, checkType: AddressType): Rule => {
  return () => ({
    validator(_, value: AddressType[]) {
      if (!value) return Promise.resolve();
      if (value.includes(checkType)) {
        const error = new Error(`You can set only 1 ${checkType} address`);
        if (context.addressFormMode === AddressFormMode.EDIT) {
          const addressDefaultTypesExcludingCurrent = context.addresses.items.reduce(
            (acc, a, i) => (i === context.addressItemIndex ? acc : [...acc, ...a.types]),
            []
          );
          if (addressDefaultTypesExcludingCurrent.includes(checkType)) {
            return Promise.reject(error);
          }
        } else {
          const addressTypes = context.addresses.items.reduce((acc, a) => [...acc, ...a.types], []);
          if (addressTypes.includes(checkType)) {
            return Promise.reject(error);
          }
        }
      }
      return Promise.resolve();
    },
  });
};

export default getAddressTypeRule;
