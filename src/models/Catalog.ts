import { CategoryTreeItem } from '../hooks/useCategoryTree';

export interface CatalogRouteParams {
  category: string;
  subCategory: string;
}

export interface CatalogQueryParams {
  price: 'asc' | 'desc';
  name: 'asc' | 'desc';
  text: string;
  color: string;
  brand: string;
  priceFrom: string;
  priceTo: string;
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
    page: number,
    routeParams: Partial<CatalogRouteParams>,
    queryParams: Partial<CatalogQueryParams>,
    categories: CategoryTreeItem[]
  ): QueryArgs;
}
