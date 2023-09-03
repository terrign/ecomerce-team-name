import { CountryInfo } from '../constants/forms/address-form/countries';
import { AddressFormValues } from './AddressFormTypes';
import { DatePickerValue } from './DatePickerValue';

export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  remember?: boolean;
}
export interface UserFormData extends UserData {
  dateOfBirth: DatePickerValue;
}

export interface UserDraftData extends UserData {
  dateOfBirth: string;
}

export interface BaseAddress {
  key: string;
  country: CountryInfo['ISO'];
  city: string;
  streetName: string;
  building: string;
  apartment: string;
  postalCode: string;
}

export interface UserAddresses {
  addresses: BaseAddress[];
  shippingAddresses: number[];
  billingAddresses: number[];
  defaultShippingAddress: number;
  defaultBillingAddress: number;
}

export type CustomerDraft = UserDraftData & UserAddresses;

export interface RegistrationRequestBody {
  (addresses: AddressFormValues[], userData: UserFormData): CustomerDraft;
}
