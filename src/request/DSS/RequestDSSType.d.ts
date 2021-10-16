import { AxiosRequestConfig } from "axios";

type Config = AxiosRequestConfig;

export type ConfigDssResult = () => Config;
export type ResponseDssResult = {
  ticker: string;
  nilai: number;
  nama: string;
}[];
