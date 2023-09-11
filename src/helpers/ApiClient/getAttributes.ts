import getProductList from './getProductList';
import { findCategoryId } from '../productsQueryAdapter';
import { CategoryTreeItem } from '../../hooks/useCategoryTree';

const MAX_LIMIT_PRODUCTS_FOR_ATTRIBUTES = 100;

const getProductAttributes = async (
  callbackFnBrand: (arg0: string[]) => void,
  callbackFnColor: (arg0: string[]) => void,
  categories: CategoryTreeItem[],
  category?: string,
  subCategory?: string
) => {
  const resp = await getProductList({
    limit: MAX_LIMIT_PRODUCTS_FOR_ATTRIBUTES,
    offset: 0,
    fuzzy: false,
    sort: [],
    'text.en': '',
    filter: findCategoryId(category, subCategory, categories),
  });
  const results = resp.body.results;
  const attributes = results.map((val) => val.masterVariant.attributes);
  const brandsSet = new Set(attributes.map((val) => val[0].value));
  const sortedBrands = Array.from(brandsSet).sort();
  const colorsSet = new Set(
    attributes
      .map((val) => {
        if (val.length > 1) {
          return val[1].value;
        }
      })
      .filter((val) => val)
  );
  const sortedColors = Array.from(colorsSet).sort();
  callbackFnBrand(sortedBrands);
  callbackFnColor(sortedColors);
};

export default getProductAttributes;
