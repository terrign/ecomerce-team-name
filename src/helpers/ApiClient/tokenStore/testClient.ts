// import { ClientBuilder, PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
// import { httpMiddlewareOptions } from './ClientBuilder';
// import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
// import { AUTH_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY } from '../../constants/env';
// import myTokenCache from '../TokenStore';

// export const authOptions: PasswordAuthMiddlewareOptions = {
//   host: AUTH_URL,
//   projectKey: PROJECT_KEY,
//   credentials: {
//     clientId: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     user: {
//       username: 'vajipi@gmail.com',
//       password: 'Empty2nd',
//     },
//   },
//   tokenCache: myTokenCache,
// };

// const client = new ClientBuilder()
//   .withProjectKey(PROJECT_KEY)
//   .withPasswordFlow(authOptions)
//   .withHttpMiddleware(httpMiddlewareOptions)
//   .build();

// export const apiRootTest = createApiBuilderFromCtpClient(client);
