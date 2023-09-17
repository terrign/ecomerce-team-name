import { CategoryTreeItem } from '../hooks/useCategoryTree';

export interface CatalogRouteParams {
  category: string;
  subCategory: string;
}

export interface CatalogQueryParams {
  sort: 'priceasc' | 'pricedesc' | 'nameasc' | 'namedesc';
  text: string;
  color: string;
  brand: string;
  priceFrom: string;
  priceTo: string;
  page: number;
}

export interface QueryArgs {
  limit: number;
  offset: number;
  fuzzy: boolean;
  sort: string[];
  'text.en': string;
  filter: string[];
}

export interface QueryAdapter {
  (
    routeParams: Partial<CatalogRouteParams>,
    queryParams: Partial<CatalogQueryParams>,
    categories: CategoryTreeItem[]
  ): QueryArgs;
}
