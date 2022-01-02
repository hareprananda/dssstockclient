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

  const newFinancial: ConfigDssNewFinancial = (data) => {
    return {
      method: "POST",
      url: `${AppConfig.V1}/financial`,
      data,
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
