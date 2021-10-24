import { AxiosRequestConfig } from "axios";
import { TScreeningResult } from "src/types/File";
type Config = AxiosRequestConfig;

type RawData = {
  pertumbuhanLaba: number;
  per: number;
  pbv: number;
  marketCap: number;
  adanyaLaba: number;
  currentRatio: number;
  adanyaDividen: number;
  nama: string;
  _id: string;
};

export type ConfigDssResult = () => Config;
export type ResponseDssResult = {
  ticker: string;
  nilai: number;
  nama: string;
}[];

export type ConfigDssCriteria = () => Config;
export type ResponseDssCriteria = {
  _id: number;
  keterangan: string;
  nama: string;
  bobot: number;
}[];

export type ConfigDssRawData = () => Config;
export type ResponseConfigDssRawData = {
  adanyaDividen: number;
  adanyaLaba: number;
  currentRatio: number;
  harga: number;
  marketCap: number;
  nama: string;
  pbv: number;
  per: number;
  pertumbuhanLaba: number;
  _id: string;
}[];

export type ConfigDssDetailCount = () => Config;
export type ResponseConfigDssDetailCount = {
  normalization: RawData[];
  normalizationWeight: RawData[];
  idealSolution: {
    positif: Omit<RawData, "nama" | "_id">;
    negatif: Omit<RawData, "nama" | "_id">;
  };
  idealSolutionDistance: Record<
    string,
    { dPlus: number; dMin: number; nama: string }
  >;
  finalRanking: {
    ticker: string;
    nilai: number;
    nama: string;
  }[];
};

export type ConfigDssSingleStock = (ticker: string) => Config;
export type ResponseDssSingleStock = {
  summary: {
    _id: string;
    adanyaLaba: number;
    nama: string;
    harga: number;
    pertumbuhanLaba: number;
    adanyaDividen: number;
    currentRatio: number;
    marketCap: number;
    per: number;
    pbv: number;
  };
  detail: {
    _id: number;
    asetLancar: number;
    utangLancar: number;
    labaBersih: number;
    pembulatan: number;
    currentRatio: number;
    periode: number;
    tahun: number;
    ekuitas: number;
    adanyaDividen: number;
    pertumbuhanLaba: number;
  }[];
  status: "Not found" | "Ok";
};

export type ConfigDssNewFinancial = (data: TScreeningResult) => Config;
