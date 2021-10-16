import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import { RouteUrl } from "src/route/RouteUrl";
import LocalStorage from "src/utils/localstorage/LocalStorage";

const useRequest = () => {
  const router = useRouter();
  const RequestAuthenticated = <T = any>(config: AxiosRequestConfig) => {
    const token = LocalStorage.get("user_data")?.token;
    return axios({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res)
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          LocalStorage.purge("user_data");
          router.push(RouteUrl.login);
        }
        throw err;
      }) as AxiosPromise<T>;
  };

  const RequestGeneral = <T = any>(config: AxiosRequestConfig) => {
    return axios(config) as AxiosPromise<T>;
  };

  return { RequestGeneral, RequestAuthenticated };
};

export default useRequest;
