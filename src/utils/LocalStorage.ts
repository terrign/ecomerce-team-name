import myTokenCache from '../helpers/ApiClient/TokenStore';

export default class LocalStorage {
  static set = (key: string, value: string) => localStorage.setItem(key, value);

  static get = (key: string) => localStorage.getItem(key);

  static has = (key: string) => localStorage.getItem(key) !== null;

  static del = (key: string) => localStorage.removeItem(key);

  static setCachedToken = () => LocalStorage.set('token', myTokenCache.get().token);

  static get token() {
    return LocalStorage.get('token');
  }
}
