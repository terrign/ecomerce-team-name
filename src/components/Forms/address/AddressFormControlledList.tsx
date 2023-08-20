import React, { useContext } from 'react';
import AddressControlledFormItem from './AddressControlledFormItem';
import { getRandomKey } from '../../../helpers/getRandomReactKey';

import RegFormContext from '../../../context/RegistrationFormContext';

const FormAddressControlledList = () => {
  const context = useContext(RegFormContext);
  return (
    <>
      {context.addresses.items.map((address, i) => {
        return (
          <AddressControlledFormItem
            {...address}
            index={i}
            key={getRandomKey(address.name)}
          ></AddressControlledFormItem>
        );
      })}
    </>
  );
};

export default FormAddressControlledList;
