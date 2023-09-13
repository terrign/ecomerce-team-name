import getApiClient from '../getApiClient';

export interface ProductImage {
  label: string;
  url: string;
  loaded: boolean;
}

export interface ProductAttributeValue {
  key: string;
  label: string;
}

export interface ProductAttribute {
  name: string;
  key: string;
  label: string;
}

export interface ProductDetails {
  id: string;
  key: string;
  name: string;
  description: string;
  discount: boolean;
  error: string;
  variants: ProductImage[];
  attributes: ProductAttribute[];
}
const nameFormat = (name: string) => {
  let formatted = '';
  for (const letter of name) {
    const upper = letter.toLocaleUpperCase() === letter && letter.toLocaleUpperCase() !== letter.toLocaleLowerCase();
    formatted += upper ? ` ${letter}` : letter;
  }
  formatted = formatted.trim();
  if (formatted[0]) formatted = formatted[0].toLocaleUpperCase() + formatted.substring(1);
  return formatted;
};

const emptyAttr = {
  name: '',
  key: '',
  label: '',
};

const emptyDetail: ProductDetails = {
  id: '',
  key: '',
  name: '',
  description: '',
  discount: false,
  variants: [],
  attributes: [],
  error: 'error',
};

async function getProduct(key: string): Promise<ProductDetails> {
  return await getApiClient()
    .products()
    .withKey({ ['key']: key })
    .get()
    .execute()
    .then((res) => {
      const id = res.body.id;
      const staged = res.body.masterData.staged;
      const name = staged.name.en ?? '';
      const description = staged.description ? staged.description.en ?? '' : '';
      const variants = staged.masterVariant.images.map(({ url, label }) => {
        return { url, label: label ?? '', loaded: false };
      });
      const price = staged.masterVariant.prices[0];
      const productPrice = price?.value ?? 0;
      const productPriceAttribute = productPrice
        ? {
            key: 'product-price',
            name: 'Product Price',
            label: `${productPrice.centAmount / 100} ${productPrice.currencyCode}`,
          }
        : emptyAttr;
      const salePrice = price?.discounted?.value ?? 0;
      const discount = salePrice !== 0;
      const salePriceAttribute = salePrice
        ? {
            key: 'sale-price',
            name: 'Sale Price',
            label: salePrice ? `${salePrice.centAmount / 100} ${salePrice.currencyCode}` : productPriceAttribute.label,
          }
        : emptyAttr;
      const attributes = [
        productPriceAttribute,
        salePriceAttribute,
        ...staged.masterVariant.attributes.map(({ name, value }) => {
          const { key, label } = value;
          const composite = label ?? value;
          const composite2 = composite.en ?? composite;
          const result = { name: nameFormat(name) ?? '', key: key ?? '', label: composite2 };
          return result;
        }),
      ].filter(({ name = '' }) => name);

      return { id, key, name, description, discount, variants, attributes, error: '' };
    })
    .catch(() => {
      return emptyDetail;
    });
}
export default getProduct;
