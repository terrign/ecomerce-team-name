import { TokenStore } from '@commercetools/sdk-client-v2';

export type AuthState = {
  token: TokenStore | null;
  isAnonUser: boolean;
  username: string;
  remember?: boolean;
};
