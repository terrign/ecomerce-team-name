import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { httpMiddlewareOptions } from '../../../constants/api/httpMiddlewareOptions';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { PROJECT_KEY } from '../../../constants/env';
import myTokenCache from '../TokenStore';
import LocalStorage from '../../../utils/LocalStorage';

// const client = new ClientBuilder()
//   .withExistingTokenFlow(`Bearer ${myTokenCache.get().token}`, { force: true })
//   .withHttpMiddleware(httpMiddlewareOptions)
//   .build();

// const existingTokenRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });

const getExistingTokenRoot = () => {
  console.log(myTokenCache.get().token);
  const client = new ClientBuilder()
    .withExistingTokenFlow(`Bearer ${LocalStorage.get('token')}`, { force: false })
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });
};
export default getExistingTokenRoot;
