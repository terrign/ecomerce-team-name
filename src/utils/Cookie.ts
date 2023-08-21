export class Cookie {
  public get(key: string) {
    const items = document.cookie.split('; ');
    let value = '';
    for (const item of items) {
      const [keyCode, keyValue] = item.split('=');
      if (keyCode === key) {
        value = decodeURIComponent(keyValue);
        break;
      }
    }
    return value;
  }

  public set(key: string, value: string, time = 1): void {
    const date = new Date();
    date.setTime(date.getTime() + time * 24 * 60 * 60 * 1000);
    document.cookie = `${key}=${encodeURIComponent(value ?? '')}; expires=${date.toUTCString()} `;
  }

  public delete(key: string): void {
    document.cookie = `${key}=;  Max-Age=0`;
  }
}
