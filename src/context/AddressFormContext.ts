import { createContext } from 'react';
import { AddressFormValues, UserAddressesColumnDataType } from '../models/AddressFormTypes';
import { FormInstance } from 'antd';

export enum AddressFormMode {
  EDIT = 'edit',
  NEW = 'new',
  COPY = 'copy',
}
export interface AddressFormContextType {
  addresses: {
    items: AddressFormValues[];
    remove: (i: number) => void | null;
    add: (address?: AddressFormValues) => void | null | Promise<void>;
    edit: (i: number, values: AddressFormValues) => void | null;
    editUserProfile?: (currentAddress: UserAddressesColumnDataType) => Promise<void>;
  };
  modalOpen: boolean;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  addressForm: FormInstance | null;
  addressFormMode: AddressFormMode;
  setAddressFormMode?: React.Dispatch<React.SetStateAction<AddressFormMode>>;
  addressItemIndex?: number;
  setAddressItemIndex?: React.Dispatch<React.SetStateAction<number>>;
  currentAddress?: UserAddressesColumnDataType;
  setCurrentAddress?: React.Dispatch<React.SetStateAction<UserAddressesColumnDataType>>;
}

const AddressFormContext = createContext<AddressFormContextType>({
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

export default AddressFormContext;
