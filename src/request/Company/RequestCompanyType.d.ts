import { AxiosRequestConfig } from "axios";

type Config = AxiosRequestConfig;

type CompanyData = {
  _id: string;
  jumlahSaham: number;
  harga: number;
  nama: string;
};

export type ConfigCompanyUpdate = (
  ticker: string,
  data: Omit<CompanyData, "_id">
) => Config;
export type ResponseCompanyUpdate = CompanyData;

export type ConfigCompanyErase = (ticker: string) => Config;
