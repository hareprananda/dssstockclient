import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import withProtected from "src/components/Element/Route/HighOrder/withProtected";
import TickerChart from "src/components/Page/Dashboard/TickerChart";
import TickerTable from "src/components/Page/Dashboard/TickerTable";
import useRequest from "src/hooks/useRequest";
import ConfigDSS from "src/request/DSS/ConfigDSS";
import { ResponseDssSingleStock } from "src/request/DSS/RequestDSSType";

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

  const { RequestAuthenticated } = useRequest();

  useEffect(() => {
    if (!ticker) return;
    RequestAuthenticated<ResponseDssSingleStock>(
      ConfigDSS.singleStock(ticker as string)
    )
      .then(({ data }) => {
        if (data.status === "Ok") {
          console.log(data.summary);
          setSummary(data.summary);
          setDetailList(data.detail);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ticker]);
  return (
    <div>
      <h1 className="text-4xl font-bold text-primary mt-20">
        {router.query.ticker}
      </h1>
      <p className="text-primary">{summary.nama}</p>

      <div className="flex mt-5">
        <div className="text-center">
          <p className="font-bold text-2xl text-primary">Market Cap</p>
          <p className="text-center text-xl text-primary">
            {((summary.marketCap || 0) / 1000000000000).toFixed(2)}T
          </p>
        </div>
        <div className="text-center ml-10">
          <p className="font-bold text-2xl text-primary">PER</p>
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
