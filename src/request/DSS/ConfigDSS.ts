import AppConfig from "src/utils/const/AppConfig";
import {
  ConfigDssResult,
  ConfigDssCriteria,
  ConfigDssRawData,
  ConfigDssDetailCount,
  ConfigDssSingleStock,
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

  return { result, criteria, rawData, detailCount, singleStock };
})();

export default ConfigDSS;
