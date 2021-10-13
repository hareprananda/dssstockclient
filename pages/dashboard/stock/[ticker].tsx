import { useRouter } from "next/router";
import React, { useState } from "react";
import withProtected from "src/components/Element/Route/HighOrder/withProtected";
import TickerChart from "src/components/Page/Dashboard/TickerChart";
import TickerTable from "src/components/Page/Dashboard/TickerTable";

const Ticker: React.FC = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<"chart" | "table">("chart");
  return (
    <div>
      <h1 className="text-4xl font-bold text-primary mt-20">
        {router.query.ticker}
      </h1>
      <p>PT Bukit Asam tbk</p>
      <div className="flex justify-center">
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

      {activeMenu === "chart" ? <TickerChart /> : <TickerTable />}
    </div>
  );
};

export default withProtected(Ticker);
