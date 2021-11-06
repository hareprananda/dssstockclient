export type LocalStorageKey = {
  user_data: {
    email: string;
    name: string;
    imageUrl: string;
    token: string;
    token_expiry: number;
    level: "admin" | "pengguna";
  };
};

const LocalStorage = (() => {
  const set = <K extends keyof LocalStorageKey>(
    key: K,
    payload: LocalStorageKey[K]
  ) => {
    localStorage.setItem(key, JSON.stringify(payload));
  };

  const get = <K extends keyof LocalStorageKey>(key: K) => {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data) as LocalStorageKey[K];

    return undefined;
  };

  const purge = <K extends keyof LocalStorageKey>(key: K) => {
    localStorage.removeItem(key);
  };

  return { set, get, purge };
})();

export default LocalStorage;
