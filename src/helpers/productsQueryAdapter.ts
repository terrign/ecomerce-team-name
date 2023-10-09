import { CATALOG_ITEMS_PER_PAGE } from '../constants/general';
import { QueryAdapter } from '../models/Catalog';
import { CategoryTreeItem } from '../hooks/useCategoryTree';

const baseQueryArgs = {
  limit: CATALOG_ITEMS_PER_PAGE,
  fuzzy: true,
};

export const findCategoryId = (category: string, subCategory: string, categories: Array<CategoryTreeItem>) => {
  const categoryId = subCategory
    ? categories.find((a) => a.name === category).children.find((a) => a.name === subCategory)?.id
    : categories.find((a) => a.name === category)?.id;
  return categoryId ? [`categories.id: subtree("${categoryId}")`] : [];
};

export const productsQueryAdapter: QueryAdapter = ({ category, subCategory }, queryParams, categories) => {
  const filter = findCategoryId(category, subCategory, categories);

  const facetsFilter = [...filter];

  if (queryParams.priceFrom && queryParams.priceTo)
    filter.push(
      `variants.price.centAmount:range (${Number(queryParams.priceFrom) * 100} to ${Number(queryParams.priceTo) * 100})`
    );

  if (queryParams.color) filter.push(`variants.attributes.color:"${queryParams.color}"`);
  if (queryParams.brand) filter.push(`variants.attributes.brand:"${queryParams.brand}"`);

  const sort = [];
  if (queryParams.sort === 'priceasc') sort.push(`price asc`);
  if (queryParams.sort === 'pricedesc') sort.push(`price desc`);
  if (queryParams.sort === 'nameasc') sort.push(`name.en asc`);
  if (queryParams.sort === 'namedesc') sort.push(`name.en desc`);

  return {
    ...baseQueryArgs,
    offset: CATALOG_ITEMS_PER_PAGE * (queryParams.page ? +queryParams.page - 1 : 0),
    filter: filter.length === 0 ? null : filter,
    'text.en': queryParams.text,
    'filter.facets': facetsFilter,
    sort,
  };
};
