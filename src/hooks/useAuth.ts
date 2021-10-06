import { useRouter } from "next/router";
import React from "react";
import { RouteUrl } from "src/route/RouteUrl";
import LocalStorage from "src/utils/localstorage/LocalStorage";

const useAuth = () => {
  const router = useRouter();

  const logOut = () => {
    LocalStorage.purge("user_data");
    router.replace(RouteUrl.login);
  };

  return { logOut };
};

export default useAuth;
