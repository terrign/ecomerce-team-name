import { ClientBuilder } from '@commercetools/sdk-client-v2';
import LocalStorage from '../../../utils/LocalStorage';
import { httpMiddlewareOptions } from '../../../constants/api/httpMiddlewareOptions';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { PROJECT_KEY } from '../../../constants/env';

const client = new ClientBuilder()
  .withExistingTokenFlow(`Bearer ${LocalStorage.token}`, { force: true })
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

const existingTokenRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });

export default existingTokenRoot;
