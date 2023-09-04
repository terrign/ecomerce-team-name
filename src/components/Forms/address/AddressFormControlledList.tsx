import React, { useContext } from 'react';
import AddressControlledFormItem from './AddressControlledFormItem';
import { getRandomKey } from '../../../helpers/getRandomReactKey';

import RegFormContext from '../../../context/AddressFormContext';

const FormAddressControlledList = () => {
  const context = useContext(RegFormContext);
  return (
    <>
      {context.addresses.items.map((address, i) => {
        return (
          <AddressControlledFormItem {...address} index={i} key={getRandomKey(address.key)}></AddressControlledFormItem>
        );
      })}
    </>
  );
};

export default FormAddressControlledList;
