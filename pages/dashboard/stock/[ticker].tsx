import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Icon from "src/assets/Icon";
import withProtected from "src/components/Element/Route/HighOrder/withProtected";
import CompanyModal from "src/components/Modal/CompanyModal/CompanyModal";
import ConfirmationModal from "src/components/Modal/ConfirmationModal/ConfirmationModal";
import TickerChart from "src/components/Page/Dashboard/TickerChart";
import TickerTable from "src/components/Page/Dashboard/TickerTable";
import useRequest from "src/hooks/useRequest";
import ReducerActions from "src/redux/ReducerAction";
import { useAppDispatch, useAppSelector } from "src/redux/ReduxHook";
import ConfigCompany from "src/request/Company/ConfigCompany";
import { CompanyData } from "src/request/Company/RequestCompanyType";
import ConfigDSS from "src/request/DSS/ConfigDSS";
import { ResponseDssSingleStock } from "src/request/DSS/RequestDSSType";
import { RouteUrl } from "src/route/RouteUrl";
import LocalStorage from "src/utils/localstorage/LocalStorage";

const Ticker: React.FC = () => {
  const router = useRouter();

  const { ticker } = router.query;
  const [activeMenu, setActiveMenu] = useState<"chart" | "table">("chart");
  const [summary, setSummary] = useState(
    {} as ResponseDssSingleStock["summary"]
  );
  const [detailList, setDetailList] = useState(
    [] as ResponseDssSingleStock["detail"]
  );
  const [openUpdateCompanyModal, setOpenUpdateCompanyModal] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const { RequestAuthenticated } = useRequest();
  const requestTickerDetail = useAppSelector(
    (state) => state.request.requestTickerDetail
  );
  const dispatch = useAppDispatch();

  const getSingleData = () => {
    dispatch(ReducerActions.ui.setMainLoader(true));
    RequestAuthenticated<ResponseDssSingleStock>(
      ConfigDSS.singleStock(ticker as string)
    )
      .then(({ data }) => {
        if (data.status === "Ok") {
          setSummary(data.summary);
          setDetailList(data.detail);
        }
      })
      .catch(() => null)
      .finally(() => {
        dispatch(ReducerActions.ui.setMainLoader(false));
      });
  };

  useEffect(() => {
    if (!ticker) return;
    getSingleData();
  }, [ticker, requestTickerDetail]);

  const toggleCompanyModal = () => {
    setOpenUpdateCompanyModal((current) => !current);
  };

  const updateCompanySuccess = (data: CompanyData) => {
    setSummary((current) => ({
      ...current,
      harga: data.harga,
      marketCap: data.harga * data.jumlahSaham,
      nama: data.nama,
    }));
  };

  const toggleOpenDeleteConfirmation = () => {
    setOpenDeleteConfirmation((current) => !current);
  };
  const deleteCompany = () => {
    RequestAuthenticated(ConfigCompany.erase(summary?._id))
      .then(() => {
        alert("Delete success");
        toggleOpenDeleteConfirmation();
        router.push(RouteUrl.list);
      })
      .catch(() => null)
      .finally(() => {
        toggleOpenDeleteConfirmation();
      });
  };
  const userData = LocalStorage.get("user_data");
  return (
    <div>
      <CompanyModal
        successCB={updateCompanySuccess}
        open={openUpdateCompanyModal}
        toggle={toggleCompanyModal}
        defaultData={{
          _id: summary?._id,
          nama: summary?.nama,
          jumlahSaham: summary?.marketCap / summary?.harga,
          harga: summary?.harga,
        }}
      />
      <ConfirmationModal
        open={openDeleteConfirmation}
        toggle={toggleOpenDeleteConfirmation}
        title="Konfirmasi"
        description={`Apakah anda yakin ingin menghapus data ${summary?._id} (${summary?.nama}) beserta semua laporan keuangannya ?`}
        onSuccess={deleteCompany}
      />
      <div className="flex items-center  mt-20">
        <h1 className="text-4xl font-bold text-primary">
          {router.query.ticker}
        </h1>
        {userData?.level === "admin" && (
          <>
            <button
              type="button"
              className="py-1 px-4 bg-primary ml-2 rounded"
              onClick={toggleCompanyModal}
            >
              <Icon.Edit fill="white" width="25" height="25" />
            </button>
            <button
              type="button"
              className="py-1 px-4 bg-red-600 ml-2 rounded"
              onClick={toggleOpenDeleteConfirmation}
            >
              <Icon.Delete fill="white" width="25" height="25" />
            </button>
          </>
        )}
      </div>

      <p className="text-primary">{summary.nama}</p>

      <div className="flex mt-5">
        <div className="text-center">
          <p className="font-bold text-2xl text-primary">Market Cap</p>
          <p className="text-center text-xl text-primary">
            {((summary.marketCap || 0) / 1000000000000).toFixed(2)}T
          </p>
        </div>
        <div className="text-center ml-10">
          <p className="font-bold text-2xl text-primary">
            PER Rata-rata 2 tahun
          </p>
          <p className="text-center text-xl text-primary">
            {(summary.per || 0).toFixed(2)} x
          </p>
        </div>
        <div className="text-center ml-10">
          <p className="font-bold text-2xl text-primary">PBV</p>
          <p className="text-center text-xl text-primary">
            {(summary.pbv || 0).toFixed(2)} x
          </p>
        </div>
        <div className="text-center ml-10">
          <p className="font-bold text-2xl text-primary">Current Ratio</p>
          <p className="text-center text-xl text-primary">
            {(summary.currentRatio || 0).toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-8 mb-16">
        <div
          className="grid grid-cols-2 bg-primary font-bold rounded-2xl text-white border-2 border-primary overflow-hidden"
          style={{ width: "637px" }}
        >
          <div
            className={`text-center py-3 text-xl ${
              activeMenu === "chart" ? "bg-white text-primary" : "text-white"
            } rounded-2xl cursor-pointer`}
            onClick={() => setActiveMenu("chart")}
          >
            <h1>Chart</h1>
          </div>
          <div
            className={`text-center py-3 text-xl cursor-pointer ${
              activeMenu === "table" ? "bg-white text-primary" : "text-white"
            } rounded-2xl`}
            onClick={() => setActiveMenu("table")}
          >
            <h1>Laporan Keuangan</h1>
          </div>
        </div>
      </div>

      {activeMenu === "chart" ? (
        <TickerChart detailList={detailList} />
      ) : (
        <TickerTable detailList={detailList} setDetailList={setDetailList} />
      )}
    </div>
  );
};

export default withProtected(Ticker);
