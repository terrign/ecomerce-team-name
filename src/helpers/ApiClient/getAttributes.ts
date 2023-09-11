import getProductList from './getProductList';

const getProductAttributes = async (
  callbackFnBrand: (arg0: string[]) => void,
  callbackFnColor: (arg0: string[]) => void
) => {
  const resp = await getProductList({
    limit: 100,
    offset: 0,
    fuzzy: false,
    sort: [],
    'text.en': '',
    filter: [],
  });
  const results = resp.body.results;
  const attributes = results.map((val) => val.masterVariant.attributes);
  const brandsSet = new Set(attributes.map((val) => val[0].value));
  const sortedBrands = Array.from(brandsSet).sort();
  const colorsSet = new Set(
    attributes.map((val) => {
      if (val.length > 1) {
        return val[1].value;
      }
    })
  );
  const sortedColors = Array.from(colorsSet).sort();
  callbackFnBrand(sortedBrands);
  callbackFnColor(sortedColors);
};

export default getProductAttributes;
