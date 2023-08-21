import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { httpMiddlewareOptions } from '../../../constants/api/httpMiddlewareOptions';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { PROJECT_KEY } from '../../../constants/env';

function getExistingTokenRoot(token: string) {
  const client = new ClientBuilder()
    .withExistingTokenFlow(`Bearer ${token}`, { force: false })
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });
}
export default getExistingTokenRoot;
