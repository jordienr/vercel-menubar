type Storage = {
  VERCEL_ACCESS_TOKEN: string;
  ACCOUNTS: {
    name: string;
    token: string;
  };
};

export function storage() {
  return {
    get(key: keyof Storage) {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          return JSON.parse(value);
        } catch (error) {
          return value;
        }
      }
    },
    set<T extends keyof Storage>(key: T, value: Storage[T]) {
      const stringValue =
        typeof value === 'string' ? value : JSON.stringify(value);
      return localStorage.setItem(key, stringValue);
    },
  };
}
