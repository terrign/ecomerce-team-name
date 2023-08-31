import { AddressFormValues } from '../../models/AddressFormValues';
import { RegistrationRequestBody, UserAddresses } from '../../models/apiDrafts';
import { AddressType } from '../../constants/forms/address-form/address-types';
import { DatePickerValue } from '../../models/DatePickerValue';
import { COUNTRIES } from '../../constants/forms/address-form/countries';

const reduceAddresses = (addresses: AddressFormValues[]): UserAddresses => {
  return addresses.reduce(
    (acc, a, i) => {
      const addresses = [...acc.addresses, { ...a, country: COUNTRIES.find((o) => o.Country === a.country).ISO }];
      const shippingAddresses = [...acc.shippingAddresses];
      if (a.types.includes(AddressType.SHIPPING)) {
        shippingAddresses.push(i);
      }
      const billingAddresses = [...acc.billingAddresses];
      if (a.types.includes(AddressType.BILLING)) {
        billingAddresses.push(i);
      }
      if (a.types.includes(AddressType.BILLING_DEFAULT)) {
        acc.defaultBillingAddress = i;
      }
      if (a.types.includes(AddressType.SHIPPING_DEFAULT)) {
        acc.defaultShippingAddress = i;
      }
      return {
        ...acc,
        addresses,
        shippingAddresses,
        billingAddresses,
      };
    },
    {
      addresses: [],
      shippingAddresses: [],
      billingAddresses: [],
      defaultShippingAddress: undefined,
      defaultBillingAddress: undefined,
    }
  );
};

export const reduceDate = (value?: DatePickerValue) =>
  value ? `${value.$y}-${(value.$M + 1).toString().padStart(2, '0')}-${value.$D.toString().padStart(2, '0')}` : null;

const registrationRequestAdapter: RegistrationRequestBody = (addresses, userData) => {
  return {
    ...reduceAddresses(addresses),
    email: userData.email,
    password: userData.password,
    lastName: userData.lastName,
    firstName: userData.firstName,
    dateOfBirth: reduceDate(userData.dateOfBirth as DatePickerValue),
  };
};

export default registrationRequestAdapter;
