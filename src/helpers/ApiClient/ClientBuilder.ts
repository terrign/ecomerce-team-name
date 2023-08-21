import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { AUTH_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY } from '../../constants/env';
import { httpMiddlewareOptions } from '../../constants/api/httpMiddlewareOptions';

const authMiddlewareOptions = {
  host: AUTH_URL,
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  scopes: [`manage_project:${PROJECT_KEY}`],
  fetch,
};

const client = new ClientBuilder()
  .withProjectKey(PROJECT_KEY)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware()
  // .withQueueMiddleware({ concurrency: 5 }) // defaults to 20 concurrent requests
  .build();

export const apiRoot = createApiBuilderFromCtpClient(client);
