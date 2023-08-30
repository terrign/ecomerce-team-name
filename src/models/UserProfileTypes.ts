import { AddressType } from '../constants/forms/address-form/address-types';

export interface UserAddressesColumnDataType {
  key: React.Key;
  name: string;
  country: string;
  city: string;
  streetName: string;
  address: string;
  addressType: AddressType[];
  building: string;
  apartment: string;
  postalCode: string;
}
