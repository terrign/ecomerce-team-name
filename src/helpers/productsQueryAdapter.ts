import { CATALOG_ITEMS_PER_PAGE } from '../constants/general';
import { QueryAdapter } from '../models/Catalog';

const baseQueryArgs = {
  limit: CATALOG_ITEMS_PER_PAGE,
  fuzzy: true,
};

export const productsQueryAdapter: QueryAdapter = (page, { category, subCategory }, queryParams, categories) => {
  const categoryId = subCategory
    ? categories
        .find((a) => a.name.toLowerCase() === category)
        .children.find((a) => a.name.toLowerCase() === subCategory)?.id
    : categories.find((a) => a.name.toLowerCase() === category)?.id;
  const filter = categoryId ? [`categories.id: subtree("${categoryId}")`] : [];

  if (queryParams.color) filter.push(`variants.attributes.color:"${queryParams.color}"`);
  if (queryParams.brand) filter.push(`variants.attributes.brand:"${queryParams.brand}"`);

  if (queryParams.priceFrom && queryParams.priceTo)
    filter.push(
      `variants.price.centAmount:range (${Number(queryParams.priceFrom) * 100} to ${Number(queryParams.priceTo) * 100})`
    );

  const sort = [];
  if (queryParams.price) sort.push(`price ${queryParams.price}`);
  if (queryParams.name) sort.push(`name.en ${queryParams.name}`);

  return {
    ...baseQueryArgs,
    offset: CATALOG_ITEMS_PER_PAGE * (page - 1),
    filter: filter.length === 0 ? null : filter,
    'text.en': queryParams.text,
    sort,
  };
};
