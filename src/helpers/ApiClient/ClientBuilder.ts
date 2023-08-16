import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { AUTH_URL, CLIENT_ID, CLIENT_SECRET, HOST, PROJECT_KEY } from '../../constants/EnvConst';

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

const httpMiddlewareOptions = {
  host: HOST,
  fetch,
};

const client = new ClientBuilder()
  .withProjectKey(PROJECT_KEY)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware()
  // .withQueueMiddleware({ concurrency: 5 }) // defaults to 20 concurrent requests
  .build();

export function authApiRoot(email: string, password: string) {
  const authMiddlewareOptions = {
    host: AUTH_URL,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      user: {
        username: email,
        password: password,
      },
    },
    scopes: [`manage_project:${PROJECT_KEY}`],
    fetch,
  };
  const client = new ClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withPasswordFlow(authMiddlewareOptions)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  const apiRoot = createApiBuilderFromCtpClient(client);
  return apiRoot;
}

export const apiRoot = createApiBuilderFromCtpClient(client);
