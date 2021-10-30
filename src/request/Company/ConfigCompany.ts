import AppConfig from "src/utils/const/AppConfig";
import { ConfigCompanyUpdate, ConfigCompanyErase } from "./RequestCompanyType";

const ConfigCompany = (() => {
  const update: ConfigCompanyUpdate = (ticker, companyData) => {
    return {
      url: `${AppConfig.V1}/company/${ticker}`,
      method: "PUT",
      data: {
        harga: companyData.harga,
        jumlahsaham: companyData.jumlahSaham,
        nama: companyData.nama,
      },
    };
  };
  const erase: ConfigCompanyErase = (ticker) => {
    return {
      method: "DELETE",
      url: `${AppConfig.V1}/company/${ticker}`,
    };
  };

  return { update, erase };
})();

export default ConfigCompany;
