export enum AddressType {
  BILLING = 'Billing Address',
  SHIPPING = 'Shipping Address',
  BILLING_DEFAULT = 'Default Billing Address',
  SHIPPING_DEFAULT = 'Default Shipping Address',
}

export const ADDRESS_TYPES = [
  AddressType.BILLING,
  AddressType.SHIPPING,
  AddressType.BILLING_DEFAULT,
  AddressType.SHIPPING_DEFAULT,
];
