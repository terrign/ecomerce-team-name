import { ClientBuilder } from '@commercetools/sdk-client-v2';
import getRefreshTokenOptions from '../../../constants/api/refreshTokenMiddlewareOptions';
import { httpMiddlewareOptions } from '../../../constants/api/httpMiddlewareOptions';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { PROJECT_KEY } from '../../../constants/env';

const getRefreshTokenRoot = (refreshToken: string) => {
  const client = new ClientBuilder()
    .withRefreshTokenFlow(getRefreshTokenOptions(refreshToken))
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });
};

export default getRefreshTokenRoot;
