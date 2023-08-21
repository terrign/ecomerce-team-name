import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { PROJECT_KEY } from '../../../constants/env';
import getPasswordAuthOptions from '../../../constants/api/passwordAuthMiddlewareOptions';
import { httpMiddlewareOptions } from '../../../constants/api/httpMiddlewareOptions';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const getPasswordRoot = (email: string, password: string) => {
  const opitons = getPasswordAuthOptions(email, password);
  const client = new ClientBuilder()
    // .withProjectKey(PROJECT_KEY) так и не понял нахуй оно надо и так работает
    .withPasswordFlow(opitons)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });
};

export default getPasswordRoot;
