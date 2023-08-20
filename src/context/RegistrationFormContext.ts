import { createContext } from 'react';
import { AddressFormValues } from '../models/AddressFormValues';
import { FormInstance } from 'antd';

export enum AddressFormMode {
  EDIT = 'edit',
  NEW = 'new',
  COPY = 'copy',
}
export interface RegFormContext {
  addresses: {
    items: AddressFormValues[];
    remove: (i: number) => void | null;
    add: (address: AddressFormValues) => void | null;
    edit: (i: number, values: AddressFormValues) => void | null;
  };
  modalOpen: boolean;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  addressForm: FormInstance | null;
  addressFormMode: AddressFormMode;
  setAddressFormMode?: React.Dispatch<React.SetStateAction<AddressFormMode>>;
  addressItemIndex?: number;
  setAddressItemIndex?: React.Dispatch<React.SetStateAction<number>>;
}

const RegistrationFormContext = createContext<RegFormContext>({
  addresses: {
    items: [],
    remove: null,
    add: null,
    edit: null,
  },
  modalOpen: false,
  addressForm: null,
  addressFormMode: AddressFormMode.NEW,
});

export default RegistrationFormContext;
