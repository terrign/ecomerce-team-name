import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { httpMiddlewareOptions } from '../../../constants/api/httpMiddlewareOptions';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { PROJECT_KEY } from '../../../constants/env';
import anonymousAuthMiddlewareOptions from '../../../constants/api/anonymousMiddlewareOptions';

function getAnonRoot() {
  const client = new ClientBuilder()
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });
}
export default getAnonRoot;
