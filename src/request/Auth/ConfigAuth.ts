import AppConfig from "src/utils/const/AppConfig";
import { ConfigAuthLogin } from "./RequestAuthType";

const ConfigAuth = (() => {
  const login: ConfigAuthLogin = (payload) => ({
    method: "POST",
    url: `${AppConfig.V1}/login`,
    data: payload,
  });

  return { login };
})();

export default ConfigAuth;
