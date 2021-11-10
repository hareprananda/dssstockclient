import AppConfig from "src/utils/const/AppConfig";
import {
  ConfigDssResult,
  ConfigDssCriteria,
  ConfigDssRawData,
  ConfigDssDetailCount,
  ConfigDssSingleStock,
  ConfigDssNewFinancial,
  ConfigDssUpdateFinancial,
  ConfigDssUpdateCriteria,
  ConfigDssEraseFinancial,
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

  const newFinancial: ConfigDssNewFinancial = (data, additionalData) => {
    const newCompanyData = Object.values(additionalData).includes(0)
      ? {}
      : additionalData;
    const usedData = {
      general: data.general,
      lababersih: data.income["Jumlah laba (rugi)"],
      ekuitas: data.balance["Jumlah ekuitas"],
      utanglancar: data.balance["Jumlah liabilitas jangka pendek"],
      asetlancar: data.balance["Jumlah aset lancar"],
      dividen: data.dividen !== 0,
      ...newCompanyData,
    };
    return {
      method: "POST",
      url: `${AppConfig.V1}/financial`,
      data: usedData,
    };
  };

  const updateFinancial: ConfigDssUpdateFinancial = (ticker, data) => {
    return {
      method: "PUT",
      url: `${AppConfig.V1}/financial/${ticker}`,
      data,
    };
  };

  const updateCriteria: ConfigDssUpdateCriteria = (data) => {
    return {
      method: "PUT",
      url: `${AppConfig.V1}/criteria`,
      data,
    };
  };

  const eraseFinancial: ConfigDssEraseFinancial = (id) => {
    return {
      method: "DELETE",
      url: `${AppConfig.V1}/financial/${id}`,
    };
  };

  return {
    result,
    criteria,
    rawData,
    detailCount,
    singleStock,
    newFinancial,
    updateFinancial,
    updateCriteria,
    eraseFinancial,
  };
})();

export default ConfigDSS;
