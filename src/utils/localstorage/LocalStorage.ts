type AvailKey = {
  user_data: {
    email: string;
    name: string;
    imageUrl: string;
    token: string;
    token_expiry: number;
  };
};

const LocalStorage = (() => {
  const set = <K extends keyof AvailKey>(key: K, payload: AvailKey[K]) => {
    localStorage.setItem(key, JSON.stringify(payload));
  };

  const get = <K extends keyof AvailKey>(key: K) => {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);

    return undefined;
  };

  const purge = <K extends keyof AvailKey>(key: K) => {
    localStorage.removeItem(key);
  };

  return { set, get, purge };
})();

export default LocalStorage;
