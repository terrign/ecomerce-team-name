import { AddressType } from '../constants/forms/address-form/address-types';

export interface AddressFormValues {
  key: string;
  types: AddressType[];
  country: string;
  city: string;
  streetName: string;
  building: string;
  apartment: string;
  zip: string;
}
