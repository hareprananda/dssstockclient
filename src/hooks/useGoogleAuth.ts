import { useGoogleLogin } from "react-google-login";
import axios, { AxiosResponse } from "axios";
import ConfigAuth from "src/request/Auth/ConfigAuth";
import {
  ResponseAuthLogin,
  ResponseGoogleLogin,
} from "src/request/Auth/RequestAuthType";
import LocalStorage from "src/utils/localstorage/LocalStorage";
import { NextRouter, useRouter } from "next/router";
import { RouteUrl } from "src/route/RouteUrl";

const onLoginSuccess = (router: NextRouter) => (res: any) => {
  const response = res as ResponseGoogleLogin;

  const { profileObj } = response;
  axios(ConfigAuth.login({ email: profileObj.email }))
    .then((res: AxiosResponse<ResponseAuthLogin>) => {
      LocalStorage.set("user_data", {
        email: profileObj.email,
        imageUrl: profileObj.imageUrl,
        name: profileObj.name,
        token: res.data.token,
        token_expiry: res.data.expiry,
        level: res.data.level,
      });
      router.push(RouteUrl.dashboard);
    })
    .catch(() => {
      alert("Oops something gone wrong");
    });
};

const useGoogleAuth = () => {
  const router = useRouter();
  const { signIn, loaded: signInLoaded } = useGoogleLogin({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    onSuccess: onLoginSuccess(router),
  });

  const signOut = () => {
    LocalStorage.purge("user_data");
    router.push(RouteUrl.login);
  };

  return { signIn, signInLoaded, signOut };
};

export default useGoogleAuth;
