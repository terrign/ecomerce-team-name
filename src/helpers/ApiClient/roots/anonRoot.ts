import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { anonymousAuthMiddlewareOptions } from '../../../constants/api/anonymousAuthMiddlewareOptions';
import { httpMiddlewareOptions } from '../../../constants/api/httpMiddlewareOptions';
import { PROJECT_KEY } from '../../../constants/env';

const projectKey = PROJECT_KEY;

const client = new ClientBuilder()
  // .withProjectKey(projectKey)
  .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

const anonRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });

export default anonRoot;
