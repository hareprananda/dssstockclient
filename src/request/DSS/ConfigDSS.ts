import AppConfig from "src/utils/const/AppConfig";
import {
  ConfigDssResult,
  ConfigDssCriteria,
  ConfigDssRawData,
  ConfigDssDetailCount,
  ConfigDssSingleStock,
  ConfigDssNewFinancial,
} from "./RequestDSSType";

const ConfigDSS = (() => {
  const result: ConfigDssResult = () => ({
    method: "GET",
    url: `${AppConfig.V1}/result`,
  });

  const criteria: ConfigDssCriteria = () => ({
    method: "GET",
    url: `${AppConfig.V1}/criteria`,
  });

  const rawData: ConfigDssRawData = () => ({
    method: "GET",
    url: `${AppConfig.V1}/raw-data`,
  });

  const detailCount: ConfigDssDetailCount = () => ({
    method: "GET",
    url: `${AppConfig.V1}/detail-count`,
  });

  const singleStock: ConfigDssSingleStock = (ticker) => ({
    method: "GET",
    url: `${AppConfig.V1}/financial/${ticker}`,
  });

  const newFinancial: ConfigDssNewFinancial = (data) => {
    const usedData = {
      ticker: data.general.ticker,
      tahun: data.general.tahun,
      periode: data.general.periode,
      lababersih: data.income["Jumlah laba (rugi)"],
      ekuitas: data.balance["Jumlah ekuitas"],
      utanglancar: data.balance["Jumlah liabilitas jangka pendek"],
      asetlancar: data.balance["Jumlah aset lancar"],
      dividen: data.dividen !== 0,
      pembulatan: data.general.multiply,
      currency: data.general.currency,
    };

    return {
      method: "POST",
      url: `${AppConfig.V1}/financial`,
      data: usedData,
    };
  };

  return { result, criteria, rawData, detailCount, singleStock, newFinancial };
})();

export default ConfigDSS;
