import AppConfig from "src/utils/const/AppConfig";
import {
  ConfigDssResult,
  ConfigDssCriteria,
  ConfigDssRawData,
  ConfigDssDetailCount,
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

  return { result, criteria, rawData, detailCount };
})();

export default ConfigDSS;
