import AppConfig from "src/utils/const/AppConfig";
import { ConfigDssResult } from "./RequestDSSType";

const ConfigDSS = (() => {
  const result: ConfigDssResult = () => ({
    method: "GET",
    url: `${AppConfig.V1}/result`,
  });

  return { result };
})();

export default ConfigDSS;
