type Storage = {
  ACCOUNTS: {
    id: string;
    name: string;
    token: string;
  }[];
};

export function storage() {
  return {
    get<T extends keyof Storage>(key: T): Storage[T] | undefined {
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
    },
    set<T extends keyof Storage>(key: T, value: Storage[T]) {
      const stringValue =
        typeof value === 'string' ? value : JSON.stringify(value);
      return localStorage.setItem(key, stringValue);
    },
  };
}
