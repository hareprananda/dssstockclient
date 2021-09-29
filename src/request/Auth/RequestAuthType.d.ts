import { AxiosRequestConfig } from "axios";

type Config = AxiosRequestConfig;

export type ConfigAuthLogin = ({ email: string }) => Config;
export type ResponseAuthLogin = {
  token: string;
  expiry: number;
};

export type ResponseGoogleLogin = {
  [key: string]: {
    profileObj: {
      email: string;
      familyName: string;
      givenName: string;
      imageUrl: string;
      name: string;
    };
    tokenObj: {
      access_token: string;
      expires_at: number;
    };
  };
};
