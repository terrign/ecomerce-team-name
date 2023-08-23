import { HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { HOST } from '../env';

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: HOST,
  fetch,
};
