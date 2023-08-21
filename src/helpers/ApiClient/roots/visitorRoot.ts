import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { httpMiddlewareOptions } from '../../../constants/api/httpMiddlewareOptions';
import { PROJECT_KEY } from '../../../constants/env';
import { visitorAuthMiddlewareOptions } from '../../../constants/api/visitorAuthMiddlewareOptions';

const projectKey = PROJECT_KEY;

const client = new ClientBuilder()
  .withPasswordFlow(visitorAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

const visitorRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });

export default visitorRoot;
