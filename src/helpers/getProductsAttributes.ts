import { FacetResults, TermFacetResult } from '@commercetools/platform-sdk';

const getProductAttributes = (facets: FacetResults) => {
  const brandsResult = facets['variants.attributes.brand'] as TermFacetResult;
  const brands = brandsResult.terms.map((a) => a.term);
  const colorsResult = facets['variants.attributes.color'] as TermFacetResult;
  const colors = colorsResult.terms.map((a) => a.term);
  return { brands, colors };
};

export default getProductAttributes;
