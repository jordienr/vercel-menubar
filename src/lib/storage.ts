type Storage = {
  VERCEL_ACCESS_TOKEN: string;
};

export function storage() {
  return {
    get(key: keyof Storage) {
      return localStorage.getItem(key);
    },
    set(key: keyof Storage, value: string) {
      return localStorage.setItem(key, value);
    },
  };
}
