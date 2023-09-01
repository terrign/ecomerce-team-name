import { AddressType } from '../constants/forms/address-form/address-types';

export interface AddressFormValues {
  key: string;
  types: AddressType[];
  country: string;
  city: string;
  streetName: string;
  building: string;
  apartment: string;
  postalCode: string;
}

export interface UserAddressesColumnDataType extends AddressFormValues {
  id: string;
  name: string;
}

export interface AddressModalFormProps {
  type: 'reg' | 'profile';
}
