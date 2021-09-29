import { useGoogleLogin } from "react-google-login";
import axios, { AxiosResponse } from "axios";
import ConfigAuth from "src/request/Auth/ConfigAuth";
import {
  ResponseAuthLogin,
  ResponseGoogleLogin,
} from "src/request/Auth/RequestAuthType";
import LocalStorage from "src/utils/localstorage/LocalStorage";
import { NextRouter } from "next/router";
import { RouteUrl } from "src/route/RouteUrl";

const onLoginSuccess = (router: NextRouter) => (res: any) => {
  const response = res as ResponseGoogleLogin;
  const { profileObj } = response[Object.keys(response)[0]];
  axios(ConfigAuth.login({ email: profileObj.email })).then(
    (res: AxiosResponse<ResponseAuthLogin>) => {
      LocalStorage.setLocalStorage("user_data", {
        email: profileObj.email,
        imageUrl: profileObj.imageUrl,
        name: profileObj.name,
        token: res.data.token,
        token_expiry: res.data.expiry,
      });
      router.push(RouteUrl.dashboard);
    }
  );
};

const useGoogleAuth = (router: NextRouter) => {
  const { signIn, loaded: signInLoaded } = useGoogleLogin({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    onSuccess: onLoginSuccess(router),
  });

  return { signIn, signInLoaded };
};

export default useGoogleAuth;
